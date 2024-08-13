import { Output as RawOutput } from '@prisma/client'
import { Output } from "../../../../application/entities/output";

export class PrismaOutputMapper {
  static toPrisma(output: Output): RawOutput {
    return {
      id: output.id,
      title: output.title,
      value: output.value,
      date: output.date,
      description: output.description ?? null,
      categoryId: output.categoryId,
      dashboardId: output.dashboardId,
    }
  }

  static toDomain(output: RawOutput): Output {
    return new Output({
      id: output.id,
      title: output.title,
      value: output.value,
      date: output.date,
      description: output.description ?? undefined,
      categoryId: output.categoryId,
      dashboardId: output.dashboardId,
    })
  }
}