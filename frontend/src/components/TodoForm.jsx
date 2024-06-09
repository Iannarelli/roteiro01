import React, { useState } from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const addNewTodo = () => {
        if (value.trim()) {
            addTodo(value.trim());
            setValue('');
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewTodo()
    }

    const handleBlur = () => {
        addNewTodo();
    }

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                className="todo-input w-100"
                placeholder='Adicionar tarefa'
            />
        </form>
    )
}
