import { OutputCategory } from '../../../application/entities/output-category';

interface OutputCategoryHTTP {
  id: string;
  title: string;
  color: string;
  dashboardId: string;
}

export class OutputCategoryViewModel {
  static toHTTP(outputCategory: OutputCategory): OutputCategoryHTTP {
    return {
      id: outputCategory.id,
      title: outputCategory.title,
      color: outputCategory.color,
      dashboardId: outputCategory.dashboardId,
    }
  }
}