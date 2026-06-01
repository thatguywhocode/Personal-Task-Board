import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      
      <Route path="/login" 
      element={isAuthenticated ? <Navigate to="/board" /> : <Login/>} />

      <Route
        path="/board"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
