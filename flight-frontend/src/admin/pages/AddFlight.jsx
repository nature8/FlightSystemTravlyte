import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/common/Footer";

function AddFlight() {
  const navigate = useNavigate();

  const [flight, setFlight] = useState({
    airline: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    price: "",
  });

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flightData = {
      ...flight,
      totalSeats: Number(flight.totalSeats),
      price: Number(flight.price),
    };

    try {
      await API.post("/flight", flightData);
      alert("Flight added successfully");
      navigate("/admin/flights");
    } catch (err) {
      console.error(err);
      alert("Failed to add flight");
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
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.72))",
          zIndex: 1,
        }}
      />

      <div className="position-relative d-flex" style={{ zIndex: 2 }}>
        <AdminSidebar />

        <main className="flex-grow-1 p-4 p-md-5">
          <button
            type="button"
            className="btn btn-outline-light mb-4"
            onClick={() => navigate("/admin")}
          >
            ← Back to Dashboard
          </button>

          <div className="mb-4">
            <h2 className="fw-bold text-white mb-1">Add Flight</h2>
            <p className="text-white-50 mb-0">
              Create a new flight schedule for users to book.
            </p>
          </div>

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Airline</label>
                    <input
                      className="form-control"
                      name="airline"
                      placeholder="Enter airline name"
                      value={flight.airline}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Source</label>
                    <input
                      className="form-control"
                      name="source"
                      placeholder="From"
                      value={flight.source}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label className="form-label">Destination</label>
                    <input
                      className="form-control"
                      name="destination"
                      placeholder="To"
                      value={flight.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Departure Time</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="departureTime"
                      value={flight.departureTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Arrival Time</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="arrivalTime"
                      value={flight.arrivalTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Total Seats</label>
                    <input
                      className="form-control"
                      type="number"
                      name="totalSeats"
                      placeholder="Enter total seats"
                      value={flight.totalSeats}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Price</label>
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={flight.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin")}
                  >
                    Cancel
                  </button>

                  <button type="submit" className="btn btn-primary px-4">
                    Save Flight
                  </button>
                </div>
              </form>
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

export default AddFlight;
