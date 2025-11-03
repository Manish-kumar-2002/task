import React, { useState, useContext, useEffect } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoForm = ({ onClose, editTodo }) => {
    const { dispatch } = useContext(TodoContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        dueDate: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (editTodo) {
            setFormData(editTodo);
        }
    }, [editTodo]);

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validation
    const validate = () => {
        if (!formData.title.trim()) return "Title is required!";
        if (!formData.status) return "Status is required!";
        if (formData.dueDate && new Date(formData.dueDate) <= new Date())
            return "Due date cannot be in the past!";
        return "";
    };

    // Submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");

        const newTodo = {
            ...formData,
            id: editTodo ? editTodo.id : Date.now(),
        };

        if (editTodo) {
            dispatch({ type: "EDIT_TODO", payload: newTodo });
        } else {
            dispatch({ type: "ADD_TODO", payload: newTodo });
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {editTodo ? "Edit TODO" : "Add New TODO"}
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded mb-3">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                            placeholder="Enter title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                            rows="3"
                            placeholder="Enter description"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {editTodo ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;
