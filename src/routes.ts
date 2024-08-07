import { FastifyInstance } from "fastify"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'
import { UsersController } from "./infra/http/controllers/users.controller"
import { CreateUser } from './application/use-cases/user/create-user'

const usersRepository = new PrismaUsersRepository(prisma)

const createUser = new CreateUser(usersRepository)

const usersController = new UsersController(createUser)

async function routes (app: FastifyInstance) {
  app.post('/users', (request, reply) => usersController.create(request, reply))
}

export default routes
