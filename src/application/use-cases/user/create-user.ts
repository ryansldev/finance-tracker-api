import { User } from '../../entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExists } from './errors/UserAlreadyExists'

interface CreateUserRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

type CreateUserResponse = User

export class CreateUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    lastname,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if(userAlreadyExists) throw new UserAlreadyExists();

    const user = new User({
      name,
      lastname,
      email,
      password,
    })

    await user.hashPassword()

    await this.usersRepository.create(user)

    return user
  }
}