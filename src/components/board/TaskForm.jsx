import { useState, useContext } from "react";
import { BoardContext } from "../../context/BoardContext";

function TaskForm() {
const { addTask } = useContext(BoardContext);

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("");
const [dueDate, setDueDate] = useState("");
const [tags, setTags] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!title.trim()) {
    setError("Title is required");
    return;
  }

  if (!priority) {
    setError("Priority is required");
    return;
  }

  if (!dueDate) {
    setError("Due Date is required");
    return;
  }

  try {
    await addTask({
      title,
      description,
      priority,
      dueDate,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setTags("");
    setError("");
  } catch (err) {
    console.error(err);
    setError("Failed to create task");
  }
};


return ( <div className="task-form"> <h3>Create Task</h3>


  {error && (
    <div className="error-message">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Task Title"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
        setError("");
      }}
    />

    <textarea
      placeholder="Task Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    <div className="form-row">
      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          setError("");
        }}
      >
        <option value="" disabled>
          Priority Level
        </option>
        <option value="low">🟢 Low</option>
        <option value="medium">🟡 Medium</option>
        <option value="high">🔴 High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
          setError("");
        }}
      />
    </div>

    <input
      type="text"
      placeholder="Tags (e.g. work, urgent)"
      value={tags}
      onChange={(e) => setTags(e.target.value)}
    />

<button type="submit" className="create-btn">
  ➕ Add Task
</button>
  </form>
</div>

);
}

export default TaskForm;
