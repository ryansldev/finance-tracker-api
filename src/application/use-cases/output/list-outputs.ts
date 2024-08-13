import { Output } from '../../entities/output';
import { OutputsRepository } from '../../repositories/outputs-repository'

interface ListOutputsRequest {
  dashboardId: string;
}

type ListOutputsResponse = Output[]

export class ListOutputs {
  constructor (
    private outputsRepository: OutputsRepository,
  ) {}

  async execute({ dashboardId }: ListOutputsRequest): Promise<ListOutputsResponse> {
    return this.outputsRepository.list(dashboardId)
  }
}