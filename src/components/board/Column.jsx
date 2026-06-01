import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

function Column({ title, status, tasks }) {
  const { setNodeRef } = useDroppable({ id: status });

  const filteredTasks = tasks.filter(task => task.status === status);

  const getHeaderClass = () => {
    if (status === "todo") return "column-header todo";
    if (status === "doing") return "column-header doing";
    if (status === "done") return "column-header done";
  };

  return (
    <div ref={setNodeRef} className="column">
      
 
      <div className={getHeaderClass()}>
        <span>{title}</span>
        <span className="task-count">{filteredTasks.length}</span>
      </div>

      {filteredTasks.length === 0 && (
        <p className="empty-text">No tasks</p>
      )}

   
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} />
      ))}

    </div>
  );
}

export default Column;
