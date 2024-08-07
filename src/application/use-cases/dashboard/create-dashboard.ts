import { Dashboard } from '../../entities/dashboard'

import { UsersRepository } from '../../repositories/users-repository'
import { DashboardsRepository } from '../../repositories/dashboards-repository'

import { DashboardAuthorNotFound } from './errors/DashboardAuthorNotFound'

interface CreateDashboardRequest {
  title: string;
  description?: string;
  authorId: string;
}

type CreateDashboardResponse = Dashboard

export class CreateDashboard {
  constructor (
    private usersRepository: UsersRepository,
    private dashboardsRepository: DashboardsRepository
  ) {}

  async execute({
    title,
    description,
    authorId
  }: CreateDashboardRequest): Promise<CreateDashboardResponse> {
    const author = await this.usersRepository.find(authorId)
    if(!author) throw new DashboardAuthorNotFound();

    const dashboard = new Dashboard({
      title,
      description,
      authorId
    })

    await this.dashboardsRepository.create(dashboard)

    return dashboard
  }
}