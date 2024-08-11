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
    const sut = new FindDashboard(usersRepository, dashboardsRepository)

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

  it('should not be able to find a dashboard that not exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()

    const createUser = new CreateUser(usersRepository)
    const sut = new FindDashboard(usersRepository, dashboardsRepository)

    const author = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    expect(sut.execute({ id: '1', authorId: author.id })).rejects.toThrowError(DashboardNotFound)
  })

  it('should not be able to find a dashboard from diferent author', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const dashboardsRepository = new InMemoryDashboardsRepository()

    const createDashboard = new CreateDashboard(usersRepository, dashboardsRepository)
    const createUser = new CreateUser(usersRepository)
    const sut = new FindDashboard(usersRepository, dashboardsRepository)

    const author = await createUser.execute({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'johndoe123'
    })

    const user = await createUser.execute({
      name: 'John',
      lastname: 'Doe 2',
      email: 'johndoe2@gmail.com',
      password: 'johndoe1234'
    })

    const dashboard = await createDashboard.execute({
      title: 'Personal Finances',
      authorId: author.id,
    })

    expect(sut.execute({
      id: dashboard.id,
      authorId: user.id,
    })).rejects.toThrow(DashboardNotFound)
  })
})
