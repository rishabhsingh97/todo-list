// src/components/ToDoForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface ToDoFormProps {
    setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoForm: React.FC<ToDoFormProps> = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newToDo = {
            title,
            description,
            completed: false,
        };

        axios.post('http://localhost:8000/api/todos/', newToDo)
            .then(response => {
                setTodos(prevTodos => [...prevTodos, response.data]);
                setTitle('');
                setDescription('');
            })
            .catch(error => {
                console.error('There was an error creating the to-do item!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd' }}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ddd' }}
            />
            <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none' }}>Add To-Do</button>
        </form>
    );
};

export default ToDoForm;
