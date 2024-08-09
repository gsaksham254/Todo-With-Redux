import {createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: []
}



export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload )
        },
        editTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id)
            if(todo){
                todo.text = action.payload.text
            }
        },
        toggleTodo: (state,action) =>{
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if(todo){
                todo.completed = !todo.completed
            }
        },
        loadTodos: (state, action) => {
            state.todos = action.payload;
          }
    }
})

export const {addTodo, removeTodo,editTodo,toggleTodo,loadTodos} = todoSlice.actions

export default todoSlice.reducer