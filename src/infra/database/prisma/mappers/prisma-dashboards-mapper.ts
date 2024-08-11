import { Dashboard as RawDashboard } from '@prisma/client'
import { Dashboard } from '../../../../application/entities/dashboard';

export class PrismaDashboardMapper {
  static toPrisma(dashboard: Dashboard): RawDashboard {
    return {
      id: dashboard.id,
      title: dashboard.title,
      description: dashboard.description ?? null,
      authorId: dashboard.authorId,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
    }
  }

  static toDomain(dashboard: RawDashboard): Dashboard {
    return new Dashboard({
      id: dashboard.id,
      title: dashboard.title,
      description: dashboard.description ?? undefined,
      authorId: dashboard.authorId,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
    })
  }
}