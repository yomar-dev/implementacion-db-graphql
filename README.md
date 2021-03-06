### Instrucciones para correr este proyecto

1. Habiendo instalado ya NodeJS y Yarn, abre una terminal y navega hasta el directorio donde está este archivo.

2. Ejecuta el comando `yarn install` para instalar las dependencias

3. Ejecuta el comando `node index.js` para correr el Servidor

4. En el navegador, ve a la URL **localhost:5678/graphiql** para ver GraphiQL


### Instrucciones para crear la base de datos

1. Crea un archivo llamado `db.sqlite` dentro de la carpeta **db**.

2. Desde el directorio raiz del proyecto ejecuta el comando ***yarn run db:migrate*** para generar la estructura en esa base de datos.

3. Luego ejecuta el commando ***yarn run db:seed*** para generar datos en la base de datos.


### Generar una conexión a la BD ###

> **setup.js** inicia una conexión a la BD con `knexConfig` que es el archivo de la configuración donde se indica el motor de la BD.

~~~
const { model } = require('objection')
const knexConfig = require('./knexfile')
const Knex = require('knex')

const knex = Knex(knexConfig.development)
Model.knex(knex)
~~~

> Requerimos el **setup** en el `index.js` de la siguiente manera:

`require('./db/setup.js')`

> Ahora cada *request* de nuestro servidor **node** va a tener acceso a la BD.


### Obtener información de la BD ###

Importar el modelo **Curso**. <br>
`const Curso = require('./models/Curso')`

Importar el modelo **Profesor**. <br>
`const Curso = require('./models/Profesor')`

Query para obtener todos Cursos y Profesores.

~~~
{
  cursos{
    id
    titulo
  }
  profesores{
    nombre
  }
}
~~~

Query para obtener Cursos y Profesores por **ID**.

~~~
{
  curso(id: 1){
    id
    titulo
  }
  profesor(id: 1){
    id
    nombre
    nacionalidad
  }
}
~~~

Query para obtener cursos y sus profesores relacionados.

~~~
{
  cursos{
    titulo
    profesor{
      nombre
    }
  }
}
~~~

Query para obtener cursos, sus profesores y comentarios relacionados.

~~~
{
  cursos{
    titulo
    profesor{
      nombre
    }
    comentarios{
      cuerpo
    }
  }
}
~~~

Query para obtener los profesores y los cursos relacionados.

~~~
{
  profesores{
    id
    nombre
    cursos{
      titulo
    }
  }
}
~~~

Query para obtener cursos y profesores por **ID** con sus respectivas relaciones.

~~~
{
  profesores{
    id
    nombre
    cursos{
      titulo
    }
  }
}
~~~


### Modularización del Esquema ###

Consiste en separar las responsabilidades de la aplicación para un fácil mantenimiento y una mejor organización. En este caso vamos a separar los **resolvers** y las **entidades** en módulos.


### Mutation ###

Nos permite realizar acciones sobre la **BD** tales como *agregar*, *actualizar* y *eliminar*. Para crear una **Mutation** utilizamos la siguiente estructura.

> Todas las mutaciones devuelven el tipo que acaban de modificar.

Ejemplo:

~~~
type Mutation{
	profesorAdd(nombre: String!, genero: Genero, nacionalidad: String!): Profesor
}
~~~ 

En este caso estamos indicando cuales son los campos requeridos para agregar un nuevo `Profesor` y como podemos ver también estamos devolviendo un tipo `Profesor`.

**Agregar un nuevo Profesor a la BD:**

De esta manera podemos agregar un nuevo registro a la **BD** y luego podemos pedir que datos queremos obtener luego de realizar el registro, en este caso solo le estamos indicando que nos devuelva el **id**.

~~~
mutation AgregarProfesor {
  profesorAdd(profesor: {
    nombre: "Andrea"
    genero: FEMENINO
    nacionalidad: "Argentina"
  }) {
    id
  }
}
~~~

**Editar un Profesor:**

En el seguiente ejemplo vamos a editar un **profesor**, pero para saber que **profesor** queremos **editar**, tenemos que pasar el **id** de dicho **profesor** y al final le decimos que información queremos obtener luego de la edición, en este caso queremos que nos muestre el `id` y el `nombre`.

~~~
mutation EditarProfesor{
  profesorEdit(
    profesorId: 1,
    profesor: {
      nombre: "Sandra"
    }
  ){
    id
    nombre
  }
}
~~~


<br><br>

### Enlaces de interes ###

[Documentación de Objection](http://vincit.github.io/objection.js/#introduction) <br>