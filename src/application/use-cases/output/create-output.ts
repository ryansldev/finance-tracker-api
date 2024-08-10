import { Output } from '../../entities/output';

import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { OutputCategoriesRepository } from '../../repositories/output-categories-repository'
import { OutputsRepository } from '../../repositories/outputs-repository'

import { DashboardNotFound } from '../dashboard/errors/DashboardNotFound'
import { OutputCategoryNotFound } from '../output-category/errors/OutputCategoryNotFound'

interface CreateOutputRequest {
  title: string;
  description?: string;
  value: number;
  date: Date;
  categoryId: string;
  dashboardId: string;
}

type CreateOutputResponse = Output

export class CreateOutput {
  constructor(
    private dashboardsRepository: DashboardsRepository,
    private outputCategoriesRepository: OutputCategoriesRepository,
    private outputsRepository: OutputsRepository,
  ) {}

  async execute({
    title,
    description,
    value,
    date,
    categoryId,
    dashboardId,
  }: CreateOutputRequest): Promise<CreateOutputResponse> {
    const dashboardAlreadyExists = await this.dashboardsRepository.find(dashboardId)
    if(!dashboardAlreadyExists) throw new DashboardNotFound()

    const categoryAlreadyExists = await this.outputCategoriesRepository.find(categoryId)
    if(!categoryAlreadyExists) throw new OutputCategoryNotFound()

    const output = new Output({
      title,
      description,
      value,
      date,
      categoryId,
      dashboardId
    })
    
    await this.outputsRepository.create(output)

    return output
  }
}