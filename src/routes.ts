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
import { PrismaOutputsRepository } from './infra/database/prisma/repositories/prisma-outputs-repository'

import { UsersController } from "./infra/http/controllers/users.controller"
import { DashboardsController } from "./infra/http/controllers/dashboards.controller"
import { EntryCategoriesController } from './infra/http/controllers/entry-categories.controller'
import { EntriesController } from "./infra/http/controllers/entries.controller"
import { OutputCategoriesController } from './infra/http/controllers/output-categories.controller'
import { OutputsController } from "./infra/http/controllers/outputs.controller"

const usersRepository = new PrismaUsersRepository(prisma)
const dashboardsRepository = new PrismaDashboardsRepository(prisma)
const entryCategoriesRepository = new PrismaEntryCategoriesRepository(prisma)
const entriesRepository = new PrismaEntriesRepository(prisma)
const outputCategoriesRepository = new PrismaOutputCategoriesRepository(prisma)
const outputsRepository = new PrismaOutputsRepository(prisma)

const usersController = new UsersController(usersRepository)
const dashboardsController = new DashboardsController(usersRepository, dashboardsRepository, entriesRepository, outputsRepository)
const entryCategoriesController = new EntryCategoriesController(dashboardsRepository, entryCategoriesRepository)
const entriesController = new EntriesController(dashboardsRepository, entryCategoriesRepository, entriesRepository)
const outputCategoriesController = new OutputCategoriesController(dashboardsRepository, outputCategoriesRepository)
const outputsController = new OutputsController(dashboardsRepository, outputCategoriesRepository, outputsRepository)

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
  app.get('/dashboards/:id/balance', {
    preHandler: [app.authenticate]
  }, (request, reply) => dashboardsController.balance(request, reply))

  // ENTRY CATEGORY
  app.post('/dashboards/:id/entries/categories', {
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

  // OUTPUT
  app.post('/dashboards/:dashboardId/outputs', {
    preHandler: [app.authenticate],
  }, (request, reply) => outputsController.create(request, reply))
}

export default routes
