import { EntryCategory } from '../entities/entry-category'

export interface EntryCategoriesRepository {
  create(entryCategory: EntryCategory): Promise<void>
  delete(entryCategoryId: EntryCategory['id']): Promise<void>
  list(): Promise<EntryCategory[]>
  search(titleToSearch: string): Promise<EntryCategory[]>
  save(entryCategory: EntryCategory): Promise<void>
}