import { useContext, useEffect, useState } from "react";
import moment from "moment"; // Import moment library for date manipulation
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Cart from "../../Pages/Cart/Cart";

const BookingTestPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch user's bookings
    fetch(
      `https://assignment-11-server-umber-nine.vercel.app/bookings?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [user]);

  const handleDelete = (id, checkInDate) => {
    const cancellationDeadline = moment(checkInDate).subtract(1, "days");
    const currentDate = moment();

    // Check if current date is before the cancellation deadline
    if (currentDate.isBefore(cancellationDeadline)) {
      // Proceed with cancellation
      fetch(
        `https://assignment-11-server-umber-nine.vercel.app/bookings/${id}/cancel`,
        {
          method: "POST",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Booking canceled successfully") {
            // Remove canceled booking from state
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
            alert("Booking canceled successfully.");
          } else {
            alert("Failed to cancel booking. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error canceling booking:", error);
          alert("An error occurred while canceling the booking.");
        });
    } else {
      alert(
        "You cannot cancel this booking because the cancellation deadline has passed."
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-327px)] flex justify-center gap-10 my-20">
      <div className="">
        <div className=" relative mb-10">{/* Room images */}</div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* Table headers */}
            <thead>
              <tr className=" text-black">{/* Table headers */}</tr>
            </thead>
            <tbody>
              {/* Map over bookings */}
              {bookings.map((booking) => (
                <Cart 
                  key={booking._id}
                  booking={booking}
                  handleDelete={handleDelete}
                ></Cart>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingTestPage;
