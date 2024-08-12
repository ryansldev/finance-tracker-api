import { EntryCategory } from "../../../application/entities/entry-category";

interface EntryCategoryHTTP {
  id: string;
  title: string;
  color: string;
  dashboardId: string;
}

export class EntryCategoryViewModel {
  static toHTTP(entryCategory: EntryCategory): EntryCategoryHTTP {
    return {
      id: entryCategory.id,
      title: entryCategory.title,
      color: entryCategory.color,
      dashboardId: entryCategory.dashboardId,
    }
  }
}