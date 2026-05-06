import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFlights } from "../api/flightApi";
import Footer from "../components/common/Footer";

const cityAliases = {
  blr: "bangalore",
  bengaluru: "bangalore",
  banglore: "bangalore",
  bangalore: "bangalore",
  del: "delhi",
  ncr: "delhi",
  delhi: "delhi",
  bom: "mumbai",
  mum: "mumbai",
  mumbai: "mumbai",
  maa: "chennai",
  chn: "chennai",
  chennai: "chennai",
  hyd: "hyderabad",
  hyderabad: "hyderabad",
  ccu: "kolkata",
  kol: "kolkata",
  kolkata: "kolkata",
  jai: "jaipur",
  jpr: "jaipur",
  jaipur: "jaipur",
  pnq: "pune",
  pune: "pune",
  goi: "goa",
  goa: "goa",
  amd: "ahmedabad",
  ahmedabad: "ahmedabad",
};

const normalizeCity = (value) => {
  if (!value) return "";
  const cleaned = value.trim().toLowerCase();
  return cityAliases[cleaned] || cleaned;
};

function UserFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    source: "",
    destination: "",
    date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await getAllFlights();

      const validFlights = (res.data.data || []).filter(
        (flight) =>
          flight &&
          flight.id &&
          flight.airline &&
          flight.source &&
          flight.destination
      );

      setFlights(validFlights);
    } catch (err) {
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isUserLoggedIn");
    navigate("/", { replace: true });
  };

  const handleSearchChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const clearSearch = () => {
    setSearchData({
      source: "",
      destination: "",
      date: "",
    });
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not available";

    return new Date(dateTime).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getFlightDate = (dateTime) => {
    if (!dateTime) return "";
    return new Date(dateTime).toISOString().split("T")[0];
  };

  const filteredFlights = useMemo(() => {
    return flights.filter((flight) => {
      const flightSource = normalizeCity(flight.source);
      const flightDestination = normalizeCity(flight.destination);
      const searchedSource = normalizeCity(searchData.source);
      const searchedDestination = normalizeCity(searchData.destination);

      const sourceMatch =
        !searchedSource || flightSource.includes(searchedSource);

      const destinationMatch =
        !searchedDestination || flightDestination.includes(searchedDestination);

      const dateMatch =
        !searchData.date ||
        getFlightDate(flight.departureTime) === searchData.date;

      return sourceMatch && destinationMatch && dateMatch;
    });
  }, [flights, searchData]);

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
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.62))",
          zIndex: 1,
        }}
      />

      <div
        className="position-relative"
        style={{ zIndex: 2, paddingTop: "120px", paddingBottom: "30px" }}
      >
        <div className="container">
          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-outline-light text-nowrap"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="text-center text-white mb-5">
            <h1 className="fw-bold display-5 mb-2">
              Welcome Back
            </h1>
            <p className="lead mb-0">
              Search flights and continue to booking.
            </p>
          </div>

          <div
            className="card border-0 shadow-lg mb-5"
            style={{
              borderRadius: "18px",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="card-body p-4">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Source</label>
                  <input
                    type="text"
                    name="source"
                    className="form-control"
                    placeholder="City or code, e.g. BLR"
                    value={searchData.source}
                    onChange={handleSearchChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">Destination</label>
                  <input
                    type="text"
                    name="destination"
                    className="form-control"
                    placeholder="City or code, e.g. BOM"
                    value={searchData.destination}
                    onChange={handleSearchChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-semibold">Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={searchData.date}
                    onChange={handleSearchChange}
                  />
                </div>

                <div className="col-md-3 d-flex gap-2">
                  <button className="btn btn-primary w-100" type="button">
                    Search
                  </button>

                  <button
                    className="btn btn-outline-secondary text-nowrap"
                    type="button"
                    onClick={clearSearch}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-white mt-5">
              <div className="spinner-border text-light"></div>
              <h5 className="mt-3">Loading available flights...</h5>
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="alert alert-info text-center">
              No flights found for your search.
            </div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {filteredFlights.map((flight) => (
                <FlightRow
                  key={flight.id}
                  flight={flight}
                  formatDateTime={formatDateTime}
                  onBook={() => navigate(`/booking/${flight.id}`)}
                />
              ))}
            </div>
          )}

          <div className="mt-5">
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}

function FlightRow({ flight, formatDateTime, onBook }) {
  return (
    <div
      className="card border-0 shadow-lg"
      style={{
        borderRadius: "16px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="card-body p-4">
        <div className="row align-items-center gy-3">
          <div className="col-lg-2 col-md-3">
            <h4 className="fw-bold mb-1">{flight.airline}</h4>
          </div>

          <div className="col-lg-3 col-md-4">
            <div className="d-flex align-items-center gap-4">
              <div>
                <small className="text-muted">From</small>
                <h5 className="mb-0 fw-semibold">{flight.source}</h5>
              </div>

              <div className="fw-bold text-primary">→</div>

              <div>
                <small className="text-muted">To</small>
                <h5 className="mb-0 fw-semibold">{flight.destination}</h5>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <small className="text-muted">Departure</small>
            <div className="fw-semibold">
              {formatDateTime(flight.departureTime)}
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <small className="text-muted">Arrival</small>
            <div className="fw-semibold">
              {formatDateTime(flight.arrivalTime)}
            </div>
          </div>

          <div className="col-lg-1 col-md-2">
            <small className="text-muted">Seats</small>
            <div className="fw-semibold">{flight.totalSeats || "N/A"}</div>
          </div>

          <div className="col-lg-1 col-md-3">
            <small className="text-muted">Price</small>
            <div className="fw-bold text-primary fs-5">₹{flight.price}</div>
          </div>

          <div className="col-lg-1 col-md-3 text-lg-end">
            <button className="btn btn-primary px-4 text-nowrap" onClick={onBook}>
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFlights;
