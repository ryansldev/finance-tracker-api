import { Dashboard } from '../../../../application/entities/dashboard';
import { DashboardsRepository } from '../../../../application/repositories/dashboards-repository'
import { PrismaDashboardMapper } from '../mappers/prisma-dashboards-mapper';
import { PrismaService } from '../prisma';

export class PrismaDashboardsRepository implements DashboardsRepository {
  constructor(private prisma: PrismaService) {}

  async create(dashboard: Dashboard): Promise<void> {
    await this.prisma.dashboard.create({
      data: {
        title: dashboard.title,
        description: dashboard.description,
        authorId: dashboard.authorId,
      }
    })
  }

  async find(dashboardId: string): Promise<Dashboard | undefined> {
    const dashboard = await this.prisma.dashboard.findFirst({
      where: {
        id: dashboardId,
      }
    })

    if(!dashboard) return

    return PrismaDashboardMapper.toDomain(dashboard)
  }

  async list(authorId: string): Promise<Dashboard[]> {
    const dashboards = await this.prisma.dashboard.findMany({
      where: {
        authorId,
      }
    })

    return dashboards.map(PrismaDashboardMapper.toDomain)
  }

  async save(dashboard: Dashboard): Promise<void> {
    await this.prisma.dashboard.updateMany({
      data: {
        id: dashboard.id,
        title: dashboard.title,
        description: dashboard.description,
        authorId: dashboard.authorId,
        createdAt: dashboard.createdAt,
        updatedAt: dashboard.updatedAt
      }
    })
  }
}