const Curso = require('./models/Curso') //Importar el modelo Curso.
const Profesor = require('./models/Profesor') //Importar el modelo Profesor.

const resolvers = {
  Query: {
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    profesores: () => Profesor.query().eager('cursos'),
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id)
  },
}

module.exports = resolvers