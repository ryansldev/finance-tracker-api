import { EntryCategory } from "../../entities/entry-category";
import { EntryCategoriesRepository } from "../../repositories/entry-categories-repository";

interface SearchEntryCategoryRequest {
  dashboardId: string;
  titleToSearch: string;
}

type SearchEntryCategoryResponse = EntryCategory[]

export class SearchEntryCategory {
  constructor(
    private entryCategoriesRepository: EntryCategoriesRepository
  ) {}

  async execute({ dashboardId, titleToSearch }: SearchEntryCategoryRequest): Promise<SearchEntryCategoryResponse> {
    return this.entryCategoriesRepository.search(dashboardId, titleToSearch)
  }
}