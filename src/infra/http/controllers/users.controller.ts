import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UsersRepository } from '../../../application/repositories/users-repository'
import { CreateUser } from '../../../application/use-cases/user/create-user'
import { FindUser } from '../../../application/use-cases/user/find-user'

export class UsersController {
  private createUser: CreateUser;
  private findUser: FindUser;

  constructor(
    private usersRepository: UsersRepository,
  ) {
    this.createUser = new CreateUser(this.usersRepository)
    this.findUser = new FindUser(this.usersRepository)
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
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

  async find(request: FastifyRequest, reply: FastifyReply) {
    const findUserParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = findUserParamsSchema.parse(request.params)

    return await this.findUser.execute({ id })
  }
}