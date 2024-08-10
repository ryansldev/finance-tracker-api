import { Entry } from "../../entities/entry";
import { EntriesRepository } from "../entries-repository";

export class InMemoryEntriesRepository implements EntriesRepository {
  public items: Entry[] = []

  async create(entry: Entry): Promise<void> {
    this.items.push(entry)
  }

  async list(dashboardId: string): Promise<Entry[]> {
    const items = this.items.filter((item) => item.dashboardId === dashboardId)
    return items.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }
}