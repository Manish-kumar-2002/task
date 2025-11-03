export const todoReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_TODOS":
            return { ...state, todos: action.payload };
        case "ADD_TODO":
            return { ...state, todos: [...state.todos, action.payload] };
        case "EDIT_TODO":
            return {
                ...state,
                todos: state.todos.map((t) =>
                    t.id === action.payload.id ? action.payload : t
                ),
            };
        case "DELETE_TODO":
            return {
                ...state,
                todos: state.todos.filter((t) => t.id !== action.payload),
            };
        case "ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};
