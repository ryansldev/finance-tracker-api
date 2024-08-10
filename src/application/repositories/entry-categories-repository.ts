import { EntryCategory } from '../entities/entry-category'

export interface EntryCategoriesRepository {
  create(entryCategory: EntryCategory): Promise<void>
  delete(entryCategoryId: EntryCategory['id']): Promise<void>
  list(dashboardId: string): Promise<EntryCategory[]>
  search(dashboardId: string, titleToSearch: string): Promise<EntryCategory[]>
  findByTitle(title: string): Promise<EntryCategory | undefined>
  find(id: string): Promise<EntryCategory | undefined>
  save(entryCategory: EntryCategory): Promise<void>
}