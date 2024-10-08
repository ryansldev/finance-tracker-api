import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { DashboardViewModel } from '../view-models/dashboard-view-model'
import { TransactionViewModel } from '../view-models/transaction-view-model'

import { UsersRepository } from '../../../application/repositories/users-repository';
import { DashboardsRepository } from '../../../application/repositories/dashboards-repository'
import { EntriesRepository } from '../../../application/repositories/entries-repository';
import { OutputsRepository } from '../../../application/repositories/outputs-repository';

import { CreateDashboard } from '../../../application/use-cases/dashboard/create-dashboard'
import { ListUserDashboards } from '../../../application/use-cases/dashboard/list-user-dashboards'
import { FindDashboard } from '../../../application/use-cases/dashboard/find-user-dashboard';
import { GetDashboardBalance } from '../../../application/use-cases/dashboard/get-dashboard-balance'

export class DashboardsController {
  private createDashboard: CreateDashboard
  private findDashboard: FindDashboard
  private listUserDashboards: ListUserDashboards
  private getDashboardBalance: GetDashboardBalance
  
  constructor (
    private usersRepository: UsersRepository,
    private dashboardsRepository: DashboardsRepository,
    private entriesRepository: EntriesRepository,
    private outputsRepository: OutputsRepository,
  ) {
    this.createDashboard = new CreateDashboard(this.usersRepository, this.dashboardsRepository)
    this.findDashboard = new FindDashboard(this.usersRepository, this.dashboardsRepository)
    this.listUserDashboards = new ListUserDashboards(this.dashboardsRepository)
    this.getDashboardBalance = new GetDashboardBalance(this.dashboardsRepository, this.entriesRepository, this.outputsRepository)
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

  async list(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user
    const dashboards = await this.listUserDashboards.execute({ authorId })
    return dashboards.map(DashboardViewModel.toHTTP)
  }

  async find(request: FastifyRequest, _reply: FastifyReply) {
    const { id: userId } = request.user

    const findDashboardParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id: dashboardId } = findDashboardParamsSchema.parse(request.params)

    const dashboard = await this.findDashboard.execute({
      id: dashboardId,
      authorId: userId,
    })

    return DashboardViewModel.toHTTP(dashboard)
  }

  async balance(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user

    const getDashboardBalanceParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id: dashboardId } = getDashboardBalanceParamsSchema.parse(request.params)

    const {
      transactions,
      total,
    } = await this.getDashboardBalance.execute({ dashboardId, authorId })
    
    return {
      transactions: transactions.map(TransactionViewModel.toHTTP),
      total,
    }
  }
}