import { Entry } from '../../entities/entry'
import { EntriesRepository } from '../../repositories/entries-repository'

interface ListEntriesRequest {
  dashboardId: string
}

type ListEntriesResponse = Entry[]

export class ListEntries {
  constructor (
    private entriesRepository: EntriesRepository,
  ) {}

  async execute({ dashboardId }: ListEntriesRequest): Promise<ListEntriesResponse> {
    return await this.entriesRepository.list(dashboardId)
  }
}