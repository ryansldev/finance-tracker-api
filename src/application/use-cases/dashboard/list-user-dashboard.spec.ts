import { describe, expect, it } from 'vitest';
import { Dashboard } from '../../entities/dashboard';

import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';

import { CreateDashboard } from './create-dashboard';
import { CreateUser } from '../user/create-user';
import { ListUserDashboards } from './list-user-dashboards'

describe('List User Dashboards', () => {
  it('should be able to list user dashboards', async () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const usersRepository = new InMemoryUsersRepository()

    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createUser = new CreateUser(usersRepository)
    const sut = new ListUserDashboards(dashboardsRepository)

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

    expect(sut.execute({
      authorId: user.id
    })).resolves.toEqual([dashboard])
  })
})
