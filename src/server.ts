import 'dotenv/config'
import Fastify from 'fastify'
import routes from './routes'

const app = Fastify()

app.register(routes)

const port = Number(process.env.PORT ?? 3333)
app.listen({ port }, (err, host) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.log(`HTTP Server listening on ${host}`)
})
