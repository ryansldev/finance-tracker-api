import { OutputCategory } from '../../entities/output-category';
import { OutputCategoriesRepository } from '../../repositories/output-categories-repository'

interface SearchOutputCategoryRequest {
  titleToSearch: string;
}

type SearchOutputCategoryResponse = OutputCategory[]

export class SearchOutputCategory {
  constructor (
    private outputCategoriesRepository: OutputCategoriesRepository,
  ) {}

  async execute({ titleToSearch }: SearchOutputCategoryRequest): Promise<SearchOutputCategoryResponse> {
    return this.outputCategoriesRepository.search(titleToSearch)
  }
}