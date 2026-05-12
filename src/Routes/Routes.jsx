import { createBrowserRouter } from "react-router-dom";
import BookingsUpdate from "../Components/update/BookingsUpdate";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Main from "../Layout/Main";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Bookings from "../Pages/Bookings/Bookings";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Room from "../Pages/Room/Room";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import Error from "../Shared/Error/Error";

const loadBookingGroup = async (id) => {
  const response = await fetch(
    `https://assignment-11-server-umber-nine.vercel.app/bookings/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch booking details");
  }

  return response.json();
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: <BookingsUpdate />,
        loader: ({ params }) => loadBookingGroup(params.id),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/roomdetails/:id",
        element: (
          <PrivateRoute>
            <RoomDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <RoomDetails />,
      },
    ],
  },
]);

export default router;
