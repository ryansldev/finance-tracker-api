import { User as RawUser } from '@prisma/client';
import { User } from '../../../../application/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        id: raw.id,
        name: raw.name,
        lastname: raw.lastname,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    );
  }
}