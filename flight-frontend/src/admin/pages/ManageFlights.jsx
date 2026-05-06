import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/common/Footer";

function ManageFlights() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const res = await API.get("/flight");
      setFlights(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const deleteFlight = async (id) => {
    if (!confirm("Are you sure you want to delete this flight?")) return;

    try {
      await API.delete(`/flight/${id}`);
      alert("Flight deleted successfully");
      fetchFlights();
    } catch (err) {
      console.error(err);
      alert("Failed to delete flight");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";

    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const text = [
        flight.id,
        flight.airline,
        flight.source,
        flight.destination,
        flight.totalSeats,
        flight.price,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [flights, search]);

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

              <h2 className="fw-bold text-white mb-1">Manage Flights</h2>
              <p className="text-white-50 mb-0">
                View, search, and remove flight schedules from the system.
              </p>
            </div>

            <button
              className="btn btn-primary mt-5"
              onClick={() => navigate("/admin/add-flight")}
            >
              + Add Flight
            </button>
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
              <div className="row g-3 align-items-center">
                <div className="col-md-8">
                  <input
                    className="form-control"
                    placeholder="Search by airline, source, destination, seats, price..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-4 text-md-end">
                  <button
                    className="btn btn-outline-primary"
                    onClick={fetchFlights}
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.94)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center p-5">
                  <div className="spinner-border text-primary"></div>
                  <h5 className="mt-3">Loading flights...</h5>
                </div>
              ) : filteredFlights.length === 0 ? (
                <div className="alert alert-info m-4">
                  No flights found.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Flight</th>
                        <th>Route</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Seats</th>
                        <th>Price</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredFlights.map((flight) => (
                        <tr key={flight.id}>
                          <td>
                            <div className="fw-bold">{flight.airline}</div>
                            <small className="text-muted">
                              Flight #{flight.id}
                            </small>
                          </td>

                          <td>
                            <span className="fw-semibold">{flight.source}</span>
                            <span className="text-primary mx-2">→</span>
                            <span className="fw-semibold">
                              {flight.destination}
                            </span>
                          </td>

                          <td>{formatDateTime(flight.departureTime)}</td>
                          <td>{formatDateTime(flight.arrivalTime)}</td>

                          <td>
                            <span className="badge bg-light text-dark border">
                              {flight.totalSeats}
                            </span>
                          </td>

                          <td className="fw-bold text-primary">
                            ₹{flight.price}
                          </td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteFlight(flight.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5">
            <Footer />
          </div>
        </main>
      </div>
    </section>
  );
}

export default ManageFlights;
