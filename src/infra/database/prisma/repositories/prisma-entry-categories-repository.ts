import { PrismaService } from '../prisma';
import { EntryCategory } from '../../../../application/entities/entry-category';
import { EntryCategoriesRepository } from '../../../../application/repositories/entry-categories-repository'
import { PrismaEntryCategoriesMapper } from '../mappers/prisma-entry-categories-mapper'

export class PrismaEntryCategoriesRepository implements EntryCategoriesRepository {
  constructor (private prisma: PrismaService) {}

  async create(entryCategory: EntryCategory): Promise<void> {
    await this.prisma.entryCategory.create({
      data: {
        id: entryCategory.id,
        title: entryCategory.title,
        color: entryCategory.color,
        dashboardId: entryCategory.dashboardId,
      }
    })
  }

  async list(dashboardId: string): Promise<EntryCategory[]> {
    const entryCategories = await this.prisma.entryCategory.findMany({
      where: {
        dashboardId,
      },
      orderBy: {
        title: 'desc'
      }
    })

    return entryCategories.map(PrismaEntryCategoriesMapper.toDomain)
  }

  async find(id: string): Promise<EntryCategory | undefined> {
    const entryCategory = await this.prisma.entryCategory.findUnique({
      where: {
        id
      }
    })

    if(!entryCategory) return undefined;

    return PrismaEntryCategoriesMapper.toDomain(entryCategory)
  }

  async findByTitle(title: string): Promise<EntryCategory | undefined> {
    const entryCategory = await this.prisma.entryCategory.findUnique({
      where: {
        title
      }
    })

    if(!entryCategory) return undefined;

    return PrismaEntryCategoriesMapper.toDomain(entryCategory)
  }

  async search(dashboardId: string, titleToSearch: string): Promise<EntryCategory[]> {
    const entryCategories = await this.prisma.entryCategory.findMany({
      where: {
        title: {
          contains: titleToSearch,
        },
        dashboardId,
      }
    })

    return entryCategories.map(PrismaEntryCategoriesMapper.toDomain)
  }

  async delete(entryCategoryId: EntryCategory['id']): Promise<void> {
    await this.prisma.entryCategory.delete({
      where: {
        id: entryCategoryId
      }
    })
  }

  async save(entryCategory: EntryCategory): Promise<void> {
    await this.prisma.entryCategory.update({
      where: {
        id: entryCategory.id,
      },
      data: {
        title: entryCategory.title,
        color: entryCategory.color,
        dashboardId: entryCategory.dashboardId,
      }
    })
  }
}