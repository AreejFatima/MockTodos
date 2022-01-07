import { rest } from 'msw';
import { todoType } from '../App';
import { getFromDB, saveToDB, updateDB } from './frontendDB';

// export let todoList = [
//   {
//     id: '1',
//     text: 'I am todo 1',
//     isDone: false,
//   },
//   {
//     id: '2',
//     text: 'I am todo 2',
//     isDone: false,
//   },
//   {
//     id: '3',
//     text: 'I am todo 3',
//     isDone: false,
//   },
// ];

let todoList = getFromDB();

export const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoList));
  }),

  rest.delete(`/todos/:id`, (req, res, ctx) => {
    const { id } = req.params;
    todoList = todoList.filter((todo: todoType) => todo.id !== id);
    updateDB(todoList);
    return res(ctx.delay(200), ctx.status(204));
  }),

  rest.patch(`/todos/:id`, (req, res, ctx) => {
    const { id } = req.params;
    todoList = todoList.map((todo: todoType) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    updateDB(todoList);
    return res(ctx.delay(200), ctx.status(200), ctx.json(req.body));
  }),

  rest.post('/todos', (req, res, ctx) => {
    const id = todoList.length + 1 || 1;
    const newItem = {
      id: id.toString(),
      text: JSON.stringify(req.body),
      isDone: false,
    };
    todoList = [...todoList, newItem];
    saveToDB(todoList);
    return res(ctx.delay(500), ctx.status(201), ctx.json(newItem));
  }),
];
