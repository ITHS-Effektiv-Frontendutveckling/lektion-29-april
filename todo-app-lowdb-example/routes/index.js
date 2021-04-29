const { Router } = require('express');
const { nanoid } = require('nanoid');
const router = new Router();

const { getTodos, addTodo, removeTodo } = require('../handlers/database-operations.js');

router.post('/', (request, response) => {
  const todoItem = request.body;
  todoItem.id = nanoid(); //Genererar ett unikt id
  console.log('Todo att lägga till:', todoItem);
  const todos = addTodo(todoItem);
  console.log(todos);

  let result = {}
  
  result.success = true;
  result.todos = todos;

  response.json(result);
});

router.get('/', (request, response) => {
  const todos = getTodos();
  
  let result = {}

  if (todos.length > 0) {
    result.success = true;
    result.todos = todos;
  } else {
    result.success = false;
    result.message = 'Inga todos att hämta'
  }

  response.json(result);
});

router.delete('/:id', (request, response) => {
  const todoId = request.params.id;
  const removedTodo = removeTodo(todoId);
  console.log('Tog bort:', removedTodo);

  let result = {};

  if (removedTodo.length > 0) {
    result.success = true;
  } else {
    result.success = false;
    result.message = 'Hittade ingen todo att ta bort med det id:et';
  }

  response.json(result);
});

module.exports = router;