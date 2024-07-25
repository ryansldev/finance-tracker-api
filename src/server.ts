import 'dotenv/config'
import Fastify from 'fastify'

const app = Fastify()

app.get('/', (_request, reply) => {
  reply.status(200).send({ hello: 'world' })
})

const port = Number(process.env.PORT ?? 3333)
app.listen({ port }, (err, host) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${host}`)
})
