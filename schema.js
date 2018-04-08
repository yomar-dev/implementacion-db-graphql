const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')
const Curso = require('./models/Curso') //Importar el modelo Curso.
const Profesor = require('./models/Profesor') //Importar el modelo Profesor.

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripción del curso
    descripcion: String!
    profesor: Profesor
    rating: Float
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
    cursos: [Curso]
  }

  enum Genero {
    MASCULINO
    FEMENINO
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  type Query {
    cursos: [Curso]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`

const resolvers = {
  Query: {    
    cursos: () => Curso.query(), // Traer todos los recursos del modelo Curso.
    profesores: () => Profesor.query(), // Traer todos los recursos del modelo Profesor.
    // args: Va a tener un objeto cuya key a ser el nombre del parametro que recibe en el schema.
    curso: (rootValue, args) => Curso.query().findById(args.id), // Obtener cursos por ID.
    // args: Va a tener un objeto cuya key a ser el nombre del parametro que recibe en el schema.
    profesor: (rootValue, args) => Profesor.query().findById(args.id) // Obtener profesores por ID.
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

addMockFunctionsToSchema({
  schema,
  mocks: {
    Curso: () => {
      return {
        id: casual.uuid,
        titulo: casual.sentence,
        descripcion: casual.sentences(2)
      }
    },
    Profesor: () => {
      return {
        nombre: casual.name,
        nacionalidad: casual.country
      }
    }
  },
  preserveResolvers: true
})

module.exports = schema
