import { Entry } from "../../entities/entry";
import { EntriesRepository } from "../entries-repository";

export class InMemoryEntriesRepository implements EntriesRepository {
  public items: Entry[] = []

  async create(entry: Entry): Promise<void> {
    this.items.push(entry)
  }

  async list(): Promise<Entry[]> {
    return this.items.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }
}