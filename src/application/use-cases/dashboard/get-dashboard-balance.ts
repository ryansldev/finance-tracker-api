import { Entry } from '../../entities/entry';
import { Output } from '../../entities/output';
import { DashboardsRepository } from '../../repositories/dashboards-repository'
import { EntriesRepository } from '../../repositories/entries-repository'
import { OutputsRepository } from '../../repositories/outputs-repository'
import { DashboardNotFound } from './errors/DashboardNotFound';

interface GetDashboardBalanceRequest {
  dashboardId: string;
  authorId: string;
}

interface GetDashboardBalanceResponse {
  transactions: (Entry | Output)[]
  total: number;
}

export class GetDashboardBalance {
  constructor (
    private dashboardsRepository: DashboardsRepository,
    private entriesRepository: EntriesRepository,
    private outputsRepository: OutputsRepository,
  ) {}

  async execute({
    dashboardId,
    authorId,
  }: GetDashboardBalanceRequest) {
    const dashboard = await this.dashboardsRepository.find(dashboardId, authorId)
    if(!dashboard) throw new DashboardNotFound();

    const entries = await this.entriesRepository.list(dashboardId)
    const outputs = await this.outputsRepository.list(dashboardId)

    const unsortedTransactions = [...entries, ...outputs]
    const transactions = unsortedTransactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    let total = 0;
    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      total = total + entry.value
    }

    for (let index = 0; index < outputs.length; index++) {
      const output = outputs[index];
      total = total - output.value
    }

    return {
      transactions,
      total,
    }
  }
}