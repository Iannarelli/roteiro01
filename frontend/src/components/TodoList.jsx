import React from 'react'

export const TodoList = ({ task, onToggleCompleted }) => {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const handleCheckboxChange = () => {
        onToggleCompleted(task.id);
    };
    
    const showStatus = () => {
        if (task.date > date) {
            return `Prevista (${(task.date - date)/(1000*60*60*24)} dia${(task.date - date)/(1000*60*60*24) > 1 ? 's)' : ')'}`;
        } else {
            return `${(date - task.date)/(1000*60*60*24)} ${((date - task.date)/(1000*60*60*24) > 1) ? ' dias' : 'dia'} de atraso`;
        }
    }

    const showDeadline = () => {
        if (task.date > date) {
            return `Realizar até ${formatDate(task.date)}`;
        } else {
            return `Desde ${formatDate(task.date)}`;
        }
    }

    const getStatusClass = () => {
        if (task.date < date && !task.completed) {
            return 'atrasado';
        } else {
            return task.priority;
        }
    }

    return (
        <div className={`Todo ${getStatusClass()}`}>
            <input
                type="checkbox"
                checked={task.completed === true}
                onChange={handleCheckboxChange}
            />
            <div className={`${task.completed ? "completed" : "incompleted"} w-100`}>
                <div className='d-flex'>
                    <p>{task.descricao}</p>
                    {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
                </div>
                <p>{showStatus()}</p>
                <p>{showDeadline()}</p>
            </div>
        </div>
    )
}
