import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class DashboardNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Dashboard not found')
    this.statusCode = HttpStatusCode.NOT_FOUND
  }
}