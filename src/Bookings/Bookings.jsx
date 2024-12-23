import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
// import Cart from "../Cart/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import PageTitle from "../../Components/PageTitle/PageTitle";

import Aos from "aos";
import "aos/dist/aos.css";

import { contextData } from "../Contex";
import PageTitle from "../PageTitle/PageTitle";
import Cart from "../Cart/Cart";

const Bookings = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const { user } = useContext(contextData);
  const [bookings, setBookings] = useState([]);

  const url = `https://hotel-booking-server-lake.vercel.app/bookings?email=${user?.email}`;

  useEffect(() => {
    axios.get(url, { withCredentials: true }).then((res) => {
      setBookings(res.data);
    });
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => setBookings(data));
  }, [url]);

  const handleDelete = (id) => {
    // Proceed with deletion directly
    fetch(`https://hotel-booking-server-lake.vercel.app/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          // alert("Deleted successfully");
          toast.success("Deleted successfully");
          // Remove the deleted booking from the state
          const remaining = bookings.filter((booking) => booking._id !== id);
          setBookings(remaining);
        }
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        // alert("An error occurred while deleting the booking.");
        toast.error("An error occurred while deleting the booking.");
      });
  };

  const handleCancel = (id) => {
    // Proceed with cancellation request
    fetch(
      `https://hotel-booking-server-lake.vercel.app/bookings/${id}/cancel`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Booking canceled successfully") {
          // Update bookings state to remove canceled booking
          const updatedBookings = bookings.filter(
            (booking) => booking._id !== id
          );
          setBookings(updatedBookings);
          // alert("Booking canceled successfully.");
          toast.success("Booking cancel successfully");
        } else {
          // alert("Failed to cancel booking. Please try again later.");
          toast.error("Failed to cancel booking");
        }
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        // alert("An error occurred while canceling the booking.");
        toast.error("An error occurred while canceling the booking.");
      });
  };

  return (
    <div className="min-h-[calc(100vh-327px)] ">
      <PageTitle title="Bookings"></PageTitle>
      <div
        className="hero h-[450px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/Kzmm40K/pexels-quang-nguyen-vinh-222549-14036250.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1
              data-aos="fade-right"
              className="mb-5 text-5xl font-bold text-white font-marcellus"
            >
              Your Bookings Here
            </h1>
            <p data-aos="fade-left" className="mb-5 text-white font-jost">
              A luxury boutique hotel in the heart of wine country
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-8">
        <div>
          <div className="divider divider-secondary"></div>
          {bookings.map((booking) => (
            <Cart
              key={booking._id}
              booking={booking}
              handleDelete={handleDelete}
              handleCancel={handleCancel}
            ></Cart>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
