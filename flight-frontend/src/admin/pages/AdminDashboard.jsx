
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import StatusCard from "../components/StatusCard";
import Footer from "../../components/common/Footer";
import API from "../../api/axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    flights: 0,
    bookings: 0,
    passengers: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [flightRes, bookingRes, passengerRes] = await Promise.all([
        API.get("/flight"),
        API.get("/booking"),
        API.get("/passenger"),
      ]);

      setStats({
        flights: flightRes.data.data?.length || 0,
        bookings: bookingRes.data.data?.length || 0,
        passengers: passengerRes.data.data?.length || 0,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-white mb-1">Admin Dashboard</h2>
              <p className="text-white-50 mb-0">
                Manage flights, bookings, passengers, and payment activity.
              </p>
            </div>

            <button
              className="btn btn-outline-light"
              onClick={fetchDashboardStats}
            >
              Refresh
            </button>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <StatusCard
                title="Total Flights"
                value={stats.flights}
                color="primary"
              />
            </div>

            <div className="col-md-4">
              <StatusCard
                title="Bookings"
                value={stats.bookings}
                color="success"
              />
            </div>

            <div className="col-md-4">
              <StatusCard
                title="Passengers"
                value={stats.passengers}
                color="warning"
              />
            </div>
          </div>

          <div
            className="card border-0 shadow-lg mt-4"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">Quick Overview</h4>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Flight Operations</small>
                    <h6 className="mt-2 mb-0">
                      Add, view, update, and remove flight schedules.
                    </h6>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Booking Records</small>
                    <h6 className="mt-2 mb-0">
                      Monitor booking history, payment status, and seat details.
                    </h6>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Passenger Access</small>
                    <h6 className="mt-2 mb-0">
                      View, update, or delete passenger information securely.
                    </h6>
                  </div>
                </div>
              </div>
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

export default AdminDashboard;
