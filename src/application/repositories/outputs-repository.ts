import { Output } from '../entities/output'

export interface OutputsRepository {
  create(output: Output): Promise<void>
  list(): Promise<Output[]>
}