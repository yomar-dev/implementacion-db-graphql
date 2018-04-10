const Curso = require('./models/Curso') //Importar el modelo Curso.
const Profesor = require('./models/Profesor') //Importar el modelo Profesor.

const resolvers = {
  Query: {    
    //cursos: () => Curso.query(), // Traer todos los recursos del modelo Curso.
    /**
     * Me permite traer los profesores relacionados con el Curso.
     */
    //cursos: () => Curso.query().eager('profesor'),
    /**
     * Me permite traer los profesores y comentarios relacionados con el Curso.
     */
    cursos: () => Curso.query().eager('[profesor, comentarios]'),
    //profesores: () => Profesor.query(), // Traer todos los recursos del modelo Profesor.
    profesores: () => Profesor.query().eager('cursos'), // Traer todos los profesores y sus cursos relacionados.
    // args: Va a tener un objeto cuya key a ser el nombre del parametro que recibe en el schema.
    //curso: (rootValue, args) => Curso.query().findById(args.id), // Obtener cursos por ID.
    /**
     * Obtener cursos por ID y traer los profesores y comentarios relacionados.
     */
    curso: (rootValue, args) => Curso.query().eager('[profesor, comentarios]').findById(args.id),
    // args: Va a tener un objeto cuya key a ser el nombre del parametro que recibe en el schema.
    //profesor: (rootValue, args) => Profesor.query().findById(args.id), // Obtener profesores por ID.
    /**
     * Obtener profesores por ID y traer cursos relacionados.
     */
    profesor: (rootValue, args) => Profesor.query().eager('cursos').findById(args.id) // Obtener profesores por ID.
  },
}

module.exports = resolvers