import { ChangeEvent, useState } from "react";
import toDoListApi from "../api/toDoListApi";
import { useNavigate } from "react-router-dom";
import TextArea from "../components/ui/TextArea";
import StyledButton from "../components/ui/StyledButton";
import InputBox from "../components/ui/Inputbox";

const AddToDoCardPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newToDo = {
            title,
            description,
            completed: false,
        };

        const response = await toDoListApi.createToDo(newToDo);
        if (response) {
            navigate("/home");
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
                <StyledButton type="primary" submit={true} onClick={handleSubmit} label="Add To-Do" />
            </form>
        </div>

    );

}

export default AddToDoCardPage;