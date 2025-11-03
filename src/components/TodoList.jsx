
import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { fetchTodos } from "../utils/api";
import TodoItem from "./TodoItem";
import TodoFilterBar from "./TodoFilterBar";
import TodoForm from "./TodoForm";

const TodoList = () => {
    const { state, dispatch } = useContext(TodoContext);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    // Load data from mock API
    useEffect(() => {
        const loadData = async () => {
            const localData = JSON.parse(localStorage.getItem("todos"));
            if (!localData || localData.todos.length === 0) {
                try {
                    const todos = await fetchTodos();
                    dispatch({ type: "LOAD_TODOS", payload: todos });
                } catch (error) {
                    dispatch({ type: "ERROR", payload: error.message });
                }
            } else {
                dispatch({ type: "LOAD_TODOS", payload: localData.todos });
            }
        };
        loadData();
    }, [dispatch]);


    // When context changes, update filter list initially
    useEffect(() => {
        setFilteredTodos(state.todos);
    }, [state.todos]);

    return (
        <div className="p-4 bg-white rounded shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">TODO List</h2>
                <button
                    onClick={() => {
                        setEditItem(null);
                        setShowForm(true);
                    }}
                    className="px-3 py-2 bg-green-600 text-white rounded"
                >
                    + Add Task
                </button>
            </div>

            {/* Filter/Search/Sort */}
            <TodoFilterBar onFilter={setFilteredTodos} />

            {/* Form Modal */}
            {showForm && (
                <TodoForm
                    editTodo={editItem}
                    onClose={() => setShowForm(false)}
                />
            )}

            {/* Render List */}
            {filteredTodos.length === 0 ? (
                <p className="text-gray-500 text-sm">No matching TODOs found.</p>
            ) : (
                <div className="space-y-3">
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onEdit={(todo) => {
                                setEditItem(todo);
                                setShowForm(true);
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoList;




// import React, { useContext, useEffect, useState } from "react";
// import { TodoContext } from "../context/TodoContext";
// import { fetchTodos } from "../utils/api";
// import TodoItem from "./TodoItem";
// import TodoForm from "./TodoForm";


// const TodoList = () => {
//   const { state, dispatch } = useContext(TodoContext);
//   const [showForm, setShowForm] = useState(false);
// const [editItem, setEditItem] = useState(null);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const todos = await fetchTodos();
//         dispatch({ type: "LOAD_TODOS", payload: todos });
//       } catch (error) {
//         dispatch({ type: "ERROR", payload: error.message });
//       }
//     };
//     loadData();
//   }, [dispatch]);

//   return (
//     <><button
//       onClick={() => { setEditItem(null); setShowForm(true); }}
//       className="mb-3 px-4 py-2 bg-green-600 text-white rounded"
//     >
//       + Add Task
//     </button>

//     {showForm && (
//       <TodoForm
//         editTodo={editItem}
//         onClose={() => setShowForm(false)}
//       />
//     )}
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">TODO List</h2>
//       {state.todos.length === 0 ? (
//         <p>No TODOs found.</p>
//       ) : (
//         <div className="space-y-3">
//           {state.todos.map((todo) => (
//             <TodoItem key={todo.id} todo={todo} />
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default TodoList;
