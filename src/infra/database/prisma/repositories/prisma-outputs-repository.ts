import { PrismaService } from '../prisma';
import { OutputsRepository } from '../../../../application/repositories/outputs-repository'
import { Output } from '../../../../application/entities/output';
import { PrismaOutputMapper } from '../mappers/prisma-outputs-mapper'

export class PrismaOutputsRepository implements OutputsRepository {
  constructor (private prisma: PrismaService) {}

  async create(output: Output): Promise<void> {
    await this.prisma.output.create({
      data: PrismaOutputMapper.toPrisma(output)
    })
  }

  async list(dashboardId: string): Promise<Output[]> {
    const outputs = await this.prisma.output.findMany({
      where: {
        dashboardId,
      },
      orderBy: {
        date: 'asc'
      }
    })

    return outputs.map(PrismaOutputMapper.toDomain)
  }
}