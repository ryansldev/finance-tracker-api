import { describe, expect, test } from 'vitest'

import { OutputCategory } from '../../entities/output-category'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryOutputCategoriesRepository } from '../../repositories/in-memory/in-memory-output-categories'

import { CreateUser } from '../user/create-user'
import { CreateDashboard } from '../dashboard/create-dashboard'
import { CreateOutputCategory } from './create-output-category'

describe('Create Output Category', () => {
  test('should be able to create a output category', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const outputCategoriesRepository = new InMemoryOutputCategoriesRepository()

    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const sut = new CreateOutputCategory(dashboardsRepository, outputCategoriesRepository)

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

    expect(sut.execute({
      title: 'Transport',
      color: '#000',
      dashboardId: dashboard.id,
    })).resolves.toBeInstanceOf(OutputCategory)
  })
})
