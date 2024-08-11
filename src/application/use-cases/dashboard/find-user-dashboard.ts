import { Dashboard } from '../../entities/dashboard'
import { UsersRepository } from '../../repositories/users-repository';
import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { DashboardNotFound } from './errors/DashboardNotFound'
import { DashboardAuthorNotFound } from './errors/DashboardAuthorNotFound';

interface FindDashboardRequest {
  id: string;
  authorId: string;
}

type FindDashboardResponse = Dashboard

export class FindDashboard {
  constructor (
    private usersRepository: UsersRepository,
    private dashboardsRepository: DashboardsRepository
  ) {}

  async execute({
    id,
    authorId,
  }: FindDashboardRequest): Promise<FindDashboardResponse> {
    const userAlreadyExists = await this.usersRepository.find(authorId)
    if(!userAlreadyExists) throw new DashboardAuthorNotFound();
    
    const dashboard = await this.dashboardsRepository.find(id, authorId)
    if(!dashboard) throw new DashboardNotFound();

    return dashboard
  }
}