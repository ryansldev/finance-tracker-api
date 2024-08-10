import { OutputCategory } from '../entities/output-category'

export interface OutputCategoriesRepository {
  create(outputCategory: OutputCategory): Promise<void>
  delete(outputCategoryId: OutputCategory['id']): Promise<void>
  list(dashboardId: string): Promise<OutputCategory[]>
  search(titleToSearch: string): Promise<OutputCategory[]>
  find(id: string): Promise<OutputCategory | undefined>
  save(outputCategory: OutputCategory): Promise<void>
}