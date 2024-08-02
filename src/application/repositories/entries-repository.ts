import { Entry } from '../entities/entry'

export interface EntriesRepository {
  create(entry: Entry): Promise<void>
  list(): Promise<Entry[]>
}