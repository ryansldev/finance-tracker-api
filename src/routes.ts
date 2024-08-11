import { FastifyInstance } from "fastify"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'
import { PrismaDashboardsRepository } from './infra/database/prisma/repositories/prisma-dashboards-repository'

import { UsersController } from "./infra/http/controllers/users.controller"
import { DashboardsController } from "./infra/http/controllers/dashboards.controller"

const usersRepository = new PrismaUsersRepository(prisma)
const usersController = new UsersController(usersRepository)

const dashboardsRepository = new PrismaDashboardsRepository(prisma)
const dashboardsController = new DashboardsController(usersRepository, dashboardsRepository)

async function routes (app: FastifyInstance) {
  app.post('/users', (request, reply) => usersController.create(request, reply))
  app.get('/users/:id', {
    preHandler: [app.authenticate]
  }, (request, reply) => usersController.find(request, reply))
  app.post('/auth', (request, reply) => usersController.auth(request, reply))
  app.delete('/auth', {
    preHandler: [app.authenticate],
  }, (request, reply) => usersController.logout(request, reply))

  app.post('/dashboards', {
    preHandler: [app.authenticate],
  }, (request, reply) => dashboardsController.create(request, reply))
}

export default routes
