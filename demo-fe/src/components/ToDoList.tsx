import React, { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import ToDoForm from './ToDoForm';
import toDoListApi from '../api/toDoListApi';
import Loading from './Loading';

interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const ToDoList: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<ToDo[]>([]);

    useEffect(() => {
        const fetchToDoLists = async () => {
            try {
                const response = await toDoListApi.getAllToDoLists(null);
                setTodos(response);
                setLoading(false);
            } 
            catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchToDoLists();
    }, []);

    if(loading){
        return (
            <Loading />
        )
    }
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }} >
            <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
            <ToDoForm setTodos={setTodos} />
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
                ))}
            </ul>
        </div >
    );
};

export default ToDoList;
