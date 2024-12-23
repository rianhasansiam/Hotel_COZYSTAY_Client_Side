import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { contextData } from "../Contex";
// import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

const UpdateEdit = ({ _id }) => {
  const { user } = useContext(contextData);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "https://hotel-booking-server-lake.vercel.app/bookings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        // Filter bookings by user's email
        const filteredBookings = data.filter(
          (booking) => booking.email === user?.email
        );
        setBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();

    return () => {};
  }, [user]);

  const isMatchingId = bookings.some((booking) => booking.room_id === _id);

  return (
    <div>
      {isMatchingId && (
        <div
          data-aos="fade-up"
          className="flex justify-between items-center gap-4"
        >
          <Link to={`/update/${_id}`}>
            <button className="btn btn-secondary text-white mb-5">
              Update
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

// Add PropTypes validation for _id
UpdateEdit.propTypes = {
  _id: PropTypes.string.isRequired,
};

export default UpdateEdit;
