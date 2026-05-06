import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function UserLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await API.post("/users/login", loginData);

      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("isUserLoggedIn", "true");

      navigate("/user/flights", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="position-relative overflow-hidden" style={{ minHeight: "100vh" }}>
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/assets/flight1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          transform: "scale(1.04)",
          zIndex: 0,
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72))",
          zIndex: 1,
        }}
      />

      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh", zIndex: 2, paddingTop: "100px" }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{
            width: "420px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="card-body p-4">
            <h2 className="fw-bold text-center mb-2">User Login</h2>
            <p className="text-muted text-center mb-4">
              Login to continue booking your flight.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleLogin}>
              <input className="form-control mb-3" type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleChange} required />
              <input className="form-control mb-3" type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} required />

              <button className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button className="btn btn-link w-100 mt-3" onClick={() => navigate("/register")}>
              New user? Register
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
