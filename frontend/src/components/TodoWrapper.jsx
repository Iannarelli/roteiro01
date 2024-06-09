import React, { useState } from 'react';

import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([
        {id: 1, description: 'Tarefa exemplo', completed: false}
    ]);

    const addTodo = (description) => {
        setTodos([
            ...todos,
            { id: uuidv4(), description: description, completed: false },
        ]);
    }

    const tarefasPendentes = todos.filter(todo => !todo.completed);
    const tarefasConcluidas = todos.filter(todo => todo.completed);

    return (
        <div className='TodoWrapper'>
            <h2 className="text-black text-decoration-underline">Tarefas Pendentes</h2>
            <TodoForm addTodo={addTodo} />
            <div className="TodoContainer">
                {tarefasPendentes.map((item) => 
                    <TodoList
                        key = {item.id}
                        task = {item}
                    />
                )}
            </div>
            <h2 className="text-black text-decoration-underline mt-5">Tarefas Concluídas</h2>
            <div className="TodoContainer">
                {tarefasConcluidas.map((item) => 
                    <TodoList
                        key = {item.id}
                        task = {item}
                    />
                )}
            </div>
        </div>
    );
}
