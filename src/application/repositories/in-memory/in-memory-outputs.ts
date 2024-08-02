import { Output } from '../../entities/output'
import { OutputsRepository } from '../outputs-repository'

export class InMemoryOutputsRepository implements OutputsRepository {
  public items: Output[] = []

  async create(output: Output): Promise<void> {
    this.items.push(output)
  }

  async list(): Promise<Output[]> {
    return this.items.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }
}