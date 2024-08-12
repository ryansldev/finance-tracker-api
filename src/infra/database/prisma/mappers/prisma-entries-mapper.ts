import { Entry as RawEntry } from "@prisma/client"
import { Entry } from '../../../../application/entities/entry'

export class PrismaEntriesMapper {
  static toPrisma(entry: Entry): RawEntry {
    return {
      id: entry.id,
      title: entry.title,
      value: entry.value,
      date: entry.date,
      description: entry.description ?? null,
      categoryId: entry.categoryId,
      dashboardId: entry.dashboardId,
    }
  }

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