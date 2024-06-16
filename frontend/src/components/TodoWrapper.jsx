import React, { useState } from 'react';

import { TodoForm } from './TodoForm';
import { TodoNewTask } from './TodoNewTask';
import { TodoList } from './TodoList';
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([
        {id: 1, descricao: 'Tarefa exemplo', completed: false}
    ]);

    const addTodo = (descricao, deadlineType, days, date, priority) => {
        setTodos([
            ...todos,
            {
                id: uuidv4(),
                descricao: descricao,
                deadlineType: deadlineType,
                days: days,
                date: date,
                priority: priority,
                completed: false
            },
        ]);
    }

    const handleToggleCompleted = (taskId) => {
        const updatedTasks = todos.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTodos(updatedTasks);
    };

    const tarefasPendentes = todos.filter(todo => !todo.completed);
    const tarefasConcluidas = todos.filter(todo => todo.completed);

    return (
        <div className='TodoWrapper'>
            {/* <TodoForm addTodo={addTodo} /> */}
            <TodoNewTask addTodo={addTodo} />
            <h2 className="text-black text-decoration-underline">Tarefas Pendentes</h2>
            <div className="TodoContainer">
                {tarefasPendentes.map((item) => 
                    <TodoList
                        key = {item.id}
                        task = {item}
                        onToggleCompleted={handleToggleCompleted}
                    />
                )}
            </div>
            <h2 className="text-black text-decoration-underline mt-5">Tarefas Concluídas</h2>
            <div className="TodoContainer">
                {tarefasConcluidas.map((item) => 
                    <TodoList
                        key = {item.id}
                        task = {item}
                        onToggleCompleted={handleToggleCompleted}
                    />
                )}
            </div>
        </div>
    );
}
