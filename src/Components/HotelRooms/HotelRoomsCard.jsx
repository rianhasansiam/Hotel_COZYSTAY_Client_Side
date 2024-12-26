import { GoPeople } from "react-icons/go";
import { IoBedOutline } from "react-icons/io5";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

import Aos from "aos";
import "aos/dist/aos.css";

const HotelRoomsCard = ({ room }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  const {
    _id,
    type,
    pricePerNight,
    roomSize,
    image,
    description,
    guests,
    beds,
  } = room;

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 15) {
      return words.slice(0, 15).join(" ") + "...";
    }
    return description;
  };

  return (
    <div data-aos="fade-up">
      <div className="card card-compact bg-primary text-white shadow-xl">
        <figure className=" relative">
          <img src={image} alt="Room" />
          <div className="absolute left-6 top-6 bg-primary p-2">
            <p data-aos="fade-up" className=" text-sm">
              ${pricePerNight} / NIGHT
            </p>
          </div>
        </figure>
        <div className="card-body space-y-4">
          <h2
            data-aos="fade-up"
            className="card-title font-marcellus text-2xl font-light"
          >
            {type}
          </h2>
          <div data-aos="fade-up" className=" flex font-roboto">
            <p className="flex items-center gap-4">
              <span className=" text-lg">
                <SlSizeFullscreen />
              </span>
              {roomSize}
            </p>
            <p className="flex items-center gap-4">
              <span className=" text-xl">
                <GoPeople />
              </span>
              {guests} Guests
            </p>
            <p className="flex items-center gap-4">
              <span className=" text-xl">
                <IoBedOutline />
              </span>
              {beds} Beds
            </p>
          </div>
          <p data-aos="fade-up">{truncateDescription(description)}</p>
          <Link to={`/roomdetails/${_id}`}>
            <button
              data-aos="fade-up"
              className="btn btn-secondary  text-white"
            >
              Book Now
              <span className=" text-xl">
                <MdKeyboardDoubleArrowRight />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// HotelRoomsCard.propTypes = {
//   room: PropTypes.shape({
//     _id: PropTypes.string,
//     type: PropTypes.string,
//     pricePerNight: PropTypes.number,
//     roomSize: PropTypes.string,
//     image: PropTypes.string,
//     description: PropTypes.string,
//     guests: PropTypes.number,
//     beds: PropTypes.number,
//   }).isRequired,
// };

export default HotelRoomsCard;
