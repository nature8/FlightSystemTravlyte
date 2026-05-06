import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("isAdminLoggedIn");

    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="p-3 bg-white shadow-sm d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Admin Panel</h5>

      <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default AdminNavbar;
