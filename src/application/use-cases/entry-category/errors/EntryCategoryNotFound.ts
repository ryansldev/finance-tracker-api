import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class EntryCategoryNotFound extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Entry category not found')
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}