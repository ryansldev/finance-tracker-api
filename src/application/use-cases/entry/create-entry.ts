import { Entry } from '../../entities/entry';

import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { EntryCategoriesRepository } from '../../repositories/entry-categories-repository'
import { EntriesRepository } from '../../repositories/entries-repository'

import { DashboardNotFound } from '../dashboard/errors/DashboardNotFound'
import { EntryCategoryNotFound } from '../entry-category/errors/EntryCategoryNotFound'

interface CreateEntryRequest {
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId: string;
  dashboardId: string;
  authorId: string;
}

type CreateEntryResponse = Entry

export class CreateEntry {
  constructor(
    private dashboardsRepository: DashboardsRepository,
    private entryCategoriesRepository: EntryCategoriesRepository,
    private entriesRepository: EntriesRepository,
  ) {}

  async execute({
    title,
    description,
    value,
    date,
    categoryId,
    dashboardId,
    authorId,
  }: CreateEntryRequest): Promise<CreateEntryResponse> {
    const dashboardAlreadyExists = await this.dashboardsRepository.find(dashboardId, authorId)
    if(!dashboardAlreadyExists) throw new DashboardNotFound()

    const categoryAlreadyExists = await this.entryCategoriesRepository.find(categoryId)
    if(!categoryAlreadyExists) throw new EntryCategoryNotFound()

    const entry = new Entry({
      title,
      description,
      value,
      date,
      categoryId,
      dashboardId
    })
    
    await this.entriesRepository.create(entry)

    return entry
  }
}