import { useEffect, useState } from "react";
import axios from "axios";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8080/booking");
      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Booking History</h2>

      <div className="row">
        {bookings.map((booking) => (
          <div className="col-md-6 mb-4" key={booking.id}>
            <div className="card shadow-sm p-3">

              <h5>Booking ID: {booking.id}</h5>
              <p>Status: {booking.status}</p>

              <h6>Passengers:</h6>
              <ul>
                {booking.passengers.map((p, i) => (
                  <li key={i}>
                    {p.name} ({p.age}) - Seat {p.seatNumber}
                  </li>
                ))}
              </ul>

              <h6>Flight:</h6>
              <p>
                {booking.flight.source} → {booking.flight.destination}
              </p>

              <h6>Payment:</h6>
              <p>₹{booking.payment.amount}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;