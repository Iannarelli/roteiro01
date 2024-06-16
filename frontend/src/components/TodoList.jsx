import React, { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const TodoList = ({ task, onToggleCompleted, onUpdateTaskDescription, onDeleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(task.descricao);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleDescriptionClick = () => {
        setIsEditing(true);
    };

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleDescriptionBlur = () => {
        if (newDescription.trim() === '') {
            setIsModalOpen(true);
        } else {
            setIsEditing(false);
            if (newDescription !== task.descricao) {
                onUpdateTaskDescription(task.id, newDescription);
            }
        }
    };

    const handleDescriptionKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleDescriptionBlur();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewDescription(task.descricao);
        setIsEditing(false);
    };

    const confirmDeleteTask = () => {
        onDeleteTask(task.id);
        setIsModalOpen(false);
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
                    {isEditing ? (
                        <input
                            id="editInput"
                            type="text"
                            className='todo-input'
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                            onKeyDown={handleDescriptionKeyDown}
                            autoFocus
                        />
                    ) : (
                        <p onClick={handleDescriptionClick}>{task.descricao}</p>
                    )}
                    {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
                </div>
                <p>{showStatus()}</p>
                <p>{showDeadline()}</p>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmação de Exclusão"
                className="modal-dialog"
                overlayClassName="modal-backdrop"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">ATENÇÃO</h5>
                        <button type="button" className="close" onClick={closeModal}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <p>Tarefa sem descrição será excluída.<br />
                        Deseja continuar?</p>
                    </div>
                    <div className="modal-footer">
                        <button onClick={confirmDeleteTask} className="btn btn-danger">Sim</button>
                        <button onClick={closeModal} className="btn btn-secondary">Não</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
