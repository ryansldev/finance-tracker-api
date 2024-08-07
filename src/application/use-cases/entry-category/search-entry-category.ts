import { EntryCategory } from "../../entities/entry-category";
import { EntryCategoriesRepository } from "../../repositories/entry-categories-repository";

interface SearchEntryCategoryRequest {
  titleToSearch: string;
}

type SearchEntryCategoryResponse = EntryCategory[]

export class SearchEntryCategory {
  constructor(
    private entryCategoriesRepository: EntryCategoriesRepository
  ) {}

  async execute({ titleToSearch }: SearchEntryCategoryRequest): Promise<SearchEntryCategoryResponse> {
    return this.entryCategoriesRepository.search(titleToSearch)
  }
}