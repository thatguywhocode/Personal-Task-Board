import { useState, useContext } from "react";
import { DndContext, DragOverlay, useSensor,useSensors,PointerSensor } from "@dnd-kit/core";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { BoardContext } from "../../context/BoardContext";
import "./Board.css";

function BoardLayout() {
  const { tasks, moveTask } = useContext(BoardContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");
  const [activeTask, setActiveTask] = useState(null);

const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8
    }
  })
);

  let filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (priorityFilter !== "All") {
    filteredTasks = filteredTasks.filter(
      task => task.priority === priorityFilter
    );
  }


  if (sortOrder === "asc") {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  if (sortOrder === "desc") {
    filteredTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
  }


  const handleDragStart = (event) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task);
  };


  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      moveTask(active.id, over.id);
    }

    setActiveTask(null);
  };

  return (
   <DndContext
  sensors={sensors}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>

      <div className="board-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">No Sorting</option>
          <option value="asc">Due Date Asc</option>
          <option value="desc">Due Date Desc</option>
        </select>
      </div>

      <div className="board-container">
        <Column title="To Do" status="todo" tasks={filteredTasks} />
        <Column title="Doing" status="doing" tasks={filteredTasks} />
        <Column title="Done" status="done" tasks={filteredTasks} />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div style={{ cursor: "grabbing" }}>
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default BoardLayout;
