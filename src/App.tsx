import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import Merchants from "./pages/merchants";
import Home from "./pages/home";
import NewMerchant from "./pages/new-merchant";
import { ToastContainer } from "react-toastify";
import Merchant from "./pages/merchant";
import Businesses from "./pages/businesses";
import Clients from "./pages/clients";
import Business from "./pages/business";
import { useAuth } from "./context/AuthProvider";
import Login from "./pages/login";
import ReviewSchedule from "./pages/review-schedule";

function App() {
  const auth = useAuth();

  return (
    <>
      {auth?.isAuthenticated && auth?.user?.role?.includes("admin") && (
        <Routes>
          <Route element={<IndexPage />}>
            <Route element={<Home />} path="/" />
            <Route path="/merchants" element={<Merchants />}>
              <Route path="new" element={<NewMerchant />} />
            </Route>
            <Route path="/merchants/:id" element={<Merchant />} />
            <Route element={<Businesses />} path="/businesses" />
            <Route element={<Business />} path="/businesses/:id" />
            <Route path="/clients" element={<Clients />} />
            <Route path="/review-schedule" element={<ReviewSchedule />} />
          </Route>
        </Routes>
      )}

      {auth?.isAuthenticated && auth?.user?.role === "merchant" && (
        <Routes>
          <Route element={<IndexPage />}>
            <Route path="/" element={<Home />} />
            <Route>
              <Route element={<Businesses />} path="/businesses" />
              <Route element={<Business />} path="/businesses/:id" />
              <Route path="/clients" element={<Clients />} />
              <Route path="/review-schedule" element={<ReviewSchedule />} />
              <Route path="/google-reviews" element={"google review"} />
            </Route>
          </Route>
        </Routes>
      )}

      {!auth?.isAuthenticated && (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
