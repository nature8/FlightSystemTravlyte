import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function AdminLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await API.post("/admin/login", loginData);

      localStorage.setItem("admin", JSON.stringify(res.data.data));
      localStorage.setItem("isAdminLoggedIn", "true");

      navigate("/admin", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/assets/flight1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(4px)",
          transform: "scale(1.04)",
          zIndex: 0,
        }}
      />

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.72))",
          zIndex: 1,
        }}
      />

      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          zIndex: 2,
          paddingTop: "100px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="card-body p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold mb-2">Admin Login</h2>
                    <p className="text-muted mb-0">
                      Sign in to manage flights, bookings, and passengers.
                    </p>
                  </div>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter admin email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2 fw-semibold"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Login"}
                    </button>
                  </form>

                  <button
                    type="button"
                    className="btn btn-link w-100 mt-3 text-decoration-none"
                    onClick={() => navigate("/")}
                  >
                    Back to flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
