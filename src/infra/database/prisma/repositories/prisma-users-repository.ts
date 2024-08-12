import { PrismaService } from '../prisma';
import { User } from '../../../../application/entities/user';
import { UsersRepository } from '../../../../application/repositories/users-repository'
import { PrismaUserMapper } from '../mappers/prisma-users-mapper'

export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user)
    })
  }

  async find(userId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      }
    })

    if (!user) return undefined;

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user) return undefined;

    return PrismaUserMapper.toDomain(user)
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)
    await this.prisma.user.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}