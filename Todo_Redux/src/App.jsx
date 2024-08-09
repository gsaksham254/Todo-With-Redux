import React, { useEffect } from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import { useDispatch, useSelector } from 'react-redux'
import { loadTodos } from './Features/todo/todoSlice'

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch(loadTodos(JSON.parse(storedTodos)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1 className='text-center bg-white text-3xl font-bold mx-3 my-3 px-4 py-4'>Learn about redux toolkit</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
