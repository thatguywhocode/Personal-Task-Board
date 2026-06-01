import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const BoardContext = createContext();

export function BoardProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const [activityLog, setActivityLog] = useState(() => {
    const stored = localStorage.getItem("activityLog");
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch Tasks from Backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log("Fetch Tasks Error:", err);
    }
  };

  // Add Task
  const addTask = async (newTask) => {
    try {
      const taskData = {
        ...newTask,
        status: "todo",
        createdAt: new Date().toISOString(),
      };

      const res = await api.post("/tasks", taskData);

      setTasks((prev) => [...prev, res.data]);

      setActivityLog((prev) => [
        {
          message: `🟢 Created "${newTask.title}"`,
          time: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.log("Add Task Error:", err);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      const taskToDelete = tasks.find(
        (task) => task._id === taskId
      );

      await api.delete(`/tasks/${taskId}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );

      if (taskToDelete) {
        setActivityLog((prev) => [
          {
            message: `🔴 Deleted "${taskToDelete.title}"`,
            time: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.log("Delete Task Error:", err);
    }
  };

  // Update Task
  const updateTask = async (updatedTask) => {
    try {
      const res = await api.put(
        `/tasks/${updatedTask._id}`,
        updatedTask
      );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id
            ? res.data
            : task
        )
      );

      setActivityLog((prev) => [
        {
          message: `📝 Edited "${updatedTask.title}"`,
          time: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.log("Update Task Error:", err);
    }
  };

  // Move Task
  const moveTask = async (taskId, newStatus) => {
    try {
      const task = tasks.find(
        (t) => t._id === taskId
      );

      if (!task) return;

      const res = await api.put(
        `/tasks/${taskId}`,
        {
          ...task,
          status: newStatus,
        }
      );

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? res.data : t
        )
      );

      setActivityLog((prev) => [
        {
          message: `📦 Moved "${task.title}" to ${newStatus}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.log("Move Task Error:", err);
    }
  };

  // Reset Board
  const resetBoard = () => {
    setTasks([]);
    setActivityLog([]);

    localStorage.removeItem("activityLog");
  };

  // Save Activity Log
  useEffect(() => {
    localStorage.setItem(
      "activityLog",
      JSON.stringify(activityLog)
    );
  }, [activityLog]);

  return (
    <BoardContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        moveTask,
        activityLog,
        resetBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}