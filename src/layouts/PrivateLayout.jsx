import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function PrivateLayout() {
  const credential = localStorage.getItem("login");

  const navigate = useNavigate();

  useEffect(() => {
    if (!credential) return navigate("/");
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PrivateLayout;
