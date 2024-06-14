import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import MyPage from "../pages/MyPage";
import SignUp from "../pages/SignUp";
import LogInRoute from "./LogInRoute";

const router = createBrowserRouter([
  {
    element: <LogInRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/detail/:id",
            element: <Detail />,
          },
          {
            path: "/my_page",
            element: <MyPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/log_in",
    element: <LogIn />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
  },
]);

export default router;
