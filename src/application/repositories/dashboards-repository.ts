import { Dashboard } from '../entities/dashboard'

export interface DashboardsRepository {
  create(dashboard: Dashboard): Promise<void>
  find(dashboardId: string): Promise<Dashboard | undefined>
  list(authorId: string): Promise<Dashboard[]>
  save(dashboard: Dashboard): Promise<void>
}
