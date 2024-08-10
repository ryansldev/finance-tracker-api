import { Output } from '../../entities/output'
import { OutputsRepository } from '../outputs-repository'

export class InMemoryOutputsRepository implements OutputsRepository {
  public items: Output[] = []

  async create(output: Output): Promise<void> {
    this.items.push(output)
  }

  async list(dashboardId: string): Promise<Output[]> {
    const outputsFromDashboard = this.items.filter((output) => output.dashboardId === dashboardId)
    return outputsFromDashboard.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }
}