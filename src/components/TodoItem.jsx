import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoItem = ({ todo, onEdit }) => {
    const { dispatch } = useContext(TodoContext);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch({ type: "DELETE_TODO", payload: todo.id });
        }
    };

    return (
        <div
            className={`md:flex justify-between items-center p-3 border rounded ${todo.status === "Completed" ? "bg-gray-200 line-through" : "bg-white"
                }`}
        >
            <div>
                <h3 className="font-medium">{todo.title}</h3>
                <p className="text-sm">{todo.description}</p>
                <small>Due: {todo.dueDate}</small>
            </div>
            <div className="space-x-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
                    onClick={() => onEdit(todo)}
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
