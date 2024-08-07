import { OutputCategory } from '../../entities/output-category';
import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { OutputCategoriesRepository } from '../../repositories/output-categories-repository'

import { DashboardNotFound } from '../dashboard/errors/DashboardNotFound'

interface CreateOutputCategoryRequest {
  title: string;
  color: string;
  dashboardId: string;
}

type CreateOutputCategoryResponse = OutputCategory

export class CreateOutputCategory {
  constructor (
    private dashboardsRepository: DashboardsRepository,
    private outputCategoriesRepository: OutputCategoriesRepository,
  ) {}

  async execute({
    title,
    color,
    dashboardId
  }: CreateOutputCategoryRequest): Promise<CreateOutputCategoryResponse> {
    const dashboard = await this.dashboardsRepository.find(dashboardId)
    if(!dashboard) throw new DashboardNotFound();

    const outputCategory = new OutputCategory({
      title,
      color,
      dashboardId,
    })

    await this.outputCategoriesRepository.create(outputCategory)

    return outputCategory
  }
}
