import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  Landing,
  Register,
  Login,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginaction } from "./pages/Login";
import { action as addjobaction } from "./pages/AddJob";
import { loader as dashboardloader } from "./pages/DashboardLayout";
import { loader as getalljobsloader } from "./pages/AllJobs";
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const route = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      { path: "login", Component: Login, action: loginaction },
      {
        path: "dashboard",
        loader: dashboardloader,
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobaction,
          },
          { path: "stats", element: <Stats /> },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: getalljobsloader,
          },

          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={route}></RouterProvider>;
};

export default App;
