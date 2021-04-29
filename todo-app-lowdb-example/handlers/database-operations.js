const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('todos.json');
const database = lowdb(adapter);

//Initirerar vår databas med en tom array
function initiateDatabase() {
  database.defaults({ todos: [] }).write();
}

//Hämtar alla todos
function getTodos() {
  return database.get('todos').value();
}

//lägger till en todo
function addTodo(todoItem) {
  return database.get('todos').push(todoItem).write();
}

//Tar bort en todo
function removeTodo(todoId) {
  return database.get('todos').remove({ id: todoId }).write();
}

exports.initiateDatabase = initiateDatabase;
exports.getTodos = getTodos;
exports.addTodo = addTodo;
exports.removeTodo = removeTodo;