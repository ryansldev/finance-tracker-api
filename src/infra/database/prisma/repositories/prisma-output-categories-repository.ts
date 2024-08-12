import { PrismaService } from '../prisma'
import { OutputCategoriesRepository } from '../../../../application/repositories/output-categories-repository'
import { OutputCategory } from '../../../../application/entities/output-category'
import { PrismaOutputCategoryMapper } from '../mappers/prisma-output-categories-mapper'

export class PrismaOutputCategoriesRepository implements OutputCategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(outputCategory: OutputCategory): Promise<void> {
    await this.prisma.outputCategory.create({
      data: PrismaOutputCategoryMapper.toPrisma(outputCategory)
    })
  }

  async list(dashboardId: string): Promise<OutputCategory[]> {
    const outputCategories = await this.prisma.outputCategory.findMany({
      where: {
        dashboardId,
      },
      orderBy: {
        title: 'asc'
      }
    })

    return outputCategories.map(PrismaOutputCategoryMapper.toDomain)
  }

  async find(id: string): Promise<OutputCategory | undefined> {
    const outputCategory = await this.prisma.outputCategory.findUnique({
      where: {
        id,
      }
    })

    if(!outputCategory) {
      return undefined
    }

    return PrismaOutputCategoryMapper.toDomain(outputCategory)
  }

  async search(dashboardId: string, titleToSearch: string): Promise<OutputCategory[]> {
    const results = await this.prisma.outputCategory.findMany({
      where: {
        title: {
          contains: titleToSearch,
        },
        dashboardId,
      },
      orderBy: {
        title: 'asc'
      }
    })

    return results.map(PrismaOutputCategoryMapper.toDomain)
  }

  async delete(outputCategoryId: OutputCategory['id']): Promise<void> {
    await this.prisma.outputCategory.delete({
      where: {
        id: outputCategoryId,
      }
    })
  }

  async save(outputCategory: OutputCategory): Promise<void> {
    await this.prisma.outputCategory.update({
      where: {
        id: outputCategory.id,
      },
      data: PrismaOutputCategoryMapper.toPrisma(outputCategory)
    })
  }
}