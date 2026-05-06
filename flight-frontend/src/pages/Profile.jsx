import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Footer from "../components/common/Footer";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isUserLoggedIn =
      localStorage.getItem("isUserLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!isUserLoggedIn || !storedUser) {
      alert("Please login or register first");
      navigate("/login", { replace: true });
      return;
    }

    setUser(storedUser);
    fetchUserBookings(storedUser.id);
  }, []);

  const fetchUserBookings = async (userId) => {
    try {
      const res = await API.get(`/booking/users/${userId}`);
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isUserLoggedIn");
    navigate("/login");
  };

  const handleBackToFlights = () => {
    navigate("/flights");
  };

  // 🔥 DOWNLOAD TICKET (you will plug your design here later)
  const handleDownloadTicket = (booking) => {
    console.log("Download ticket for booking:", booking);

    // 👉 You will replace this with your ticket generation logic
    // Example: PDF generation, image download, etc.
    alert(`Downloading ticket for Booking #${booking.id}`);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";
    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!user) return null;

  return (
    <section
      className="position-relative overflow-hidden"
      style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}
    >
      {/* Background */}
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

      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75))",
          zIndex: 1,
        }}
      />

      <div
        className="position-relative"
        style={{ zIndex: 2, paddingTop: "120px", paddingBottom: "40px" }}
      >
        <div className="container">

          {/* HEADER */}
          <div className="text-white mb-4 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold">My Profile</h1>
              <p className="text-white-50 mb-0">
                Manage your bookings and account
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-light"
                onClick={handleBackToFlights}
              >
                Back to Flights
              </button>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* USER INFO */}
          <div className="card shadow-lg mb-4">
            <div className="card-body">
              <h4>User Details</h4>
              <div className="row">
                <div className="col-md-4">
                  <strong>Name:</strong> {user.name}
                </div>
                <div className="col-md-4">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="col-md-4">
                  <strong>Contact:</strong> {user.contactNumber}
                </div>
              </div>
            </div>
          </div>

          {/* BOOKINGS */}
          <div className="card shadow-lg">
            <div className="card-body">
              <h4 className="mb-3">My Bookings</h4>

              {loading ? (
                <p>Loading...</p>
              ) : bookings.length === 0 ? (
                <div className="alert alert-info">
                  No bookings found
                </div>
              ) : (
                bookings.map((booking) => (
                  <div key={booking.id} className="border p-3 mb-3 rounded">

                    <div className="d-flex justify-content-between">
                      <h5>Booking </h5>
                      <span className="badge bg-success">
                        {booking.status}
                      </span>
                    </div>

                    <p>
                      <b>{booking.flight?.airline}</b> |{" "}
                      {booking.flight?.source} →{" "}
                      {booking.flight?.destination}
                    </p>

                    <p>
                      Departure: {formatDateTime(booking.flight?.departureTime)}
                    </p>

                    <p>
                      Arrival: {formatDateTime(booking.flight?.arrivalTime)}
                    </p>

                    <p>
                      Amount Paid: ₹{booking.payment?.amount || 0}
                    </p>

                    {/* PASSENGERS */}
                    <table className="table table-sm">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Seat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {booking.passengers?.map((p) => (
                          <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.gender}</td>
                            <td>{p.seatNumber}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* DOWNLOAD BUTTON */}
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleDownloadTicket(booking)}
                    >
                      Download Ticket
                    </button>

                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-5">
            <Footer />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Profile;