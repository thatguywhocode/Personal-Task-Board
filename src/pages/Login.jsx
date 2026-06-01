import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await login(
    email,
    password,
    rememberMe
  );

  if (result.success) {
    navigate("/board");
  } else {
    setError(result.message);
  }
};

return (
  <div className="login-page page-transition">
    <div className="login-card">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="remember-wrapper">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </label>

        <button type="submit" className="login-btn">
          Login
        </button>

        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  </div>
);
}


export default Login;