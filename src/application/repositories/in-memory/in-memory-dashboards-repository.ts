import { Dashboard } from "../../entities/dashboard";
import { DashboardsRepository } from "../dashboards-repository";

export class InMemoryDashboardsRepository implements DashboardsRepository {
  public items: Dashboard[] = []
  
  async create(dashboard: Dashboard): Promise<void> {
    this.items.push(dashboard)
  }

  async find(dashboardId: string): Promise<Dashboard | undefined> {
    return this.items.find((dashboard) => dashboard.id === dashboardId)
  }

  async list(): Promise<Dashboard[]> {
    return this.items.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  async save(dashboard: Dashboard): Promise<void> {
    const index = this.items.indexOf(dashboard)
    if (index !== -1) {
      this.items[index] = dashboard
    }
  }
}