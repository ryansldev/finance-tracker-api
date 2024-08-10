import 'dotenv/config'
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import jwt, { FastifyJWT } from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { HttpStatusCode } from './types/enums/http-status-code'
import routes from './routes'

const app = Fastify()

const secret = process.env.JWT_SECRET!;

app.register(jwt, {
  secret
})

app.addHook('preHandler', (request, _, next) => {
  request.jwt = app.jwt
  return next()
})

app.register(fastifyCookie, {
  secret,
  hook: 'preHandler'
})

app.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token

    if(!token) {
      return reply.status(HttpStatusCode.FORBIDDEN).send({ message: 'Authentication required' })
    }

    const decoded = request.jwt.verify<FastifyJWT['user']>(token)
    request.user = decoded
  }
)

app.register(routes)

const port = Number(process.env.PORT ?? 3333)
app.listen({ port }, (err, host) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${host}`)
})
