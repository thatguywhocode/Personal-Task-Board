import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "../components/board/TaskForm";
import { BoardProvider } from "../context/BoardContext";

test("adds a new task and clears title input", () => {
  render(
    <BoardProvider>
      <TaskForm />
    </BoardProvider>
  );

  const titleInput = screen.getByPlaceholderText("Title");

  fireEvent.change(titleInput, {
    target: { value: "Test Task" }
  });

  fireEvent.click(screen.getByRole("button", { name: "Add Task" }));

  expect(titleInput.value).toBe("");
});
