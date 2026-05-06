import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/AdminDashboard";
import ManageFlights from "../pages/ManageFlights";
import AddFlight from "../pages/AddFlight";
import ManageBookings from "../pages/ManageBookings";
import ViewPassengers from "../pages/ViewPassengers";

function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="flights" element={<ManageFlights />} />
      <Route path="add-flight" element={<AddFlight />} />
      <Route path="bookings" element={<ManageBookings />} />
      <Route path="passengers" element={<ViewPassengers />} />
    </Routes>
  );
}

export default AdminRoutes;
