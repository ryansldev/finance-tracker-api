import { FastifyInstance } from "fastify"

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query']
})

import { PrismaUsersRepository } from './infra/database/prisma/repositories/prisma-users-repository'
import { PrismaDashboardsRepository } from './infra/database/prisma/repositories/prisma-dashboards-repository'
import { PrismaEntryCategoriesRepository } from './infra/database/prisma/repositories/prisma-entry-categories-repository'
import { PrismaEntriesRepository } from './infra/database/prisma/repositories/prisma-entries-repository'
import { PrismaOutputCategoriesRepository } from './infra/database/prisma/repositories/prisma-output-categories-repository'

import { UsersController } from "./infra/http/controllers/users.controller"
import { DashboardsController } from "./infra/http/controllers/dashboards.controller"
import { EntryCategoriesController } from './infra/http/controllers/entry-categories.controller'
import { EntriesController } from "./infra/http/controllers/entries.controller"
import { OutputCategoriesController } from './infra/http/controllers/output-categories.controller'

const usersRepository = new PrismaUsersRepository(prisma)
const usersController = new UsersController(usersRepository)

const dashboardsRepository = new PrismaDashboardsRepository(prisma)
const dashboardsController = new DashboardsController(usersRepository, dashboardsRepository)

const entryCategoriesRepository = new PrismaEntryCategoriesRepository(prisma)
const entryCategoriesController = new EntryCategoriesController(dashboardsRepository, entryCategoriesRepository)

const entriesRepository = new PrismaEntriesRepository(prisma)
const entriesController = new EntriesController(dashboardsRepository, entryCategoriesRepository, entriesRepository)

const outputCategoriesRepository = new PrismaOutputCategoriesRepository(prisma)
const outputCategoriesController = new OutputCategoriesController(dashboardsRepository, outputCategoriesRepository)

async function routes (app: FastifyInstance) {
  // USER
  app.post('/users', (request, reply) => usersController.create(request, reply))
  app.get('/users/:id', {
    preHandler: [app.authenticate]
  }, (request, reply) => usersController.find(request, reply))
  app.post('/auth', (request, reply) => usersController.auth(request, reply))
  app.delete('/auth', {
    preHandler: [app.authenticate],
  }, (request, reply) => usersController.logout(request, reply))

  // DASHBOARD
  app.post('/dashboards', {
    preHandler: [app.authenticate],
  }, (request, reply) => dashboardsController.create(request, reply))
  app.get('/dashboards', {
    preHandler: [app.authenticate]
  }, (request, reply) => dashboardsController.list(request, reply))
  app.get('/dashboards/:id', {
    preHandler: [app.authenticate]
  }, (request, reply) => dashboardsController.find(request, reply))

  // ENTRY CATEGORY
  app.post('/dashboards/:dashboardId/entries/categories', {
    preHandler: [app.authenticate]
  }, (request, reply) => entryCategoriesController.create(request, reply))
  app.get('/dashboards/:dashboardId/entries/categories/search/:titleToSearch', {
    preHandler: [app.authenticate]
  }, (request, reply) => entryCategoriesController.search(request, reply))

  // ENTRY
  app.post('/dashboards/:dashboardId/entries', {
    preHandler: [app.authenticate]
  }, (request, reply) => entriesController.create(request, reply))

  app.get('/dashboards/:dashboardId/entries', {
    preHandler: [app.authenticate]
  }, (request, reply) => entriesController.list(request, reply))

  // OUTPUT CATEGORY
  app.post('/dashboards/:dashboardId/outputs/categories', {
    preHandler: [app.authenticate]
  }, (request, reply) => outputCategoriesController.create(request, reply))

  app.get('/dashboards/:dashboardId/outputs/categories/search/:titleToSearch', {
    preHandler: [app.authenticate]
  }, (request, reply) => outputCategoriesController.search(request, reply))
}

export default routes
