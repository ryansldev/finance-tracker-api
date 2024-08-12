import { Entry } from "../../../application/entities/entry";

interface EntryHTTP {
  id: string;
  title: string;
  date: Date;
  value: number;
  description?: string;
  dashboardId: string;
  categoryId: string;
}

export class EntryViewModel {
  static toHTTP(entry: Entry): EntryHTTP {
    return {
      id: entry.id,
      title: entry.title,
      value: entry.value,
      date: entry.date,
      description: entry.description,
      dashboardId: entry.dashboardId,
      categoryId: entry.categoryId,
    }
  }
}