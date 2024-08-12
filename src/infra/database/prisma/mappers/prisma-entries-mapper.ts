import { Entry as RawEntry } from "@prisma/client"
import { Entry } from '../../../../application/entities/entry'

export class PrismaEntriesMapper {
  static toDomain(entry: RawEntry): Entry {
    return new Entry({
      id: entry.id,
      title: entry.title,
      value: entry.value,
      date: entry.date,
      description: entry.description ?? undefined,
      dashboardId: entry.dashboardId,
      categoryId: entry.categoryId,
    })
  }
}