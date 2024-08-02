import { Dashboard } from '../../entities/dashboard'
import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { DashboardNotFound } from './errors/DashboardNotFound'

interface FindDashboardRequest {
  id: string;
}

type FindDashboardResponse = Dashboard

export class FindDashboard {
  constructor (
    private dashboardsRepository: DashboardsRepository
  ) {}

  async execute({
    id
  }: FindDashboardRequest): Promise<FindDashboardResponse> {
    const dashboard = await this.dashboardsRepository.find(id)
    if(!dashboard) throw new DashboardNotFound();

    return dashboard
  }
}