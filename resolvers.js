const Curso = require('./models/Curso') //Importar el modelo Curso.
const Profesor = require('./models/Profesor') //Importar el modelo Profesor.

const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  },
  Mutation: {
    /**
     * Devuelve el nuevo Profesor creado
     * Como no vamos a utilizar el Root Value lo vamos a remplazar
     * por "_" y esto se suele hacer por convención.
     */
    profesorAdd: (_, args) => {
      /**
       * Insertamos el nuevo profesor en la BD y luego lo retornamos. 
       */
      return Profesor.query().insert(args.profesor)
    }
  }
}

module.exports = resolvers