import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BoardLayout from "../components/board/BoardLayout";
import ActivityLog from "../components/board/ActivityLog";
import { BoardContext } from "../context/BoardContext";
import TaskForm from "../components/board/TaskForm";

function Board() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const { resetBoard } = useContext(BoardContext);


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
  <div className="board-page page-transition">

    <div className="app-header">
  <div className="header-left"></div>

  <h2 className="welcome-text">
    Welcome to the Personal Task Board 👋
  </h2>

  <div className="header-actions">
    <button
      className="reset-btn"
      onClick={() => {
        const confirmReset = window.confirm(
          "Are you sure you want to reset the entire board?"
        );
        if (confirmReset) {
          resetBoard();
        }
      }}
    >
      Reset Board
    </button>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</div>

  <BoardLayout />
    <div className="bottom-section">
    <TaskForm />
    <ActivityLog />
  </div>
  </div>        

);
}

export default Board;