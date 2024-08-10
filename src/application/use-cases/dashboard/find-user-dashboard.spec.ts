import { describe, expect, it } from 'vitest';
import { InMemoryDashboardsRepository } from '../../repositories/in-memory/in-memory-dashboards-repository';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { CreateDashboard } from './create-dashboard';
import { CreateUser } from '../user/create-user';
import { FindDashboard } from './find-user-dashboard';
import { Dashboard } from '../../entities/dashboard';
import { DashboardNotFound } from './errors/DashboardNotFound';

describe('Find Dashboard', () => {
  it('should be able to find a dashboard that already exists', async () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createUser = new CreateUser(usersRepository)
    const sut = new FindDashboard(dashboardsRepository)

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

    expect(sut.execute({ id: dashboard.id, authorId: author.id })).resolves.toBeInstanceOf(Dashboard)
  })

  it('should not be able to find a dashboard that not exists', () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const sut = new FindDashboard(dashboardsRepository)

    expect(sut.execute({ id: '1', authorId: '1' })).rejects.toThrowError(DashboardNotFound)
  })

  it('should not be able to find a dashboard that exists, but its not from logged user', async () => {
    const dashboardsRepository = new InMemoryDashboardsRepository()
    const usersRepository = new InMemoryUsersRepository()
    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createUser = new CreateUser(usersRepository)
    const sut = new FindDashboard(dashboardsRepository)

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

    expect(sut.execute({ id: dashboard.id, authorId: 'LOGGED USER ID' })).rejects.toThrowError(DashboardNotFound)
  })
})
