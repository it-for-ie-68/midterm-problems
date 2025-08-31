// @ts-nocheck
import { useState, type ChangeEvent } from "react";
interface Task {
  id: number;
  description: string;
  createdAt: string;
}

const initialTasks: Task[] = [
  {
    id: createId(),
    description: "📝 First Task",
    createdAt: new Date().toLocaleString(),
  },
  {
    id: createId(),
    description: "📝 Second Task",
    createdAt: new Date().toLocaleString(),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  setTasks(initialTasks);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const addTask = () => {
    if (inputValue.trim()) {
      setTasks((prev) => [
        ...prev,
        {
          id: createId(),
          description: "📝 " + inputValue,
          createdAt: new Date().toLocaleString(),
        },
      ]);
      setInputValue("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>My Todos</h1>
      <div>
        <input type="text" onChange={onInputChange} placeholder="New task" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div>
          <span>
            {task.description} (Created: {task.createdAt})&nbsp;
          </span>
          <button onClick={() => deleteTask("XXXX")}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default App;

function createId() {
  return Math.floor(Math.random() * 9000) + 1000;
}
