import React, { useState, useRef, useEffect } from 'react';

export const TodoNewTask = ({addTodo}) => {
    const [isInputClicked, setIsInputClicked] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [deadlineType, setDeadlineType] = useState('');
    const [days, setDays] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('baixa');
    const newTaskRef = useRef(null);
    const taskInputRef = useRef(null)

    const handleInputClick = () => {
        setIsInputClicked(true);
    };

    const handleDescricaoChange = (e) => {
        setDescricao(e.target.value);
    };

    const handleDeadlineTypeChange = (e) => {
        setDeadlineType(e.target.value);
    };

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (newTaskRef.current && !newTaskRef.current.contains(event.target)) {
                if (descricao.trim() === '' && deadlineType === '') {
                    console.log('alterando para false');
                    setIsInputClicked(false);
                } else if (descricao.trim() !== '' && deadlineType !== '' && ((deadlineType === 'prazo' && days !== '') || (deadlineType === 'data_limite' && date !== ''))) {
                    console.log('Criar tarefa:', {
                        descricao,
                        deadlineType,
                        days,
                        date,
                        priority,
                    });
                    addTodo(descricao, deadlineType, days, date, priority);

                    setDescricao('');
                    setDeadlineType('');
                    setDays('');
                    setDate('');
                    setPriority('baixa');
                    setIsInputClicked(false);
                }
            }
        };

        if (isInputClicked) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isInputClicked, descricao, deadlineType, days, date, priority, addTodo]);

    useEffect(() => {
        if (isInputClicked && taskInputRef.current) {
            taskInputRef.current.focus();
        }
    }, [isInputClicked]);

    return (
        <div ref={newTaskRef} id="newTask" className={isInputClicked ? 'card mb-4' : ''}>
            {!isInputClicked ? (
                <input
                    type="text"
                    placeholder="Adicionar tarefa"
                    className='todo-input w-100'
                    onClick={handleInputClick}
                />
            ) : (
                <div className="TodoWrapper">
                    <input
                        ref={taskInputRef}
                        type="text"
                        placeholder="Adicionar tarefa"
                        onChange={handleDescricaoChange}
                        value={descricao}
                        className='todo-input w-100'
                    />
                    <div className='d-flex justify-content-between mb-3'>
                        <div>
                            <input
                                id="prazo"
                                type="radio"
                                value="prazo"
                                checked={deadlineType === 'prazo'}
                                onChange={handleDeadlineTypeChange}
                            />
                            <label htmlFor="prazo">Prazo</label>
                        </div>
                        <div>
                            <input
                                id="dias"
                                type="number"
                                value={days}
                                onChange={handleDaysChange}
                                className='days-input'
                                disabled={deadlineType !== 'prazo'}
                            />
                            <label htmlFor='dias'>&nbsp;dia(s)</label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-between mb-3'>
                        <label>
                            <input
                                type="radio"
                                value="data_limite"
                                checked={deadlineType === 'data_limite'}
                                onChange={handleDeadlineTypeChange}
                                />
                             Data limite
                        </label>
                        <label htmlFor="limite">
                            <input
                                id="limite"
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                className='date-input'
                                disabled={deadlineType !== 'data_limite'}
                            />
                        </label>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <label>Prioridade</label>
                        <select value={priority} onChange={handlePriorityChange}>
                            <option value="baixa">Baixa</option>
                            <option value="media">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};
