import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryEntryCategoriesRepository } from '../../repositories/in-memory/in-memory-entry-categories-repository'

import { CreateUser } from '../user/create-user'
import { CreateDashboard } from '../dashboard/create-dashboard'
import { CreateEntryCategory } from './create-entry-category'
import { SearchEntryCategory } from './search-entry-category'

describe('Search Entry Category', () => {
  it('should be able to search a entry category', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const entryCategoriesRepository = new InMemoryEntryCategoriesRepository()

    const createUser = new CreateUser(usersRepository)
    const createDashboard = new CreateDashboard(dashboardsRepository)
    const createEntryCategory = new CreateEntryCategory(dashboardsRepository, entryCategoriesRepository)
    const sut = new SearchEntryCategory(entryCategoriesRepository)

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const dashboard = await createDashboard.execute({
      title: 'Hey how',
      authorId: user.id,
    })

    const entryCategory = await createEntryCategory.execute({
      title: 'Transport',
      color: '#000',
      dashboardId: dashboard.id,
    })

    expect(sut.execute({
      titleToSearch: 'search'
    })).resolves.toEqual([])

    expect(sut.execute({
      titleToSearch: 'Tra'
    })).resolves.toEqual([entryCategory])
  })
})
