import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryEntryCategoriesRepository } from '../../repositories/in-memory/in-memory-entry-categories-repository'
import { InMemoryEntriesRepository } from '../../repositories/in-memory/in-memory-entries-repository'

import { CreateUser } from '../user/create-user'
import { CreateDashboard } from '../dashboard/create-dashboard'
import { CreateEntryCategory } from '../entry-category/create-entry-category'
import { CreateEntry } from './create-entry'
import { ListEntries } from './list-entries'

describe('List Entries', () => {
  it('should be able to list entries', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const entryCategoriesRepository = new InMemoryEntryCategoriesRepository()
    const entriesRepository = new InMemoryEntriesRepository()

    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createEntryCategory = new CreateEntryCategory(dashboardsRepository, entryCategoriesRepository)
    const createEntry = new CreateEntry(dashboardsRepository, entryCategoriesRepository, entriesRepository)
    const sut = new ListEntries(entriesRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const dashboard = await createDashboard.execute({
      title: 'Personal Finances',
      authorId: user.id,
    })

    const entryCategory = await createEntryCategory.execute({
      title: 'Work',
      color: '#000',
      dashboardId: dashboard.id,
    })

    const entry = await createEntry.execute({
      title: 'Salary',
      value: 10000,
      date: new Date(),
      categoryId: entryCategory.id,
      dashboardId: dashboard.id,
    })

    expect(sut.execute({
      dashboardId: dashboard.id,
    })).resolves.toEqual([entry])
  })
})
