# Flixxo Backend Developer Challenge

Rest API that keeps track of crypto tokens and its historical prices

## Table of content

- [Requirements](#requirements)
- [Running](#running)
- [Q&A](#q-a)
- [API Reference](#api-reference)
  - [Create a new user account](#create-a-new-user-account)
  - [Login](#login)
  - [Get token by symbol](#get-token-by-symbol)
  - [Add token](#add-token)
  - [Update token info](#update-token-info)
  - [Get all tokens](#get-all-tokens)
  - [Get token price](#get-token-price)
  - [Add token price](#add-token-price)
  - [Get all historical prices for token](#get-all-historical-prices-for-token)

## Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docker-docs.netlify.app/compose/install/)

## Running

- clone the repo
- `docker-compose up --build` 🚀

Visit [localhost:3000](http://localhost:3000/).

## Q&A

- ¿Qué es SQL Injection y cómo puede evitarse?

SQL injection es un tipo de ataque informático en el que un atacante introduce código malicioso en una consulta SQL con el fin de alterar o acceder a datos no autorizados en una base de datos.

Algunas prácticas comunes para prevenir estos ataques son: validar y sanear el input de usuario, utilizar declaraciones preparadas (prepared statements) y parámetro (por ej, usando ORMs), usar contraseñas seguras y encriptar la información sensibles, mantener el sistema actualizado, etc.

- ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo.

Las SQL Transactions permiten ejecutar múltiples consultas SQL como si fueran una sola operación. Esto significa que todas las consultas se ejecutan juntas, o ninguna de ellas se ejecuta. Las transacciones son útiles para garantizar la integridad de los datos en una base de datos, especialmente cuando se realizan operaciones que involucran varias tablas o registros.

Un ejemplo típico de cuándo podría ser conveniente utilizar transacciones SQL es cuando se realiza una transferencia bancaria entre dos cuentas.

- Describí brevemente las ventajas del patrón controller/service/repository

El patrón Controller/Service/Repository es un patrón de diseño que permite separar la lógica de negocio (Service) de la lógica presentacional (Controller) y la lógica de acceso a la base de datos (Repository).

Este patrón permite una mayor separación de responsabilidades y una mayor claridad en la estructura de la aplicación. Esto hace que sea más fácil mantener y extender el código y también facilita el testeo y el desarrollo en equipo.

- ¿Cuál es la mejor forma de guardar un campo de tipo enum en la DB?

Una opción sería crear una columna de tipo enum en la DB. Pero esta opción tiene algunos problemas: no todos los motores de bases de datos los soportan y son difíciles de mantener/extender (hay que modificar la estructura de la base de datos para hacerlo).

Una mejor opción para solucionar estos problemas sería utilizar otra tabla referenciada por el campo del ENUM. En este caso, el campo del ENUM se almacena como una foreign key que apunta a la tabla con los valores correspondientes.

- Usando async/await: ¿cómo se puede aprovechar el paralelismo?

El uso de async/await permite escribir código asíncrono de manera más legible y sencilla (en lugar de usar callbacks o promesas de forma directa).

Para aprovechar el paralelismo con async/await, teniendo en cuenta que JS tiene un único hilo de ejecución, se necesita una librería que permita realizar operaciones asíncronas en paralelo (por medio del event loop de JS y delegando la tarea en un worker). Las versiones actuales de JS tienen soporte nativo para esta funcionalidad usando métodos como `Promise.all(iterable)` o `Promise.race(iterable)`.

## API Reference

#### Create a new user account

```http
  Post /api/register
```

Request Body

Content-Type: application/json

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```http
  Post /api/login
```

Request Body

Content-Type: application/json

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

If the login was successful, it will return a token that can be used for authenticated requests:

```
{
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

#### Get token by symbol

```http
  GET /api/token
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `symbol`  | `string` | **Required**. Token's symbol (BTC, ETH, etc) |

#### Add token

```http
  POST /api/token
```

Authorization
This endpoint requires a JSON Web Token (JWT) for authorization. To include the JWT in the request, add an Authorization header with the value Bearer YOUR_JWT_TOKEN_HERE.

Request Body

Content-Type: application/json

```
{
  "symbol": "BTC",
  "name": "bitcoin",
  "additionalInfo": "relevant information"
}
```

#### Update token info

```http
  POST /api/token
```

Authorization
This endpoint requires a JSON Web Token (JWT) for authorization. To include the JWT in the request, add an Authorization header with the value Bearer YOUR_JWT_TOKEN_HERE.

Request Body

Content-Type: application/json

```
{
  "symbol": "BTC",
  "name"?: "bitcoin",
  "additionalInfo"?: "relevant information"
}
```

#### Get all tokens

```http
  GET /api/tokens
```

returns a list of supported tokens (`symbol`, `name` and `additionalInfo`)

#### Get token price

```http
  GET /api/price
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `symbol`  | `string` | **Required**. Token's symbol (BTC, ETH, etc) |

returns the latest price for the token

#### Add token price

```http
  POST /api/token
```

Authorization
This endpoint requires a JSON Web Token (JWT) for authorization. To include the JWT in the request, add an Authorization header with the value Bearer YOUR_JWT_TOKEN_HERE.

Request Body

Content-Type: application/json

```
{
  "tokenSymbol": "BTC",
  "value": "bitcoin",
}
```

#### Get all historical prices for token

```http
  GET /api/prices
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `symbol`  | `string` | **Required**. Token's symbol (BTC, ETH, etc) |

returns all the historical prices for the token
