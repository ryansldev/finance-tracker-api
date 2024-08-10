import { describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryEntryCategoriesRepository } from '../../repositories/in-memory/in-memory-entry-categories-repository'

import { CreateUser } from '../user/create-user'
import { CreateDashboard } from '../dashboard/create-dashboard'
import { CreateEntryCategory } from './create-entry-category'

import { EntryCategory } from '../../entities/entry-category'
import { DashboardNotFound } from '../dashboard/errors/DashboardNotFound'

describe('Create Entry Category', () => {
  it('should be able to create a entry category', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const entryCategoryRepository = new InMemoryEntryCategoriesRepository()

    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const sut = new CreateEntryCategory(dashboardsRepository, entryCategoryRepository)

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
    })).resolves.toBeInstanceOf(EntryCategory)
  })

  it('should not be able to create a entry category with a dashboard that not exists', () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const entryCategoryRepository = new InMemoryEntryCategoriesRepository()

    const sut = new CreateEntryCategory(dashboardsRepository, entryCategoryRepository)

    expect(sut.execute({
      title: 'Transport',
      color: '#000',
      dashboardId: '123',
    })).rejects.toThrowError(DashboardNotFound)
  })
})
