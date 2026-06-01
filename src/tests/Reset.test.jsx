import { render } from "@testing-library/react";
import { BoardProvider } from "../context/BoardContext";

test("board provider renders without crashing", () => {
  render(<BoardProvider><div>Test</div></BoardProvider>);
});
