import { EntryCategory } from '../../entities/entry-category'
import { EntryCategoriesRepository } from '../../repositories/entry-categories-repository'
import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { EntryCategoryAlreadyExists } from './errors/EntryCategoryAlreadyExists'
import { DashboardNotFound } from '../dashboard/errors/DashboardNotFound'
import { UsersRepository } from '../../repositories/users-repository'
import { DashboardAuthorNotFound } from '../dashboard/errors/DashboardAuthorNotFound'

interface CreateEntryCategoryRequest {
  title: string;
  color: string;
  dashboardId: string;
  authorId: string;
}

type CreateEntryCategoryResponse = EntryCategory

export class CreateEntryCategory {
  constructor (
    private dashboardsRepository: DashboardsRepository,
    private entryCategoriesRepository: EntryCategoriesRepository,
  ) {}

  async execute({
    title,
    color,
    authorId,
    dashboardId,
  }: CreateEntryCategoryRequest): Promise<CreateEntryCategoryResponse> {
    const dashboard = await this.dashboardsRepository.find(dashboardId, authorId)
    if(!dashboard) throw new DashboardNotFound();

    const entryCategoryAlreadyExists = await this.entryCategoriesRepository.findByTitle(title)
    if(entryCategoryAlreadyExists) throw new EntryCategoryAlreadyExists();

    const entryCategory = new EntryCategory({
      title,
      color,
      dashboardId,
    })

    await this.entryCategoriesRepository.create(entryCategory)

    return entryCategory
  }
}