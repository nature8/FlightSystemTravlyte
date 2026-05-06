
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/admin-login");

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
