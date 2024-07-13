import React from 'react';
import axios from 'axios';

interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface ToDoItemProps {
    todo: ToDo;
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, setTodos }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/todos/${todo.id}/`)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(t => t.id !== todo.id));
            })
            .catch(error => {
                console.error('There was an error deleting the to-do item!', error);
            });
    };

    return (
        <li style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
            <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
        </li>
    );
};

export default ToDoItem;
