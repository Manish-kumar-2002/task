// Simulate API calls using promises + delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    const data = await res.json();
    await delay(500);
    return data.map((item) => ({
        id: item.id,
        title: item.title,
        description: "Sample description",
        status: item.completed ? "Completed" : "Pending",
        dueDate: "2025-11-05",
    }));
};
