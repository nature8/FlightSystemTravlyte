import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-white">
      <div className="container py-5">
        <div className="row gy-4 align-items-start">
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">Travlyte</h4>
            <p className="text-white-50 mb-0" style={{ lineHeight: "1.8" }}>
              Search flights, choose seats, and complete bookings with a smooth
              travel experience.
            </p>
          </div>

          <div className="col-md-4 text-md-center">
            <h4 className="fw-bold mb-3">Travel</h4>
            <ul className="list-unstyled mb-0">
              <li className="mb-3">
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none footer-link"
                >
                  Available Flights
                </Link>
              </li>

              <li className="mb-3">
                <span className="text-white-50">Seat Selection</span>
              </li>

              <li>
                <span className="text-white-50">Secure Booking</span>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-md-end">
            <h4 className="fw-bold mb-3">Support</h4>
            <p className="text-white-50 mb-3">support@flightbooking.com</p>
            <p className="text-white-50 mb-3">+91 98765 43210</p>
            <p className="text-white-50 mb-0">Available 24/7</p>
          </div>
        </div>

        <div
          className="mt-5 pt-4 text-center text-white-50"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          © 2026 Travlyte. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
