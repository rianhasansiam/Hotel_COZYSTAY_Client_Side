import PropTypes from "prop-types";
import CartModal from "./cartModal";
import ReviewModal from "./reviewModal";
import { Link } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Cart = ({ booking, handleDelete, handleCancel }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  // Ensure booking is available
  if (!booking) {
    return <div>No booking details available.</div>; // Fallback if booking is undefined
  }

  const {
    _id,
    checkInDate,
    checkOutDate,
    numRooms,
    numAdults,
    totalCost,
    type,
    image,
    pricePerNight,
  } = booking;

  // Function to format ISO date string into readable date
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Formats date in user's local time zone
  };

  return (
    <div>
      <div className="lg:flex md:flex grid grid-cols-1 justify-between gap-4 items-center md:px-10 lg:px-24">
        <div
          data-aos="fade-right"
          className="flex justify-center items-center gap-3"
        >
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={image} alt={type} />
            </div>
          </div>
        </div>
        <div
          data-aos="fade-right"
          className="text-center md:text-left lg:text-left mt-4"
        >
          <p className=" font-marcellus text-2xl">{type}</p>
          <p>
            <span className=" font-roboto font-medium">Date:</span>{" "}
            {formatDate(checkInDate)} - {formatDate(checkOutDate)}
          </p>
          <p>
            <span className="font-roboto font-medium">Details:</span> Rooms:{" "}
            {numRooms}, Adults: {numAdults}
          </p>
        </div>
        <div
          data-aos="fade-left"
          className="flex items-center justify-center mt-4 md:gap-2 gap-4"
        >
          <p>
            <span className="font-semibold">Price Per Night:</span> $
            {pricePerNight}
          </p>
          <p>
            <span className="font-semibold">Num Rooms:</span> {numRooms}
          </p>
          <p>
            <span className="font-semibold">Total Cost:</span> ${totalCost}
          </p>
        </div>
        <div
          data-aos="fade-left"
          className="flex md:grid grid-cols-2 justify-center items-center mt-4 gap-4"
        >
          <ReviewModal booking={booking}></ReviewModal>
          <button
            onClick={() => handleCancel(_id)}
            className="btn btn-sm bg-red-600 text-white"
          >
            Cancel
          </button>
          <Link to={`/update/${_id}`}>
            <button className="btn btn-sm bg-secondary text-white">
              Update
            </button>
          </Link>
          <CartModal booking={booking} handleDelete={handleDelete}></CartModal>
        </div>
      </div>
      <div className="divider divider-secondary"></div>
    </div>
  );
};

Cart.propTypes = {
  booking: PropTypes.shape({
    _id: PropTypes.string,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
    numRooms: PropTypes.number,
    numAdults: PropTypes.number,
    totalCost: PropTypes.number,
    type: PropTypes.string,
    image: PropTypes.string,
    pricePerNight: PropTypes.number,
  }),
  handleDelete: PropTypes.func,
  handleCancel: PropTypes.func, // Added this for completeness
};

export default Cart;
