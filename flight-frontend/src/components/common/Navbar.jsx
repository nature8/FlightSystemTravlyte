/*import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark position-absolute top-0 start-0 w-100 px-4"
      style={{
        zIndex: 1000,
        background: "transparent",
      }}
    >
      <div className="container-fluid py-3">
        <Link
          className="navbar-brand fw-bold fs-3 text-white"
          to="/"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
        >
          Travlyte
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-lg-3">
            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
              >
                Flights
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
              >
                Booking
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold"
                to="/"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;*/

import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";

    if (!isUserLoggedIn) {
      alert("Please Login or Register first to view your profile");
      navigate("/login");
      return;
    }

    navigate("/profile");
  };

  return (
    <nav
  className="navbar navbar-expand-lg navbar-dark fixed-top w-100 px-4"
  style={{
    zIndex: 1000,
    background: "transparent",
  }}
>
      <div className="container-fluid py-3">
        <Link
          className="navbar-brand fw-bold fs-3 text-white"
          to="/"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
        >
          Travlyte
        </Link>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/">
                Flights
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/user/flights">
                Booking
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="nav-link text-white fw-semibold border-0 bg-transparent"
                onClick={handleProfileClick}
              >
                Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
