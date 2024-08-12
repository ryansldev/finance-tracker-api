import { EntryCategory as RawEntryCategory } from "@prisma/client"
import { EntryCategory } from "../../../../application/entities/entry-category";

export class PrismaEntryCategoriesMapper {  
  static toPrisma(entryCategory: EntryCategory): RawEntryCategory {
    return {
      id: entryCategory.id,
      title: entryCategory.title,
      color: entryCategory.color,
      dashboardId: entryCategory.dashboardId,
    }
  }

  static toDomain(entryCategory: RawEntryCategory): EntryCategory {
    return new EntryCategory({
      id: entryCategory.id,
      title: entryCategory.title,
      color: entryCategory.color,
      dashboardId: entryCategory.dashboardId,
    })
  }
}