import { describe, expect, it } from 'vitest';
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateDashboard } from './create-dashboard';
import { Dashboard } from '../../entities/dashboard';
import { CreateUser } from '../user/create-user';

describe('Create Dashboard', () => {
  it('should be able to create a dashboard', async () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createUser = new CreateUser(usersRepository)
    const sut = new CreateDashboard(dashboardsRepository)

    const author = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    expect(sut.execute({
      title: 'Personal Finances',
      authorId: author.id,
    })).resolves.toBeInstanceOf(Dashboard)
  })
})
