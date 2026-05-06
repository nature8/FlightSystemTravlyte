import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function UserRegister() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await API.post("/users", user);

      localStorage.setItem("user", JSON.stringify(res.data.data));
      localStorage.setItem("isUserLoggedIn", "true");

      navigate("/user/flights", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Registration failed. Email or contact may already exist.");
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
            width: "440px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="card-body p-4">
            <h2 className="fw-bold text-center mb-2">Create Account</h2>
            <p className="text-muted text-center mb-4">
              Register to book flights and manage your travel.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleRegister}>
              <input className="form-control mb-3" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
              <input className="form-control mb-3" type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
              <input className="form-control mb-3" name="contactNumber" placeholder="Contact Number" value={user.contactNumber} onChange={handleChange} required />
              <input className="form-control mb-3" type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />

              <button className="btn btn-primary w-100 py-2" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <button className="btn btn-link w-100 mt-3" onClick={() => navigate("/login")}>
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegister;
