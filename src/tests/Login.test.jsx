import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";

test("login with correct credentials", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
    target: { value: "intern@demo.com" }
  });

  fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
    target: { value: "intern123" }
  });

 fireEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(screen.queryByText("Invalid email or password")).not.toBeInTheDocument();
});
