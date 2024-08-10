import { UsersRepository } from "../../repositories/users-repository";
import { UserAuthError } from './errors/UserAuthError'

interface AuthUserRequest {
  email: string;
  password: string;
}

export class AuthUser {
  constructor (
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: AuthUserRequest) {
    const user = await this.usersRepository.findByEmail(email)

    // Why not UserNotFound? Security reasons
    if(!user) throw new UserAuthError();

    const isPasswordMatching = user.isPasswordMatching(password)
    if(!isPasswordMatching) throw new UserAuthError();

    return { id: user.id }
  }
}