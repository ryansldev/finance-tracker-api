import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { EntryViewModel } from '../view-models/entry-view-model'

import { DashboardsRepository } from "../../../application/repositories/dashboards-repository";
import { EntryCategoriesRepository } from "../../../application/repositories/entry-categories-repository";
import { EntriesRepository } from "../../../application/repositories/entries-repository";

import { CreateEntry } from '../../../application/use-cases/entry/create-entry'
import { ListEntries } from '../../../application/use-cases/entry/list-entries'

export class EntriesController {
  private createEntry: CreateEntry
  private listEntries: ListEntries

  constructor (
    private dashboardsRepository: DashboardsRepository,
    private entryCategoriesRepository: EntryCategoriesRepository,
    private entriesRepository: EntriesRepository,
  ) {
    this.createEntry = new CreateEntry(this.dashboardsRepository, this.entryCategoriesRepository, this.entriesRepository)
    this.listEntries = new ListEntries(this.entriesRepository)
  }

  async create(request: FastifyRequest, _reply: FastifyReply) {
    const { id: authorId } = request.user;

    const createEntryParamsSchema = z.object({
      dashboardId: z.string().uuid()
    })
    
    const createEntryBodySchema = z.object({
      title: z.string(),
      value: z.number().min(0),
      date: z.date().default(new Date()),
      description: z.string().optional(),
      categoryId: z.string().uuid(),
    })

    const {
      title,
      value,
      date,
      description,
      categoryId,
    } = createEntryBodySchema.parse(request.body)

    const { dashboardId } = createEntryParamsSchema.parse(request.params)

    await this.createEntry.execute({
      title,
      value,
      date,
      description,
      categoryId,
      dashboardId,
      authorId,
    })
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    const listEntriesParamsSchema = z.object({
      dashboardId: z.string().uuid(),
    })

    const { dashboardId } = listEntriesParamsSchema.parse(request.params)
    
    const entries = await this.listEntries.execute({
      dashboardId,
    })

    return entries.map(EntryViewModel.toHTTP)
  }
}