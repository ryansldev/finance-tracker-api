import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { DashboardsRepository } from '../../../application/repositories/dashboards-repository'
import { OutputCategoriesRepository } from '../../../application/repositories/output-categories-repository'
import { OutputsRepository } from '../../../application/repositories/outputs-repository'

import { CreateOutput } from '../../../application/use-cases/output/create-output'

export class OutputsController {
  private createOutput: CreateOutput
  
  constructor (
    private dashboardsRepository: DashboardsRepository,
    private outputCategoriesRepository: OutputCategoriesRepository,
    private outputsRepository: OutputsRepository,
  ) {
    this.createOutput = new CreateOutput(this.dashboardsRepository, this.outputCategoriesRepository, this.outputsRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user
    
    const createOutputBodySchema = z.object({
      title: z.string(),
      date: z.date().default(new Date()),
      value: z.number().min(0),
      description: z.string().optional(),
      categoryId: z.string().uuid(),
    })

    const createOutputParamsSchema = z.object({
      dashboardId: z.string().uuid(),
    })

    const {
      title,
      date,
      value,
      description,
      categoryId
    } = createOutputBodySchema.parse(request.body)

    const {
      dashboardId
    } = createOutputParamsSchema.parse(request.params)

    await this.createOutput.execute({
      title,
      date,
      value,
      description,
      categoryId,
      dashboardId,
      authorId,
    })
  }
}