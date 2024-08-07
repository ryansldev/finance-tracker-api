import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class DashboardAuthorNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Dashboard author not found')
    this.statusCode = HttpStatusCode.NOT_FOUND
  }
}