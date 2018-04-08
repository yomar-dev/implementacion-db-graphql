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