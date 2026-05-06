
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Flights from "./pages/Flights";
import UserFlights from "./pages/UserFlights";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import Booking from "./pages/Booking";
import Success from "./pages/Success";
import Profile from "./pages/Profile";


import AdminRoutes from "./admin/routes/AdminRoutes";
import AdminLogin from "./admin/pages/AdminLogin";

function ProtectedUserRoute({ children }) {
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  return isUserLoggedIn ? children : <Navigate to="/login" replace />;
}

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdminLoggedIn ? children : <Navigate to="/admin-login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Flights />} />

          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />

          <Route
            path="/user/flights"
            element={
              <ProtectedUserRoute>
                <UserFlights />
              </ProtectedUserRoute>
            }
          />

          <Route
            path="/booking/:id"
            element={
              <ProtectedUserRoute>
                <Booking />
              </ProtectedUserRoute>
            }
          />

          <Route path="/success" element={<Success />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminRoutes />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;


