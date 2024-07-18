import { useEffect, useState } from "react";
import toDoListApi from "../api/toDoListApi";
import Loading from "../components/Loading";
import ToDoItem from "../components/ToDoItem";
import CardEffect from "../components/card";

interface ToDo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    created_at: Date;
}

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [todos, setTodos] = useState<ToDo[]>([]);

    const fetchToDoLists = async () => {
        try {
            const response = await toDoListApi.getAllToDoLists(null);
            setTodos(response || []);
            setLoading(false);
        }
        catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchToDoLists();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="container">
            <div className="cardGrid">
                {todos && todos.map((todo, index) => (
                    <div key={index}>
                    <CardEffect>
                        <ToDoItem key={todo.id} todo={todo} setTodos={setTodos} />
                    </CardEffect>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage;