const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')
/**
 * Esto es lo mismo de arriba ya que al llamar a la carpeta 'schema' por defecto
 * va a buscar un archivo llamado 'index.js'
 * const schema = require('./schema/index.js') 
 */

require('./db/setup.js')

const app = express()

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema })
)

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

const PORT = 5678
app.listen(PORT, () => {
  console.log('Servidor corriendo OK')
})
