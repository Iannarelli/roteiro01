import React from 'react'

export const TodoList = ({ task, onToggleCompleted }) => {
    const handleCheckboxChange = () => {
        onToggleCompleted(task.id);
    };

    return (
        <div className="Todo">
            <input
                type="checkbox"
                checked={task.completed === true}
                onChange={handleCheckboxChange}
            />
            <div>
                <p className={`${task.completed ? "completed" : "incompleted"}`}
                >{task.descricao}</p>
            </div>
        </div>
    )
}
