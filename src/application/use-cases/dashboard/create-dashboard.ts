import { Dashboard } from '../../entities/dashboard'
import { DashboardsRepository } from '../../repositories/dashboards-repository'

interface CreateDashboardRequest {
  title: string;
  description?: string;
  authorId: string;
}

type CreateDashboardResponse = Dashboard

export class CreateDashboard {
  constructor (
    private dashboardsRepository: DashboardsRepository
  ) {}

  async execute({
    title,
    description,
    authorId
  }: CreateDashboardRequest): Promise<CreateDashboardResponse> {
    const dashboard = new Dashboard({
      title,
      description,
      authorId
    })

    await this.dashboardsRepository.create(dashboard)

    return dashboard
  }
}