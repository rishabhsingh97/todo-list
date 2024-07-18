import React, { useState } from 'react';
import toDoListApi from '../api/toDoListApi';
import StyledButton from './ui/StyledButton';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
}

interface ToDoItemProps {
    todo: ToDo;
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const truncateDescription = (description: string, wordLimit: number) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
};

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, setTodos }) => {
    const [completed, setCompleted] = useState<boolean>(todo.completed);
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await toDoListApi.deleteToDo(todo.id);
        if (response) {
            setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
            showNotification(`Deleted ToDo ${todo.id} successfully`, "success");
        } else {
            showNotification(`Failed to delete ToDo ${todo.id}`, "error");
        }
    };

    const viewTodo = async () => {
        const response = await toDoListApi.viewToDo(todo.id);
        if (response) {
            navigate(`/todo/${todo.id}`);
        } else {
            showNotification(`Failed to fetch ToDo ${todo.id}`, "error");
        }
    };

    const handleCheckboxChange = async () => {
        const response = await toDoListApi.updateTodo(todo.id, { completed: !completed });
        if (response) {
            setCompleted(response.completed);
            setTodos(prevTodos =>
                prevTodos.map(t =>
                    t.id === todo.id ? { ...t, completed: response.completed } : t
                )
            );
            showNotification(`Marked ToDo ${todo.id} as ${response.completed ? 'completed' : 'incomplete'}`, "success");
        } else {
            showNotification(`Failed to update ToDo ${todo.id}`, "error");
        }
    };

    return (
        <div className='todoCard'>
            <div>
                <h2>{todo.title}</h2>
                {completed ? <FaCheck color="green" /> : <FaTimes color="red" />}
            </div>
            <p>{truncateDescription(todo.description, 4)}</p>
            <div className='createdAt'>
                {format(new Date(todo.created_at), 'dd/MM/yyyy HH:mm')}
            </div>
            <StyledButton onClick={viewTodo} label="View" type="secondary" />
            <StyledButton onClick={handleDelete} label="Delete" type="warning" />
            <div className='completionIcon'>
                <input id={`comp-check-${todo.id}`} type="checkbox" className="completion-checkbox" checked={completed} onChange={handleCheckboxChange} />
                {completed ?
                    <label className="comp-label" htmlFor={`comp-check-${todo.id}`}>mark as incomplete!</label>
                    :
                    <label className="comp-label" htmlFor={`comp-check-${todo.id}`}>mark as complete!</label>
                }
            </div>
        </div>
    );
};

export default ToDoItem;
