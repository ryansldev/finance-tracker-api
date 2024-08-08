import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UsersRepository } from '../../../application/repositories/users-repository'
import { CreateUser } from '../../../application/use-cases/user/create-user'


export class UsersController {
  private createUser: CreateUser;

  constructor(
    private usersRepository: UsersRepository,
  ) {
    this.createUser = new CreateUser(this.usersRepository)
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    console.log(this.createUser)
    const createUserBodySchema = z.object({
      name: z.string(),
      lastname: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const {
      name,
      lastname,
      email,
      password,
    } = createUserBodySchema.parse(request.body)

    await this.createUser.execute({
      name,
      lastname,
      email,
      password,
    })
  }
}