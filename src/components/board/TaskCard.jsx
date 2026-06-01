import { useContext, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { BoardContext } from "../../context/BoardContext";

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useContext(BoardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  const handleUpdate = () => {
    updateTask({
      ...task,
      title,
      description,
      priority,
      dueDate,
    });

    setIsEditing(false);
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`task-card priority-${task.priority}`}
    >
      {isEditing ? (
        <div
          className="edit-mode"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-row">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={dueDate ? dueDate.split("T")[0] : ""}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="task-actions">
            <button
              className="save-btn"
              onClick={handleUpdate}
            >
              💾 Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              ✖ Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-top">
            <h4 className="task-title">{task.title}</h4>

            {isOverdue && (
              <span className="overdue-badge">
                ⚠ Overdue
              </span>
            )}
          </div>

          <p className="task-desc">{task.description}</p>

          <div className="task-footer">
            <span className={`priority-badge ${task.priority}`}>
              {task.priority.toUpperCase()}
            </span>

            <span className="task-date">
              📅{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString("en-IN")
                : "No Due Date"}
            </span>
          </div>

          <div className="task-actions">
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task._id);
              }}
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;