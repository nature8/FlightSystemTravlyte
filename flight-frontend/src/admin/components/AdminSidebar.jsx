import { Link, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login", { replace: true });
  };

  return (
    <aside
      className="text-white min-vh-100 p-4 d-flex flex-column"
      style={{
        width: "250px",
        background: "rgba(0,0,0,0.38)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <div className="mb-5">
        <h3 className="fw-bold mb-1">Travlyte</h3>
        <small className="text-white-50">Admin Panel</small>
      </div>

      <nav className="d-flex flex-column gap-2">
        <Link className="admin-link" to="/admin">
          Dashboard
        </Link>

        <Link className="admin-link" to="/admin/flights">
          Flights
        </Link>


        <Link className="admin-link" to="/admin/bookings">
          Bookings
        </Link>

        <Link className="admin-link" to="/admin/passengers">
          Passengers
        </Link>
      </nav>

      <button
        className="btn btn-outline-light mt-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default AdminSidebar;
