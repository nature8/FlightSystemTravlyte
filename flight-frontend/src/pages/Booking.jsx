

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/common/Footer";


function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "MALE", contactNumber: "", seatNumber: "" },
  ]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [paymentMode, setPaymentMode] = useState("CARD");

  const rows = 10;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/flight/${id}`)
      .then((res) => setFlight(res.data.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/passenger/flight/${id}`)
      .then((res) => {
        const seats = (res.data.data || []).map((p) => p.seatNumber);
        setBookedSeats(seats);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";

    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;

    let updated;

    if (selectedSeats.includes(seat)) {
      updated = selectedSeats.filter((s) => s !== seat);
    } else {
      if (selectedSeats.length >= passengers.length) {
        alert("Add more passengers first");
        return;
      }

      updated = [...selectedSeats, seat];
    }

    setSelectedSeats(updated);
  };

  useEffect(() => {
    const updatedPassengers = passengers.map((passenger, index) => ({
      ...passenger,
      seatNumber: selectedSeats[index] || "",
    }));

    setPassengers(updatedPassengers);
  }, [selectedSeats]);

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { name: "", age: "", gender: "MALE", contactNumber: "", seatNumber: "" },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;

    setPassengers(passengers.filter((_, i) => i !== index));
    setSelectedSeats(selectedSeats.filter((_, i) => i !== index));
  };

  const handleBooking = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser || !loggedInUser.id) {
    alert("Please login first to book a flight");
    navigate("/login");
    return;
  }

  const hasEmptyPassenger = passengers.some(
    (p) =>
      !p.name ||
      !p.age ||
      !p.gender ||
      !p.contactNumber ||
      !p.seatNumber
  );

  if (hasEmptyPassenger) {
    alert("Please fill passenger details and select seats for all passengers");
    return;
  }

  const bookingData = {
    status: "SUCCESSFUL",

    passengers: passengers.map((passenger) => ({
      ...passenger,
      age: Number(passenger.age),

      // This connects Passenger with logged-in Users table
      user: {
        id: loggedInUser.id,
      },
    })),

    payment: {
      modeOfTransaction: paymentMode,
      status: "SUCCESSFUL",
    },

    flight: {
      id: Number(id),
    },
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/booking",
      bookingData
    );

    navigate("/success", {
      state: {
        booking: res.data.data,
      },
    });
  } catch (err) {
    console.error("FULL ERROR:", err.response?.data);
    alert(err.response?.data?.message || "Booking Failed");
  }
};


  if (!flight) {
    return (
      <section
        className="position-relative overflow-hidden"
        style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}
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
              "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.62))",
            zIndex: 1,
          }}
        />
        <div
          className="position-relative text-center text-white"
          style={{ zIndex: 2, paddingTop: "140px" }}
        >
          <div className="spinner-border text-light"></div>
          <h5 className="mt-3">Loading booking details...</h5>
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
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65))",
          zIndex: 1,
        }}
      />

      <div
        className="position-relative"
        style={{
          zIndex: 2,
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <div className="container">
          <div className="text-center text-white mb-5">
            <h1 className="fw-bold display-6 mb-2">Complete Your Booking</h1>
            <p className="lead mb-0">
              Select seats, add passenger details, and confirm payment.
            </p>
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
              <div className="row align-items-center gy-3">
                <div className="col-md-3">
                  <small className="text-muted">Airline</small>
                  <h4 className="fw-bold mb-0">{flight.airline}</h4>
                </div>

                <div className="col-md-3">
                  <small className="text-muted">Route</small>
                  <h5 className="mb-0">
                    {flight.source} → {flight.destination}
                  </h5>
                </div>

                <div className="col-md-2">
                  <small className="text-muted">Departure</small>
                  <div className="fw-semibold">
                    {formatDateTime(flight.departureTime)}
                  </div>
                </div>

                <div className="col-md-2">
                  <small className="text-muted">Arrival</small>
                  <div className="fw-semibold">
                    {formatDateTime(flight.arrivalTime)}
                  </div>
                </div>

                <div className="col-md-2">
                  <small className="text-muted">Price</small>
                  <h5 className="fw-bold text-primary mb-0">₹{flight.price}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div
                className="card border-0 shadow-lg h-100"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="fw-bold mb-1">Select Seats</h4>
                      <p className="text-muted mb-0">
                        Choose one seat per passenger.
                      </p>
                    </div>
                    <span className="badge bg-primary">
                      {selectedSeats.length}/{passengers.length}
                    </span>
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <div>
                      {Array.from({ length: rows }).map((_, i) => {
                        const row = String.fromCharCode(65 + i);

                        return (
                          <div
                            key={row}
                            className="d-flex justify-content-center mb-2"
                          >
                            {[1, 2, 3].map((col) => {
                              const seat = `${row}${col}`;
                              const isBooked = bookedSeats.includes(seat);
                              const isSelected = selectedSeats.includes(seat);

                              return (
                                <button
                                  key={seat}
                                  type="button"
                                  onClick={() => handleSeatClick(seat)}
                                  disabled={isBooked}
                                  className="border rounded fw-semibold"
                                  style={{
                                    width: 42,
                                    height: 42,
                                    margin: 4,
                                    cursor: isBooked
                                      ? "not-allowed"
                                      : "pointer",
                                    backgroundColor: isBooked
                                      ? "#6c757d"
                                      : isSelected
                                      ? "#0d6efd"
                                      : "#ffffff",
                                    color:
                                      isBooked || isSelected
                                        ? "#ffffff"
                                        : "#111827",
                                  }}
                                >
                                  {seat}
                                </button>
                              );
                            })}

                            <div style={{ width: 28 }}></div>

                            {[4, 5, 6].map((col) => {
                              const seat = `${row}${col}`;
                              const isBooked = bookedSeats.includes(seat);
                              const isSelected = selectedSeats.includes(seat);

                              return (
                                <button
                                  key={seat}
                                  type="button"
                                  onClick={() => handleSeatClick(seat)}
                                  disabled={isBooked}
                                  className="border rounded fw-semibold"
                                  style={{
                                    width: 42,
                                    height: 42,
                                    margin: 4,
                                    cursor: isBooked
                                      ? "not-allowed"
                                      : "pointer",
                                    backgroundColor: isBooked
                                      ? "#6c757d"
                                      : isSelected
                                      ? "#0d6efd"
                                      : "#ffffff",
                                    color:
                                      isBooked || isSelected
                                        ? "#ffffff"
                                        : "#111827",
                                  }}
                                >
                                  {seat}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4 small">
                    <span>
                      <span className="badge bg-white text-dark border me-1">
                        A1
                      </span>
                      Available
                    </span>
                    <span>
                      <span className="badge bg-primary me-1">A1</span>
                      Selected
                    </span>
                    <span>
                      <span className="badge bg-secondary me-1">A1</span>
                      Booked
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h4 className="fw-bold mb-1">Passenger Details</h4>
                      <p className="text-muted mb-0">
                        Add traveler information for selected seats.
                      </p>
                    </div>

                    <button
                      className="btn btn-outline-primary text-nowrap"
                      onClick={addPassenger}
                    >
                      + Add Passenger
                    </button>
                  </div>

                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="border rounded p-3 mb-3 bg-light"
                    >
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="fw-bold mb-0">
                          Passenger {index + 1}
                        </h6>

                        {passengers.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => removePassenger(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="row g-3">
                        <div className="col-md-4">
                          <input
                            className="form-control"
                            placeholder="Name"
                            value={passenger.name}
                            onChange={(e) =>
                              handleChange(index, "name", e.target.value)
                            }
                          />
                        </div>

                        <div className="col-md-2">
                          <input
                            className="form-control"
                            placeholder="Age"
                            type="number"
                            value={passenger.age}
                            onChange={(e) =>
                              handleChange(index, "age", e.target.value)
                            }
                          />
                        </div>

                        <div className="col-md-3">
                          <select
                            className="form-select"
                            value={passenger.gender}
                            onChange={(e) =>
                              handleChange(index, "gender", e.target.value)
                            }
                          >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                        </div>

                        <div className="col-md-3">
                          <input
                            className="form-control"
                            placeholder="Seat"
                            value={passenger.seatNumber}
                            disabled
                          />
                        </div>

                        <div className="col-md-12">
                          <input
                            className="form-control"
                            placeholder="Contact Number"
                            value={passenger.contactNumber}
                            onChange={(e) =>
                              handleChange(
                                index,
                                "contactNumber",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="row g-3 mt-2 align-items-end">
                    <div className="col-md-6">
                      <label className="form-label">Payment Mode</label>
                      <select
                        className="form-select"
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                      >
                        <option value="CARD">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="NETBANKING">NETBANKING</option>
                      </select>
                    </div>

                    <div className="col-md-6 text-md-end">
                      <small className="text-muted">Total Amount</small>
                      <h3 className="fw-bold text-primary mb-0">
                        ₹{passengers.length * flight.price}
                      </h3>
                    </div>
                  </div>

                  <button
                    className="btn btn-success w-100 mt-4 py-2 fw-semibold"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
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

export default Booking;
