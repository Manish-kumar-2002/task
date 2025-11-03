import React, { createContext, useReducer, useEffect } from "react";
import { todoReducer } from "./todoReducer";

export const TodoContext = createContext();

const initialState = {
    todos: [],
    loading: false,
    error: null,
};

export const TodoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initialState, () => {
        const localData = localStorage.getItem("todos");
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(state));
    }, [state]);

    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};
