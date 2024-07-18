import { ChangeEvent, useEffect, useState } from "react";
import toDoListApi from "../api/toDoListApi";
import { useNavigate, useParams } from "react-router-dom";
import TextArea from "../components/ui/TextArea";
import StyledButton from "../components/ui/StyledButton";
import InputBox from "../components/ui/Inputbox";
import { useNotification } from "../context/NotificationContext";

const AddUpdateToDoCardPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showNotification } = useNotification();

    useEffect(() => {
        if (id !== "add") {
            const fetchToDo = async () => {
                const response = await toDoListApi.viewToDo(Number(id));
                if (response) {
                    setTitle(response.title);
                    setDescription(response.description);
                } else {
                    showNotification(`Failed to fetch ToDo with id ${id}`, "error");
                }
            };
            fetchToDo();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newToDo = {
            title,
            description,
            completed: false,
        };

        let response;
        if (id === "add") {
            response = await toDoListApi.createToDo(newToDo);
        } else {
            response = await toDoListApi.updateTodo(Number(id), newToDo);
        }

        if (response) {
            navigate("/home");
            showNotification(`ToDo ${id === "add" ? "added" : "updated"} successfully`, "success");
        } else {
            showNotification(`Failed to ${id === "add" ? "add" : "update"} ToDo`, "error");
        }
    }

    return (
        <div className="toDoAddBox">
            <form onSubmit={handleSubmit}>
                <InputBox
                    name="Todo card title"
                    type="todo_card"
                    inputType="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <TextArea
                    name="Todo description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <StyledButton type="primary" submit={true} onClick={handleSubmit} label={id === "add" ? "Add To-Do" : "Update To-Do"} />
            </form>
        </div>
    );
}

export default AddUpdateToDoCardPage;
