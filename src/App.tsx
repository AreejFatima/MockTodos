import { useQuery } from 'react-query';
import { getTodos } from './utils';
import './App.css';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';


if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

function App() {
  const { data: todos, isLoading } = useQuery('todos', getTodos);

  if (isLoading) return <div>Loading....</div>;

 
  return (
    <div className='App'>
      <header>
        <h1>Todos</h1>
      </header>
      <AddTodo />
      {todos.map((todo: any) => (
        <Todo
          key={todo.id}
          text={todo.text}
          isDone={todo.isDone}
          id={todo.id}
        />
      ))}
    </div>
  );
}

export default App;
