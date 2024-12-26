// import { createBrowserRouter } from "react-router-dom";
// import Main from "../Layout/Main";
// import Home from "../Pages/Home/Home";
// import Error from "../Shared/Error/Error";
// import Login from "../Pages/Login/Login";
// import Registration from "../Pages/Registration/Registration";
// import AboutUs from "../Pages/AboutUs/AboutUs";
// import ContactUs from "../Pages/ContactUs/ContactUs";
// import Room from "../Pages/Room/Room";
// import Bookings from "../Pages/Bookings/Bookings";
// import RoomDetails from "../Pages/RoomDetails/RoomDetails";
// import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
// import BookRoom from "../Pages/BookRoom/BookRoom";
// import Cart from "../Pages/Cart/Cart";
// import BookingsUpdate from "../Components/update/BookingsUpdate";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <Error></Error>,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/room",
//         element: <Room></Room>,
//         loader: () =>
//           fetch("https://assignment-11-server-umber-nine.vercel.app/rooms"),
//       },

//       {
//         path: "/booking",
//         element: (
//           <PrivateRoute>
//             <Bookings></Bookings>
//           </PrivateRoute>
//         ),
//         loader: () =>
//           fetch("https://assignment-11-server-umber-nine.vercel.app/rooms"),
//       },
//       {
//         path: "/update/:id",
//         element: <BookingsUpdate></BookingsUpdate>,
//         loader: ({ params }) =>
//           fetch(
//             `https://assignment-11-server-umber-nine.vercel.app/bookings/${params.id}`
//           ),
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/register",
//         element: <Registration></Registration>,
//       },
//       {
//         path: "/about",
//         element: <AboutUs></AboutUs>,
//       },
//       {
//         path: "/contact",
//         element: <ContactUs></ContactUs>,
//       },
//       {
//         path: "/roomdetails/:id",
//         element: (
//           <PrivateRoute>
//             <RoomDetails></RoomDetails>
//           </PrivateRoute>
//         ),
//         loader: ({ params }) =>
//           fetch(
//             `https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`
//           ),
//       },
//       {
//         path: "/details/:id",
//         element: <RoomDetails></RoomDetails>,
//         loader: ({ params }) =>
//           fetch(
//             `https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`
//           ),
//       },
//       {
//         path: "/bookroom/:id",
//         element: <BookRoom></BookRoom>,
//         loader: ({ params }) =>
//           fetch(
//             `https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`
//           ),
//       },
//       {
//         path: "/cart/:id",
//         element: <Cart></Cart>,
//         loader: ({ params }) =>
//           fetch(
//             `https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`
//           ),
//       },
//     ],
//   },
// ]);

// export default router;











import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Error from "../Shared/Error/Error";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Room from "../Pages/Room/Room";
import Bookings from "../Pages/Bookings/Bookings";
import RoomDetails from "../Pages/RoomDetails/RoomDetails";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import BookRoom from "../Pages/BookRoom/BookRoom";
import Cart from "../Pages/Cart/Cart";
import BookingsUpdate from "../Components/update/BookingsUpdate";

// Router definition
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room",
        element: <Room></Room>,
        loader: () =>
          fetch("https://assignment-11-server-umber-nine.vercel.app/rooms")
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch rooms');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Bookings></Bookings>
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://assignment-11-server-umber-nine.vercel.app/rooms")
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch rooms');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
      {
        path: "/update/:id",
        element: <BookingsUpdate></BookingsUpdate>,
        loader: ({ params }) =>
          fetch(`https://assignment-11-server-umber-nine.vercel.app/bookings/${params.id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch booking details');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Registration></Registration>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/roomdetails/:id",
        element: (
          <PrivateRoute>
            <RoomDetails></RoomDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch room details');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
      {
        path: "/bookroom/:id",
        element: (
          <PrivateRoute>
            <BookRoom></BookRoom>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch room details');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
      {
        path: "/cart/:id",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://assignment-11-server-umber-nine.vercel.app/rooms/${params.id}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Failed to fetch room details');
              }
              return res.json();
            })
            .catch((error) => {
              console.error(error);
              return { error: error.message };
            }),
      },
    ],
  },
]);

export default router;
