import { OutputCategory } from '../entities/output-category'

export interface OutputCategoriesRepository {
  create(outputCategory: OutputCategory): Promise<void>
  delete(outputCategoryId: OutputCategory['id']): Promise<void>
  list(): Promise<OutputCategory[]>
  search(titleToSearch: string): Promise<OutputCategory[]>
  save(outputCategory: OutputCategory): Promise<void>
}