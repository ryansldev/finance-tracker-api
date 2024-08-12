import { OutputCategory as RawOutputCategory } from '@prisma/client'
import { OutputCategory } from "../../../../application/entities/output-category";

export class PrismaOutputCategoryMapper {
  static toPrisma(outputCategory: OutputCategory): RawOutputCategory {
    return {
      id: outputCategory.id,
      title: outputCategory.title,
      color: outputCategory.color,
      dashboardId: outputCategory.dashboardId,
    }
  }

  static toDomain(outputCategory: RawOutputCategory): OutputCategory {
    return new OutputCategory(outputCategory)
  }
}