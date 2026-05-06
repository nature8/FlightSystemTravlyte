import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/common/Footer";

function ManageBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/booking");
      setBookings(res.data.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load booking history.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "SUCCESSFUL":
        return "success";
      case "CANCELLED":
        return "danger";
      case "PENDING":
        return "warning";
      default:
        return "secondary";
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const passengers = booking.passengers || [];

      const searchText = [
        booking.id,
        booking.status,
        booking.flight?.airline,
        booking.flight?.source,
        booking.flight?.destination,
        booking.payment?.amount,
        booking.payment?.modeOfTransaction,
        ...passengers.map((p) => p.name),
        ...passengers.map((p) => p.contactNumber),
        ...passengers.map((p) => p.seatNumber),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.payment?.amount || 0),
    0
  );

  const totalPassengers = bookings.reduce(
    (sum, booking) => sum + (booking.passengers?.length || 0),
    0
  );

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
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.72))",
          zIndex: 1,
        }}
      />

      <div className="position-relative d-flex" style={{ zIndex: 2 }}>
        <AdminSidebar />

        <main className="flex-grow-1 p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <button
                type="button"
                className="btn btn-outline-light mb-4"
                onClick={() => navigate("/admin")}
              >
                ← Back to Dashboard
              </button>

              <h2 className="fw-bold text-white mb-1">Booking Management</h2>
              <p className="text-white-50 mb-0">
                Track bookings, passengers, seats, routes, and payment details.
              </p>
            </div>

            <button
              className="btn btn-outline-light mt-5"
              onClick={fetchBookings}
            >
              Refresh
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-4">
                  <p className="text-muted mb-1">Total Bookings</p>
                  <h2 className="fw-bold mb-0">{bookings.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-4">
                  <p className="text-muted mb-1">Total Passengers</p>
                  <h2 className="fw-bold mb-0">{totalPassengers}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-4">
                  <p className="text-muted mb-1">Total Revenue</p>
                  <h2 className="fw-bold text-primary mb-0">₹{totalRevenue}</h2>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-8">
                  <input
                    className="form-control"
                    placeholder="Search booking, passenger, contact, seat, flight, route, payment..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL">All Status</option>
                    <option value="SUCCESSFUL">Successful</option>
                    <option value="PENDING">Pending</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "16px",
                background: "rgba(255,255,255,0.92)",
              }}
            >
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary"></div>
                <h5 className="mt-3">Loading bookings...</h5>
              </div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="alert alert-info">
              No bookings found for the selected filters.
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {filteredBookings.map((booking) => (
                <div
                  className="card border-0 shadow-lg"
                  key={booking.id}
                  style={{
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.94)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="card-header bg-transparent border-0 p-4 pb-0">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-bold mb-1">
                          Booking #{booking.id}
                        </h5>
                        <small className="text-muted">
                          {formatDate(booking.bookingDate)}
                        </small>
                      </div>

                      <span
                        className={`badge bg-${getStatusClass(
                          booking.status
                        )} px-3 py-2`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    <div className="row g-3 mb-4">
                      <div className="col-md-3">
                        <small className="text-muted">Flight</small>
                        <h6 className="fw-bold mb-0">
                          {booking.flight?.airline || "Not available"}
                        </h6>
                      </div>

                      <div className="col-md-3">
                        <small className="text-muted">Route</small>
                        <h6 className="fw-bold mb-0">
                          {booking.flight?.source} →{" "}
                          {booking.flight?.destination}
                        </h6>
                      </div>

                      <div className="col-md-3">
                        <small className="text-muted">Payment Mode</small>
                        <h6 className="fw-bold mb-0">
                          {booking.payment?.modeOfTransaction || "Not available"}
                        </h6>
                      </div>

                      <div className="col-md-3">
                        <small className="text-muted">Amount</small>
                        <h6 className="fw-bold text-primary mb-0">
                          ₹{booking.payment?.amount || 0}
                        </h6>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-sm table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Passenger</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Contact</th>
                            <th>Seat</th>
                          </tr>
                        </thead>

                        <tbody>
                          {booking.passengers?.map((passenger) => (
                            <tr key={passenger.id}>
                              <td className="fw-semibold">{passenger.name}</td>
                              <td>{passenger.age}</td>
                              <td>{passenger.gender}</td>
                              <td>{passenger.contactNumber}</td>
                              <td>
                                <span className="badge bg-dark px-3 py-2">
                                  {passenger.seatNumber}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5">
            <Footer />
          </div>
        </main>
      </div>
    </section>
  );
}

export default ManageBookings;
