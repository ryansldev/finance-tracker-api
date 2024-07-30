import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { UserNotFound } from './errors/UserNotFound'

interface FindUserRequest {
  id: string;
}

type FindUserResponse = User

export class FindUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id
  }: FindUserRequest): Promise<FindUserResponse> {
    const user = await this.usersRepository.find(id)
    if(!user) throw new UserNotFound();

    return user
  }
}