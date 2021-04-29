/**
 * TODO API
 * 
 * Endpoints:
 * 
 * Hämta alla todos
 * URL: /api/todo
 * Method: GET
 * 
 * Lägg till en ny todo
 * URL: /api/todo
 * Method: POST
 * 
 * Ta bort en todo
 * URL: /api/todo/:id
 * Method: DELETE
 */

/**
 * Databas
 *
 * Vad är databasen till för?
 * Lägga till, hämta och ta bort todos
 * 
 * Vad vill vi spara för data?
 * Vi vill spara själva todo-texten och ett unik id till varje todo
 * 
 * Vad är det för typ av data vi vill spara?
 * En array med objekt. Varje objekt är en todo-item
 * 
 * Ex:
 * {
 *    todos: [
 *        {
 *           task: String
 *           id: String
 *        }
 *    ]
 * }
 */


const express = require('express');

const todoRouter = require('./routes/index');
const { initiateDatabase } = require('./handlers/database-operations');

const app = express();

app.use(express.json());
//Sätt en basurl till alla routes så alla startar med /api/todo
app.use('/api/todo', todoRouter);

app.listen(8000, () => {
  console.log('Server started');
  initiateDatabase();
});