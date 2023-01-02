# Flixxo Backend Developer Challenge

Rest API that keeps track of crypto tokens and its historical prices

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docker-docs.netlify.app/compose/install/)

## Running

- clone the repo
- `docker-compose up --build` 🚀

Visit [localhost:3000](http://localhost:3000/).

## Q&A

- ¿Qué es SQL Injection y cómo puede evitarse?

SQL injection es un tipo de ataque en el que un atacante introduce código malicioso en una consulta SQL con el fin de alterar o acceder a datos no autorizados en una base de datos.

Algunas prácticas comunes para prevenir estos ataques son: validar y sanear el input del usuario, utilizar declaraciones preparadas (prepared statements) (por ej, usando ORMs), usar contraseñas seguras y encriptar la información sensibles, mantener el sistema actualizado, etc.

- ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.

Las SQL Transactions permiten ejecutar múltiples consultas SQL como si fueran una sola operación. Esto significa que todas las consultas se ejecutan juntas, o ninguna de ellas se ejecuta. Las transacciones son útiles para garantizar la integridad de los datos en una base de datos, especialmente cuando se realizan operaciones que involucran varias tablas o registros.

Un ejemplo típico de cuándo podría ser conveniente utilizar transacciones SQL es cuando se realiza una transferencia bancaria entre dos cuentas.

- Describí brevemente las ventajas del patrón controller/service/repository

El patrón Controller/Service/Repository es un patrón de diseño que permite separar la lógica de negocio (Service) de la lógica presentacional (Controller) y la lógica de acceso a la base de datos (Repository).

Este patrón permite una mayor separación de responsabilidades y una mayor claridad en la estructura de la aplicación. Esto hace que sea más fácil mantener y extender el código y también facilita el testeo y el desarrollo en equipo.

- ¿Cuál es la mejor forma de guardar un campo de tipo enum en la DB?

Una opción sería crear una columna de tipo enum en la DB. Pero esta opción tiene algunos problemas: no todos los motores de bases de datos los soportan, son difíciles de mantener/extender (hay que modificar la estructura de la base de datos para hacerlo), entre otros.

Una alternativa para solucionar estos problemas sería utilizar otra tabla referenciada por el campo del ENUM. En este caso, el campo del ENUM se almacena como una foreign key que apunta a la tabla con los valores correspondientes.

- Usando async/await: ¿cómo se puede aprovechar el paralelismo?

El uso de async/await permite escribir código asíncrono de manera más legible y sencilla (en lugar de usar callbacks o promesas de forma directa).

Para aprovechar el paralelismo con async/await, teniendo en cuenta que JS tiene un único hilo de ejecución, se necesita una librería que permita realizar operaciones asíncronas en paralelo (por medio del event loop de JS y delegando la tarea en un worker). Las versiones actuales de JS tienen soporte nativo para esta funcionalidad usando métodos como `Promise.all(iterable)` o `Promise.race(iterable)`.
