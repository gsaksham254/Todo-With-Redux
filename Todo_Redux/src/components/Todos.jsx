import { useSelector, useDispatch } from 'react-redux';
import { editTodo, toggleTodo } from '../Features/todo/todoSlice';
import {removeTodo} from '../Features/todo/todoSlice'
import {useState } from 'react'

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [newText, setNewText] = useState('');

  const handleEdit = (id) => {
    setEditing(id);
    setNewText(todos.find((todo) => todo.id === id).text);
  };

  const handleSave = (id) => {
    dispatch(editTodo({ id, text: newText }));
    setEditing(null);
    setNewText('');
  };

  const handleCancel = () => {
    setEditing(null);
    setNewText('');
  };
  return (
    <>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`mt-4 flex justify-between items-center ${
              todo.completed ? 'bg-slate-400  line-through' : 'bg-zinc-800'
            } px-4 py-2 rounded`}
            
          >
            {editing === todo.id ? (
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="bg-zinc-800 px-2 text-white cursor-pointer font-bold text-xl rounded-lg border-2 border-indigo-500/100 "
              />
            ) : (
              <div className="text-white text-xl capitalize italic font-bold">{todo.text}</div>
            )}
            <div className="flex space-x-4">
              {editing === todo.id ? (
                <>
                  <button
                    onClick={() => handleSave(todo.id)}
                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (

                <button
                  onClick={() => handleEdit(todo.id)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" strokeWidth={1.5} stroke="currentColor" className='w-6 h-6'>
                  <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
  
                </button>
              )}
              {editing !== todo.id && (
              <button
              onClick={() => dispatch(toggleTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              disabled={editing === todo.id} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                 <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;