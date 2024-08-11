import { Dashboard } from "../../../application/entities/dashboard";

interface DashboardHTTP {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class DashboardViewModel {
  static toHTTP(dashboard: Dashboard) {
    return {
      id: dashboard.id,
      title: dashboard.title,
      description: dashboard.description,
      createdAt: dashboard.createdAt,
      updatedAt: dashboard.updatedAt,
    }
  }
}