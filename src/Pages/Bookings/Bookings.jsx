import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
import Cart from "../Cart/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import PageTitle from "../../Components/PageTitle/PageTitle";


import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";

const Bookings = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      const url = `https://assignment-11-server-umber-nine.vercel.app/bookings?email=${user.email}`;
      
      axios.get(url, { withCredentials: true })
        .then((res) => setBookings(res.data))
        .catch(err => console.error('Error fetching bookings:', err));
    }
  }, [user]);




  // const handleDelete = (id) => {
  //   fetch(`https://assignment-11-server-umber-nine.vercel.app/bookings/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.deletedCount > 0) {
  //         toast.success("Deleted successfully");
  //         const remaining = bookings.filter((booking) => booking._id !== id);
  //         setBookings(remaining);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting booking:", error);
  //       toast.error("An error occurred while deleting the booking.");
  //     });
  // };




  
  
  const handleCancel = (id) => {

   Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // If user clicks "Yes, delete it!"
      const deleteUrl = `https://assignment-11-server-umber-nine.vercel.app/booking/cancle/${id}`;

      axios
        .delete(deleteUrl)
        .then((response) => {
          if (response.data.deletedCount > 0) {
            toast.success("Deleted successfully");
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          toast.error("An error occurred while deleting the booking.");
        });
    } else {
      // User clicked "Cancel", so no deletion is performed
      Swal.fire("Cancelled", "Your booking is safe", "error");
    }
  });
  };



  return (
    <div className="min-h-[calc(100vh-327px)]">
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
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Cart
                key={booking._id}
                booking={booking}
                handleCancel={handleCancel}
              ></Cart>
            ))
          ) : (
            <p>No bookings found</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bookings;
