import { Entry } from '../../entities/entry'
import { EntriesRepository } from '../../repositories/entries-repository'

type ListEntriesResponse = Entry[]

export class ListEntries {
  constructor (
    private entriesRepository: EntriesRepository,
  ) {}

  async execute(): Promise<ListEntriesResponse> {
    return await this.entriesRepository.list()
  }
}