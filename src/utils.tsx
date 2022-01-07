import { getFromDB } from './mocks/frontendDB';

export async function getTodos() {
  // return fetch('/todos')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     return data;
  //   });
  let todos = getFromDB();
  
  if (todos) return todos;
  
}

export async function addTodo(text: any) {
  const response = await fetch(`/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: text,
  });
  return response.json();
}

export async function updateTodo({ isDone, id }: any) {
  const response = await fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      is_done: isDone,
    }),
  });
  return response.json();
}

export async function deleteTodo(id: any) {
  const response = await fetch(`/todos/${id}`, {
    method: 'Delete',
  });
  return response.json();
}
