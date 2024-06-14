import { Navigate, Outlet } from "react-router-dom";

const LogInRoute = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/log_in" />;
  else return <Outlet />;
};

export default LogInRoute;
