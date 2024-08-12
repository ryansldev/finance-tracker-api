import { PrismaService } from '../prisma';
import { EntriesRepository } from '../../../../application/repositories/entries-repository'
import { Entry } from '../../../../application/entities/entry';
import { PrismaEntriesMapper } from '../mappers/prisma-entries-mapper';

export class PrismaEntriesRepository implements EntriesRepository {
  constructor (private prisma: PrismaService) {}

  async create(entry: Entry): Promise<void> {
    await this.prisma.entry.create({
      data: {
        id: entry.id,
        title: entry.title,
        value: entry.value,
        date: entry.date,
        description: entry.description,
        dashboardId: entry.dashboardId,
        categoryId: entry.categoryId,
      }
    })
  }

  async list(dashboardId: string): Promise<Entry[]> {
    const entries = await this.prisma.entry.findMany({
      where: {
        dashboardId,
      },
      orderBy: {
        date: 'desc'
      }
    })

    return entries.map(PrismaEntriesMapper.toDomain)
  }
}