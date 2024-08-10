import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UsersRepository } from '../../../application/repositories/users-repository'
import { CreateUser } from '../../../application/use-cases/user/create-user'
import { FindUser } from '../../../application/use-cases/user/find-user'
import { AuthUser } from '../../../application/use-cases/user/auth-user'

export class UsersController {
  private createUser: CreateUser;
  private findUser: FindUser;
  private authUser: AuthUser;

  constructor(
    private usersRepository: UsersRepository,
  ) {
    this.createUser = new CreateUser(this.usersRepository)
    this.findUser = new FindUser(this.usersRepository)
    this.authUser = new AuthUser(this.usersRepository)
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

  async auth(request: FastifyRequest, reply: FastifyReply) {
    const authUserBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = authUserBodySchema.parse(request.body)

    const { id } = await this.authUser.execute({ email, password })

    const token = request.jwt.sign({ id })

    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    })

    return { token }
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('access_token')
    return reply.send({ message: 'Logout successfull' })
  }
}