import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UsersRepository } from '../../../application/repositories/users-repository';
import { DashboardsRepository } from '../../../application/repositories/dashboards-repository'

import { CreateDashboard } from '../../../application/use-cases/dashboard/create-dashboard'

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
}