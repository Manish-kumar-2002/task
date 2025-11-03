import React, { useState, useContext, useMemo } from "react";
import { TodoContext } from "../context/TodoContext";

const TodoFilterBar = ({ onFilter }) => {
    const { state } = useContext(TodoContext);
    const [searchText, setSearchText] = useState("");
    const [status, setStatus] = useState("All");
    const [sortBy, setSortBy] = useState("");

    // filter + search + sort logic
    const filteredTodos = useMemo(() => {
        let todos = [...state.todos];

        // Filter by status
        if (status !== "All") {
            todos = todos.filter((t) => t.status === status);
        }

        // Search by title or description
        if (searchText.trim()) {
            const query = searchText.toLowerCase();
            todos = todos.filter(
                (t) =>
                    t.title.toLowerCase().includes(query) ||
                    t.description.toLowerCase().includes(query)
            );
        }

        // Sort by title or due date
        if (sortBy === "title") {
            todos.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "dueDate") {
            todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }

        return todos;
    }, [state.todos, searchText, status, sortBy]);

    // Trigger update to parent
    React.useEffect(() => {
        onFilter(filteredTodos);
    }, [filteredTodos, onFilter]);

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <input
                type="text"
                placeholder="Search by title or description..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border rounded px-3 py-2 w-full md:w-1/3"
            />

            <div className="flex gap-3">
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">Sort By</option>
                    <option value="title">Title</option>
                    <option value="dueDate">Due Date</option>
                </select>
            </div>
        </div>
    );
};

export default TodoFilterBar;
