import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository';
import { InMemoryOutputCategoriesRepository } from '../../repositories/in-memory/in-memory-output-categories'
import { InMemoryOutputsRepository } from '../../repositories/in-memory/in-memory-outputs'

import { CreateUser } from '../user/create-user';
import { CreateDashboard } from '../dashboard/create-dashboard';
import { CreateOutputCategory } from '../output-category/create-output-category'
import { CreateOutput } from '../output/create-output'
import { ListOutputs } from '../output/list-outputs'

describe('List outputs', () => {
  it('should be able to list outputs', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const outputCategoriesRepository = new InMemoryOutputCategoriesRepository()
    const outputsRepository = new InMemoryOutputsRepository()

    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createOutputCategory = new CreateOutputCategory(dashboardsRepository, outputCategoriesRepository)
    const createOutput = new CreateOutput(dashboardsRepository, outputCategoriesRepository, outputsRepository)
    const sut = new ListOutputs(outputsRepository)
    
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

    const outputCategory = await createOutputCategory.execute({
      title: 'Transport',
      color: '#000',
      dashboardId: dashboard.id,
      authorId: user.id,
    })

    const output = await createOutput.execute({
      title: 'Salary',
      value: 10000,
      date: new Date(),
      categoryId: outputCategory.id,
      dashboardId: dashboard.id,
      authorId: user.id,
    })

    expect(sut.execute({
      dashboardId: dashboard.id,
    })).resolves.toEqual([output])
  })
})