import { HttpStatusCode } from "../../../../types/enums/http-status-code"

export class EntryCategoryAlreadyExists extends Error {
  statusCode: HttpStatusCode
  
  constructor() {
    super('Entry category already exists')
    this.statusCode = HttpStatusCode.BAD_REQUEST
  }
}