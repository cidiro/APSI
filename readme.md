# Tierra Media API

This is a REST API that allows you to interact with data from the fictional world of Tierra Media, created by J.R.R. Tolkien. You can perform CRUD (create, read, update, delete) operations on the characters and races of this world.

## Prerequisites

To use this API, you need to have the following installed:

- Node.js
- MongoDB
- Mongoose
- Express

You also need to set the environment variable `MONGO_URL` to the connection string of your MongoDB database.

## Installation

To install the dependencies, run the following command in the root directory of the project:

```bash
npm install
```

## Usage

To start the server, run the following command:

```bash
node main.ts
```

The server will listen on port 3000 by default. You can change this by setting the environment variable `PORT`.

The API has the following endpoints:

- `GET /api/tierramedia/personajes`: Returns a list of all the characters in the database.
- `GET /api/tierramedia/personajes/:id`: Returns a single character by its ID.
- `POST /api/tierramedia/personajes`: Creates a new character in the database. The request body should have the following fields: `name`, `race`, `description` and `abilities`.
- `POST /api/tierramedia/razas`: Creates a new race in the database. The request body should have the following fields: `name` and `description`.
- `PUT /api/tierramedia/personajes/:id`: Updates an existing character by its ID. The request body must have the complete information of the character.
- `DELETE /api/tierramedia/personajes/:id`: Deletes an existing character by its ID.

The response format is JSON. For example, a successful GET request to `/api/tierramedia/personajes/60a7c1f2b9f8c32f4c8d8a7b` would return:

```json
{
  "status": "success",
  "data": {
    "character": {
      "_id": "60a7c1f2b9f8c32f4c8d8a7b",
      "name": "Frodo Bolson",
      "race": "Hobbit",
      "description": "The Ring-bearer and one of the main protagonists of The Lord of the Rings.",
	  "abilities": [],
      "__v": 0
    }
  }
}
```

For more details and examples, please refer to the documentation.

## License

This project is licensed under the MIT License - see the [LICENSE] file for details.

: https://en.wikipedia.org/wiki/Middle-earth
: https://github.com/cidiro/APSI/releases/tag/god