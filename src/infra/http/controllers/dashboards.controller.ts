import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersRepository } from '../../../application/repositories/users-repository';
import { DashboardsRepository } from '../../../application/repositories/dashboards-repository'

import { CreateDashboard } from '../../../application/use-cases/dashboard/create-dashboard'

import { DashboardNotFound } from '../../../application/use-cases/dashboard/errors/DashboardNotFound'
import { DashboardViewModel } from '../view-models/dashboard-view-model'

export class DashboardsController {
  private createDashboard: CreateDashboard
  
  constructor (
    private usersRepository: UsersRepository,
    private dashboardsRepository: DashboardsRepository,
  ) {
    this.createDashboard = new CreateDashboard(this.usersRepository, this.dashboardsRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user

    const createDashboardBodySchema = z.object({
      title: z.string(),
      description: z.string().optional(),
    })

    const {
      title,
      description
    } = createDashboardBodySchema.parse(request.body)

    await this.createDashboard.execute({
      title,
      description,
      authorId,
    })
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    const { id: userId } = request.user

    const findDashboardParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id: dashboardId } = findDashboardParamsSchema.parse(request.params)

    const dashboard = await this.dashboardsRepository.find(dashboardId)

    if(dashboard?.authorId !== userId) {
      // If Dashboard its not from logged user, it should not be found
      throw new DashboardNotFound()
    }

    return DashboardViewModel.toHTTP(dashboard)
  }
}