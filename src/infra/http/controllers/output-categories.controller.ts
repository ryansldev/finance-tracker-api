import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { OutputCategoryViewModel } from '../view-models/output-category-view-model'

import { DashboardsRepository } from '../../../application/repositories/dashboards-repository'
import { OutputCategoriesRepository } from '../../../application/repositories/output-categories-repository'

import { CreateOutputCategory } from '../../../application/use-cases/output-category/create-output-category'
import { SearchOutputCategory } from '../../../application/use-cases/output-category/search-output-category'

export class OutputCategoriesController {
  private createOutputCategory: CreateOutputCategory
  private searchOutputCategory: SearchOutputCategory

  constructor (
    private dashboardsRepository: DashboardsRepository,
    private outputCategoriesRepository: OutputCategoriesRepository,
  ) {
    this.createOutputCategory = new CreateOutputCategory(this.dashboardsRepository, this.outputCategoriesRepository)
    this.searchOutputCategory = new SearchOutputCategory(this.outputCategoriesRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user

    const createOutputCategoryBodySchema = z.object({
      title: z.string(),
      color: z.string().length(7).regex(/^#/),
    })

    const createOutputCategoryParamsSchema = z.object({
      dashboardId: z.string().uuid(),
    })

    const {
      title,
      color,
    } = createOutputCategoryBodySchema.parse(request.body)

    const {
      dashboardId
    } = createOutputCategoryParamsSchema.parse(request.params)

    await this.createOutputCategory.execute({
      title,
      color,
      authorId,
      dashboardId,
    })
  }

  async search(request: FastifyRequest, reply: FastifyReply) {
    const searchParamsSchema = z.object({
      dashboardId: z.string().uuid(),
      titleToSearch: z.string(),
    })

    const {
      dashboardId,
      titleToSearch,
    } = searchParamsSchema.parse(request.params)

    const outputCategories = await this.searchOutputCategory.execute({
      dashboardId,
      titleToSearch,
    })

    return outputCategories.map(OutputCategoryViewModel.toHTTP)
  }
}