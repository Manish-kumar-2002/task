import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./components/TodoList";
import logo from './assets/logo.svg'

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-white-100 p-6">
        <h1 className="flex text-2xl font-bold mb-6 text-center items-center  justify-center gap-2">
          <img width={40} src={logo} alt="logo" />Todo App
        </h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
