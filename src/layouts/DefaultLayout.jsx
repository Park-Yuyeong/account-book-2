import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";

const DefaultLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
