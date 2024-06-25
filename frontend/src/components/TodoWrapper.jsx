import React, { useState } from 'react';

import { TodoForm } from './TodoForm';
import { TodoNewTask } from './TodoNewTask';
import { TodoList } from './TodoList';
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (descricao, deadlineType, days, date, priority) => {
        if (deadlineType === 'prazo' && days !== '' && date === '') {
            const now = new Date();
            date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + parseInt(days));
        }
        if (deadlineType === 'data_limite' && date !== '') {
            date = new Date(date.split('-')[0], parseInt(date.split('-')[1]) - 1, date.split('-')[2]);
        }
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

    const updateTask = (taskId, newDescription, deadlineType, days, date, priority) => {
        console.log('taskid: ' , taskId, '\nnewDescription: ', newDescription, '\ndeadlineType: ', deadlineType,
            '\ndays: ', days, '\ndate: ', date, '\npriority: ', priority);
        if (deadlineType === 'prazo' && days !== '' && date === '') {
            const now = new Date();
            date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + parseInt(days));
        }
        if (deadlineType === 'data_limite' && date !== '') {
            date = new Date(date.split('-')[0], parseInt(date.split('-')[1]) - 1, date.split('-')[2]);
        }
        console.log('taskid: ' , taskId, '\nnewDescription: ', newDescription, '\ndeadlineType: ', deadlineType,
            '\ndays: ', days, '\ndate: ', date, '\npriority: ', priority);
        const updatedTasks = todos.map(task =>
            task.id === taskId ? {
                ...task,
                descricao: newDescription,
                deadlineType: deadlineType,
                days: days,
                date: date,
                priority: priority
            } : task
        );
        console.log(updatedTasks);
        setTodos(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = todos.filter(task => task.id !== taskId);
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
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
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
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                    />
                )}
            </div>
        </div>
    );
}
