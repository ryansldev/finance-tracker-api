import { Dashboard } from '../../entities/dashboard'
import { DashboardsRepository } from '../../repositories/dashboards-repository'

interface ListUserDashboardsRequest {
  authorId: string
}

type ListUserDashboardsResponse = Dashboard[]

export class ListUserDashboards {
  constructor(
    private dashboardsRepository: DashboardsRepository
  ) {}

  async execute({ authorId }: ListUserDashboardsRequest): Promise<ListUserDashboardsResponse> {
    return await this.dashboardsRepository.list(authorId)
  }
}