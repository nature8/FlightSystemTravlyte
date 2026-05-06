import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import Footer from "../../components/common/Footer";

function ViewPassengers() {
  const navigate = useNavigate();

  const [passengers, setPassengers] = useState([]);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/passenger");
      setPassengers(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch passengers");
    } finally {
      setLoading(false);
    }
  };

  const deletePassenger = async (id) => {
    if (!confirm("Are you sure you want to delete this passenger?")) return;

    try {
      await API.delete(`/passenger/${id}`);
      alert("Passenger deleted successfully");
      fetchPassengers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete passenger");
    }
  };

  const handleChange = (e) => {
    setEditingPassenger({
      ...editingPassenger,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassenger = async (e) => {
    e.preventDefault();

    try {
      await API.put("/passenger", {
        ...editingPassenger,
        age: Number(editingPassenger.age),
      });

      alert("Passenger updated successfully");
      setEditingPassenger(null);
      fetchPassengers();
    } catch (err) {
      console.error(err);
      alert("Failed to update passenger");
    }
  };

  const filteredPassengers = useMemo(() => {
    return passengers.filter((passenger) => {
      const text = [
        passenger.id,
        passenger.name,
        passenger.age,
        passenger.gender,
        passenger.contactNumber,
        passenger.seatNumber,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [passengers, search]);

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

              <h2 className="fw-bold text-white mb-1">Passenger</h2>
              <p className="text-white-50 mb-0">
                View, search, update, and delete passenger information.
              </p>
            </div>

            <button className="btn btn-outline-light mt-5" onClick={fetchPassengers}>
              Refresh
            </button>
          </div>

          {editingPassenger && (
            <div
              className="card border-0 shadow-lg mb-4"
              style={{
                borderRadius: "16px",
                background: "rgba(255,255,255,0.94)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Edit Passenger</h4>

                <form onSubmit={updatePassenger}>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={editingPassenger.name || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-2">
                      <label className="form-label">Age</label>
                      <input
                        className="form-control"
                        name="age"
                        type="number"
                        value={editingPassenger.age || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select"
                        name="gender"
                        value={editingPassenger.gender || "MALE"}
                        onChange={handleChange}
                      >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                    </div>

                    <div className="col-md-3">
                      <label className="form-label">Seat Number</label>
                      <input
                        className="form-control"
                        name="seatNumber"
                        value={editingPassenger.seatNumber || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Contact Number</label>
                      <input
                        className="form-control"
                        name="contactNumber"
                        value={editingPassenger.contactNumber || ""}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setEditingPassenger(null)}
                    >
                      Cancel
                    </button>

                    <button className="btn btn-success px-4" type="submit">
                      Update Passenger
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                    placeholder="Search by name, contact, seat, gender, age..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="col-md-4 text-md-end">
                  <span className="badge bg-primary px-3 py-2">
                    {filteredPassengers.length} Passengers
                  </span>
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
                  <h5 className="mt-3">Loading passengers...</h5>
                </div>
              ) : filteredPassengers.length === 0 ? (
                <div className="alert alert-info m-4">No passengers found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Passenger</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Contact</th>
                        <th>Seat</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPassengers.map((passenger) => (
                        <tr key={passenger.id}>
                          <td>
                            <span className="badge bg-light text-dark border">
                              {passenger.id}
                            </span>
                          </td>

                          <td className="fw-bold">{passenger.name}</td>
                          <td>{passenger.age}</td>
                          <td>{passenger.gender}</td>
                          <td>{passenger.contactNumber}</td>

                          <td>
                            <span className="badge bg-dark px-3 py-2">
                              {passenger.seatNumber}
                            </span>
                          </td>

                          <td className="text-end">
                            <button
                              className="btn btn-outline-warning btn-sm me-2"
                              onClick={() => setEditingPassenger(passenger)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deletePassenger(passenger.id)}
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

export default ViewPassengers;
