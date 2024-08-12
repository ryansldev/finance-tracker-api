import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { DashboardsRepository } from '../../../application/repositories/dashboards-repository';
import { EntryCategoriesRepository } from '../../../application/repositories/entry-categories-repository'

import { CreateEntryCategory } from '../../../application/use-cases/entry-category/create-entry-category'
import { SearchEntryCategory } from '../../../application/use-cases/entry-category/search-entry-category'
import { EntryCategoryViewModel } from '../view-models/entry-category-view-model';

export class EntryCategoriesController {
  private createEntryCategory: CreateEntryCategory
  private searchEntryCategory: SearchEntryCategory

  constructor (
    private dashboardsRepository: DashboardsRepository,
    private entryCategoriesRepository: EntryCategoriesRepository,
  ) {
    this.createEntryCategory = new CreateEntryCategory(this.dashboardsRepository, this.entryCategoriesRepository)
    this.searchEntryCategory = new SearchEntryCategory(this.entryCategoriesRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const createEntryCategoriesBodySchema = z.object({
      title: z.string(),
      color: z.string().length(7).regex(/^#/),
      dashboardId: z.string().uuid(),
      authorId: z.string().uuid(),
    })

    const { title, color, dashboardId, authorId } = createEntryCategoriesBodySchema.parse(request.body)

    await this.createEntryCategory.execute({
      title,
      color,
      dashboardId,
      authorId,
    })
  }

  async search(request: FastifyRequest, _reply: FastifyReply) {
    const searchEntryCategoriesParamsSchema = z.object({
      dashboardId: z.string().uuid(),
      titleToSearch: z.string(),
    })

    const { dashboardId, titleToSearch } = searchEntryCategoriesParamsSchema.parse(request.params)

    const entryCategories = await this.searchEntryCategory.execute({
      dashboardId,
      titleToSearch,
    })
    
    return entryCategories.map(EntryCategoryViewModel.toHTTP)
  }
}