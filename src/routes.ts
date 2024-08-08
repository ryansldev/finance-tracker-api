import { FastifyInstance } from "fastify"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'

import { UsersController } from "./infra/http/controllers/users.controller"

const usersRepository = new PrismaUsersRepository(prisma)
const usersController = new UsersController(usersRepository)

async function routes (app: FastifyInstance) {
  app.post('/users', (request, reply) => usersController.create(request, reply))
  app.get('/users/:id', (request, reply) => usersController.find(request, reply))
}

export default routes
