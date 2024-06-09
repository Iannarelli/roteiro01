import React, { useState, useEffect } from 'react'

import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { v4 as uuidv4 } from "uuid";

export const TodoWrapperService = () => {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (description) => {
        const newTodo = { id: uuidv4(), description: description, completed: false };
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
    }

    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas! (Service)</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
                <TodoList task={todo} key={todo.id} />
            ))}
        </div>
    )
}
