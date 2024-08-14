import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryEntryCategoriesRepository } from '../../repositories/in-memory/in-memory-entry-categories-repository'
import { InMemoryEntriesRepository } from '../../repositories/in-memory/in-memory-entries-repository'
import { InMemoryOutputCategoriesRepository } from '../../repositories/in-memory/in-memory-output-categories'
import { InMemoryOutputsRepository } from '../../repositories/in-memory/in-memory-outputs'

import { CreateDashboard } from './create-dashboard';
import { CreateUser } from '../user/create-user';
import { CreateEntryCategory } from '../entry-category/create-entry-category'
import { CreateEntry } from '../entry/create-entry'
import { CreateOutputCategory } from '../output-category/create-output-category'
import { CreateOutput } from '../output/create-output'
import { GetDashboardBalance } from './get-dashboard-balance'

describe('Get Dashboard Balance', () => {
  it('should be able to get dashboard balance', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const entryCategoriesRepository = new InMemoryEntryCategoriesRepository()
    const entriesRepository = new InMemoryEntriesRepository()
    const outputCategoriesRepository = new InMemoryOutputCategoriesRepository()
    const outputsRepository = new InMemoryOutputsRepository()
    
    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createEntryCategory = new CreateEntryCategory(dashboardsRepository, entryCategoriesRepository)
    const createEntry = new CreateEntry(dashboardsRepository, entryCategoriesRepository, entriesRepository)
    const createOutputCategory = new CreateOutputCategory(dashboardsRepository, outputCategoriesRepository)
    const createOutput = new CreateOutput(dashboardsRepository, outputCategoriesRepository, outputsRepository)
    const sut = new GetDashboardBalance(dashboardsRepository, entriesRepository, outputsRepository)

    const author = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const dashboard = await createDashboard.execute({
      title: 'Personal Finances',
      authorId: author.id,
    })

    const entryCategory = await createEntryCategory.execute({
      title: 'Work',
      color: '#000',
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    const entry = await createEntry.execute({
      title: 'Salary',
      value: 10000,
      date: new Date(),
      categoryId: entryCategory.id,
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    const outputCategory = await createOutputCategory.execute({
      title: 'Transport',
      color: '#000',
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    const output = await createOutput.execute({
      title: 'Private car',
      value: 300,
      date: new Date(),
      categoryId: outputCategory.id,
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    const output2 = await createOutput.execute({
      title: 'Bus',
      value: 20,
      date: new Date('2024-08-13'),
      categoryId: outputCategory.id,
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    const result = await sut.execute({
      authorId: author.id,
      dashboardId: dashboard.id,
    })

    expect(result.total).toEqual(entry.value-output.value-output2.value)
    expect(result.transactions[2]).toEqual(output2)
  })
})
