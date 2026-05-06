
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state?.booking;

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";

    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (!booking) {
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
          className="position-relative d-flex align-items-center justify-content-center text-center"
          style={{ minHeight: "100vh", zIndex: 2 }}
        >
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "18px",
              background: "rgba(255,255,255,0.92)",
              maxWidth: "520px",
            }}
          >
            <h2 className="fw-bold mb-3">No Ticket Found</h2>
            <p className="text-muted mb-4">
              Please complete a booking to generate a ticket.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/user/flights")}
            >
              Back to Flights
            </button>
          </div>
        </div>
      </section>
    );
  }

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
        className="position-relative"
        style={{
          zIndex: 2,
          paddingTop: "120px",
          paddingBottom: "70px",
        }}
      >
        <div className="container">
          <div className="text-center text-white mb-4">
            <h1 className="fw-bold">Booking Confirmed</h1>
            <p className="lead mb-0">
              Your ticket has been generated successfully.
            </p>
          </div>

          <div
            className="card border-0 shadow-lg mx-auto"
            style={{
              maxWidth: "950px",
              borderRadius: "20px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-header bg-primary text-white p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold mb-1">Travlyte Flight Ticket</h3>
                  <p className="mb-0">Booking ID: #{booking.id}</p>
                </div>

                <span className="badge bg-light text-primary px-3 py-2">
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="card-body p-4">
              <div className="row g-4 mb-4">
                <div className="col-md-4">
                  <small className="text-muted">Airline</small>
                  <h5 className="fw-bold mb-0">
                    {booking.flight?.airline || "Not available"}
                  </h5>
                </div>

                <div className="col-md-4">
                  <small className="text-muted">Route</small>
                  <h5 className="fw-bold mb-0">
                    {booking.flight?.source} → {booking.flight?.destination}
                  </h5>
                </div>

                <div className="col-md-4">
                  <small className="text-muted">Booking Date</small>
                  <h5 className="fw-bold mb-0">
                    {formatDateTime(booking.bookingDate)}
                  </h5>
                </div>

                <div className="col-md-4">
                  <small className="text-muted">Departure</small>
                  <h6 className="fw-semibold mb-0">
                    {formatDateTime(booking.flight?.departureTime)}
                  </h6>
                </div>

                <div className="col-md-4">
                  <small className="text-muted">Arrival</small>
                  <h6 className="fw-semibold mb-0">
                    {formatDateTime(booking.flight?.arrivalTime)}
                  </h6>
                </div>

                <div className="col-md-4">
                  <small className="text-muted">Price Per Seat</small>
                  <h6 className="fw-semibold text-primary mb-0">
                    ₹{booking.flight?.price}
                  </h6>
                </div>
              </div>

              <hr />

              <h5 className="fw-bold mb-3">Passenger Details</h5>

              <div className="table-responsive mb-4">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
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

              <h5 className="fw-bold mb-3">Payment Details</h5>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Amount Paid</small>
                    <h5 className="fw-bold text-primary mb-0">
                      ₹{booking.payment?.amount || 0}
                    </h5>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Payment Mode</small>
                    <h5 className="fw-bold mb-0">
                      {booking.payment?.modeOfTransaction || "Not available"}
                    </h5>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded p-3 h-100">
                    <small className="text-muted">Payment Status</small>
                    <h5 className="fw-bold text-success mb-0">
                      {booking.payment?.status || "Not available"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer bg-white p-4 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Please carry a valid ID proof during travel.
              </small>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/user/flights")}
              >
                Back to Flights
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Success;
