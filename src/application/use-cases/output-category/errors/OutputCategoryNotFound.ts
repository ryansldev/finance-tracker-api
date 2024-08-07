import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class OutputCategoryNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Output category not found')
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}