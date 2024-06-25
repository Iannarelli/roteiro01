// import React, { useState, useRef, useEffect } from 'react'
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// export const TodoList = ({ task, onToggleCompleted, onUpdateTask, onDeleteTask }) => {
//     const [isEditing, setIsEditing] = useState(false);
//     const [newDescription, setNewDescription] = useState(task.descricao);
//     const [newDeadlineType, setDeadlineType] = useState(task.deadlineType);
//     const [newDays, setNewDays] = useState(task.days);
//     const [newDate, setNewDate] = useState(task.date);
//     const [newPriority, setNewPriority] = useState(task.priority || 'baixa');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const cardRef = useRef(null);

//     const now = new Date();
//     const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//     const formatDate = (date) => {
//         const day = date.getDate().toString().padStart(2, '0');
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         const year = date.getFullYear();

//         return `${day}/${month}/${year}`;
//     };

//     const handleCheckboxChange = () => {
//         onToggleCompleted(task.id);
//     };

//     const handleDescriptionClick = () => {
//         setIsEditing(true);
//     };

//     const handleDescriptionChange = (e) => {
//         // console.log('newDescription antes da atualização: ', newDescription);
//         // console.log('e.target.value antes da atualização: ', e.target.value);
//         // console.log('task.descricao antes da atualização: ', task.descricao);
//         setNewDescription(e.target.value);
//         // console.log('task.descricao depois da atualização: ', task.descricao);
//         // console.log('newDescription depois da atualização: ', newDescription);
//     };

//     const handleDescriptionBlur = () => {
//         if (newDescription.trim() === '') {
//             setIsModalOpen(true);
//         } else {
//             setIsEditing(false);
//             console.log('no else');
//             console.log(
//                 'antes do onUpdateTask\ntask: ', task.id,
//                 '\nnewDescription: ', newDescription,
//                 '\nnewDeadlineType: ', newDeadlineType,
//                 '\nnewDays: ', newDays,
//                 '\nnewDate: ', newDate,
//                 '\nnewPriority: ', newPriority,);
//             onUpdateTask(
//                 task.id,
//                 newDescription,
//                 newDeadlineType,
//                 newDays,
//                 newDate,
//                 newPriority,
//             );
//         }
//     };

//     const handleDescriptionKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleDescriptionBlur();
//         }
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setNewDescription(task.descricao);
//         setDeadlineType(task.deadlineType);
//         setNewDays(task.days);
//         setNewDate(task.date);
//         setNewPriority(task.priority);
//         setIsEditing(false);
//     };

//     const confirmDeleteTask = () => {
//         onDeleteTask(task.id);
//         setIsModalOpen(false);
//     };

//     const showStatus = () => {
//         if (task.date > date) {
//             return `Prevista (${(task.date - date)/(1000*60*60*24)} dia${(task.date - date)/(1000*60*60*24) > 1 ? 's)' : ')'}`;
//         } else {
//             return `${(date - task.date)/(1000*60*60*24)} ${((date - task.date)/(1000*60*60*24) > 1) ? ' dias' : 'dia'} de atraso`;
//         }
//     }

//     const showDeadline = () => {
//         if (task.date > date) {
//             return `Realizar até ${formatDate(task.date)}`;
//         } else {
//             return `Desde ${formatDate(task.date)}`;
//         }
//     }

//     const getStatusClass = () => {
//         if (task.date < date && !task.completed) {
//             return 'atrasado';
//         } else {
//             return task.priority;
//         }
//     }

//     const handleDeadlineTypeChange = (e) => {
//         setDeadlineType(e.target.value);
//     };

//     const handleDaysChange = (e) => {
//         setNewDays(e.target.value);
//     };

//     const handleDateChange = (e) => {
//         setNewDate(e.target.value);
//     };

//     const handlePriorityChange = (e) => {
//         setNewPriority(e.target.value);
//     };

//     useEffect(() => {
//         console.log('iniciando o useEffect');
//         const handleClickOutside = (event) => {
//             if (cardRef.current && !cardRef.current.contains(event.target)) {
//                 console.log('no  do cardRef');
//                 handleDescriptionBlur();
//             }
//         };
    
//         if (isEditing) {
//             document.addEventListener('mousedown', handleClickOutside);
//         }
    
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isEditing]);

//     return (
//         <div ref={cardRef} className={`Todo ${getStatusClass()} ${isEditing ? 'editing' : ''}`}>
//             <input
//                 type="checkbox"
//                 checked={task.completed === true}
//                 onChange={handleCheckboxChange}
//             />
//             {isEditing ? (
//                 <div className={`${task.completed ? "completed" : "incompleted"} w-100`}>
//                     <div className='d-flex'>
//                         <input
//                             id="editInput"
//                             type="text"
//                             className='todo-input'
//                             value={newDescription}
//                             onChange={handleDescriptionChange}
//                             onKeyDown={handleDescriptionKeyDown}
//                             autoFocus
//                         />
//                         {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
//                     </div>
//                     <div className='d-flex justify-content-between mb-3'>
//                         <div>
//                             <input
//                                 id="prazo"
//                                 type="radio"
//                                 value="prazo"
//                                 checked={newDeadlineType === 'prazo'}
//                                 onChange={handleDeadlineTypeChange}
//                             />
//                             <label htmlFor="prazo">Prazo</label>
//                         </div>
//                         <div>
//                             <input
//                                 id="dias"
//                                 type="number"
//                                 value={newDays}
//                                 onChange={handleDaysChange}
//                                 className='days-input'
//                                 disabled={newDeadlineType !== 'prazo'}
//                             />
//                             <label htmlFor='dias'>&nbsp;dia(s)</label>
//                         </div>
//                     </div>
//                     <div className='d-flex justify-content-between mb-3'>
//                         <label>
//                             <input
//                                 type="radio"
//                                 value="data_limite"
//                                 checked={newDeadlineType === 'data_limite'}
//                                 onChange={handleDeadlineTypeChange}
//                             />
//                             Data limite
//                         </label>
//                         <label htmlFor="limite">
//                             <input
//                                 id="limite"
//                                 type="date"
//                                 value={newDate}
//                                 onChange={handleDateChange}
//                                 className='date-input'
//                                 disabled={newDeadlineType !== 'data_limite'}
//                             />
//                         </label>
//                     </div>
//                     <div className='d-flex justify-content-between'>
//                         <label>Prioridade</label>
//                         <select value={newPriority} onChange={handlePriorityChange}>
//                             <option value="baixa">Baixa</option>
//                             <option value="media">Média</option>
//                             <option value="alta">Alta</option>
//                         </select>
//                     </div>
//                 </div>
//             ) : (
//                 <div className={`${task.completed ? "completed" : "incompleted"} w-100`}>
//                     <div className='d-flex'>
//                         <p onClick={handleDescriptionClick}>{task.descricao}</p>
//                         {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
//                     </div>
//                     <p>{showStatus()}</p>
//                     <p>{showDeadline()}</p>
//                 </div>
//             )}

//             <Modal
//                 isOpen={isModalOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Confirmação de Exclusão"
//                 className="modal-dialog"
//                 overlayClassName="modal-backdrop"
//             >
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title">ATENÇÃO</h5>
//                         <button type="button" className="close" onClick={closeModal}>&times;</button>
//                     </div>
//                     <div className="modal-body">
//                         <p>Tarefa sem descrição será excluída.<br />
//                         Deseja continuar?</p>
//                     </div>
//                     <div className="modal-footer">
//                         <button onClick={confirmDeleteTask} className="btn btn-danger">Sim</button>
//                         <button onClick={closeModal} className="btn btn-secondary">Não</button>
//                     </div>
//                 </div>
//             </Modal>
//         </div>
//     )
// }

import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const TodoList = ({ task, onToggleCompleted, onUpdateTask, onDeleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(task.descricao);
    const [newDeadlineType, setDeadlineType] = useState(task.deadlineType);
    const [newDays, setNewDays] = useState(task.days);
    const [newDate, setNewDate] = useState(task.date);
    const [newPriority, setNewPriority] = useState(task.priority || 'baixa');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardRef = useRef(null);
    const descriptionRef = useRef(newDescription);
    const deadlineTypeRef = useRef(newDeadlineType);
    const daysRef = useRef(newDays);
    const dateRef = useRef(newDate);
    const priorityRef = useRef(newPriority);

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
        descriptionRef.current = e.target.value;
    };

    const handleDescriptionBlur = () => {
        if (descriptionRef.current.trim() === '') {
            setIsModalOpen(true);
        } else {
            setIsEditing(false);
            onUpdateTask(
                task.id,
                descriptionRef.current,
                deadlineTypeRef.current,
                daysRef.current,
                dateRef.current,
                priorityRef.current
            );
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
        setDeadlineType(task.deadlineType);
        setNewDays(task.days);
        setNewDate(task.date);
        setNewPriority(task.priority);
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
    };

    const showDeadline = () => {
        var tempDate = null;
        if (typeof(task.date) === 'string') {
            tempDate = new Date(task.date.split('-')[0], parseInt(task.date.split('-')[1]) - 1, task.date.split('-')[2]);
        } else {
            tempDate = task.date;
        }
        if (tempDate > date) {
            return `Realizar até ${formatDate(tempDate)}`;
        } else {
            return `Desde ${formatDate(tempDate)}`;
        }
    };

    const getStatusClass = () => {
        if (task.date < date && !task.completed) {
            return 'atrasado';
        } else {
            return task.priority;
        }
    };

    const handleDeadlineTypeChange = (e) => {
        setDeadlineType(e.target.value);
        deadlineTypeRef.current = e.target.value;
    };

    const handleDaysChange = (e) => {
        setNewDays(e.target.value);
        daysRef.current = e.target.value;
    };

    const handleDateChange = (e) => {
        setNewDate(e.target.value);
        dateRef.current = e.target.value;
    };

    const handlePriorityChange = (e) => {
        setNewPriority(e.target.value);
        priorityRef.current = e.target.value;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                handleDescriptionBlur();
            }
        };
    
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div ref={cardRef} className={`Todo ${getStatusClass()} ${isEditing ? 'editing' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed === true}
                onChange={handleCheckboxChange}
            />
            {isEditing ? (
                <div className={`${task.completed ? "completed" : "incompleted"} w-100`}>
                    <div className='d-flex'>
                        <input
                            id="editInput"
                            type="text"
                            className='todo-input'
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            onKeyDown={handleDescriptionKeyDown}
                            autoFocus
                        />
                        {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
                    </div>
                    <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <input
                                id="prazo"
                                type="radio"
                                value="prazo"
                                checked={newDeadlineType === 'prazo'}
                                onChange={handleDeadlineTypeChange}
                            />
                            <label htmlFor="prazo">Prazo</label>
                        </div>
                        <div>
                            <input
                                id="dias"
                                type="number"
                                value={newDays}
                                onChange={handleDaysChange}
                                className='days-input'
                                disabled={newDeadlineType !== 'prazo'}
                            />
                            <label htmlFor='dias'>&nbsp;dia(s)</label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mb-3'>
                        <label>
                            <input
                                type="radio"
                                value="data_limite"
                                checked={newDeadlineType === 'data_limite'}
                                onChange={handleDeadlineTypeChange}
                            />
                            Data limite
                        </label>
                        <label htmlFor="limite">
                            <input
                                id="limite"
                                type="date"
                                value={newDate}
                                onChange={handleDateChange}
                                className='date-input'
                                disabled={newDeadlineType !== 'data_limite'}
                            />
                        </label>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <label>Prioridade</label>
                        <select value={newPriority} onChange={handlePriorityChange}>
                            <option value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className={`${task.completed ? "completed" : "incompleted"} w-100`}>
                    <div className='d-flex'>
                        <p onClick={handleDescriptionClick}>{task.descricao}</p>
                        {(getStatusClass() === 'atrasado' && !task.completed) ? (<span className='exclamacao'>⚠</span>) : ('')}
                    </div>
                    <p>{showStatus()}</p>
                    <p>{showDeadline()}</p>
                </div>
            )}

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
    );
}
