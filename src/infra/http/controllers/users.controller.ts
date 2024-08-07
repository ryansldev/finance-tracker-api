import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser } from '../../../application/use-cases/user/create-user'
import { z } from 'zod'

export class UsersController {
  constructor(
    private createUser: CreateUser,
  ) {}

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