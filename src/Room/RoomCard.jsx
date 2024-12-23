import { useContext, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import PropTypes from "prop-types";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

import Aos from "aos";
import "aos/dist/aos.css";
import { contextData } from "../Contex";

const RoomCard = ({ room, alternateLayout }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  const { user } = useContext(contextData);
  const {
    _id,
    type,
    pricePerNight,
    roomSize,
    roomImages,
    roomFacility,
    guests,
    beds,
    roomDetail,
    image,
  } = room;

  if (alternateLayout) {
    return (
      <div className="flex justify-between lg:gap-10 gap-2 h-[450px] items-center ">
        <div data-aos="fade-right" className="lg:w-1/3 lg:space-y-14 ">
          <div>
            <p className=" text-sm text-primary font-medium font-jost">
              {roomSize} / {guests} Guests / {beds} Beds
            </p>
          </div>
          <div className=" font-jost space-y-2">
            <p className="lg:text-4xl text-2xl font-marcellus font-light">
              {type}
            </p>
            <p className=" font-jost">{roomDetail}</p>
          </div>
          <div>
            {roomFacility && (
              <ul>
                {roomFacility.map((facility, index) => (
                  <li className="flex items-center gap-2 font-jost" key={index}>
                    <span className="text-sm text-secondary">
                      <TiPlus />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:flex items-center mt-4 gap-6">
            {user ? (
              <Link to={`/roomdetails/${_id}`}>
                <button className="btn btn-primary text-white font-marcellus">
                  Room Details
                </button>
              </Link>
            ) : (
              <Link to={`/details/${_id}`}>
                <button className="btn btn-primary text-white font-marcellus">
                  Room Details
                </button>
              </Link>
            )}
            <p className=" font-marcellus text-secondary text-xl">
              From ${pricePerNight}/Night
            </p>
          </div>
        </div>
        <div data-aos="fade-left" className="lg:w-2/3 w-1/2">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            //   autoplay={{ delay: 2000 }}
            loop={true}
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="mySwiper"
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <img className="w-full h-[450px]" src={image} alt="" />
            </SwiperSlide>
            {/* {roomImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                {user ? (
                  <Link to={`/roomdetails/${_id}`}>
                    <img
                      src={imageUrl}
                      alt={`Room ${index + 1}`}
                      className="w-full h-[450px]"
                    />
                  </Link>
                ) : (
                  <Link to={`/details/${_id}`}>
                    <img
                      src={imageUrl}
                      alt={`Room ${index + 1}`}
                      className="w-full h-[450px]"
                    />
                  </Link>
                )}
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between lg:gap-10 gap-2 h-[450px] items-center ">
        <div data-aos="fade-right" className="lg:w-2/3 w-1/2 ">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            //   autoplay={{ delay: 2000 }}
            loop={true}
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="mySwiper"
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <img className="w-full h-[450px]" src={image} alt="" />
            </SwiperSlide>
            {/* {roomImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <Link to={`/roomdetails/${_id}`}>
                  <img
                    src={imageUrl}
                    alt={`Room ${index + 1}`}
                    className="w-full h-[450px]"
                  />
                </Link>
              </SwiperSlide>
            ))} */}
          </Swiper>
        </div>
        <div data-aos="fade-left" className="lg:w-1/3 w-1/2 lg:space-y-14 ">
          <div>
            <p className=" text-sm text-primary font-medium font-jost">
              {roomSize} / {guests} Guests / {beds} Beds
            </p>
          </div>
          <div className=" font-jost space-y-2">
            <p className="lg:text-4xl text-2xl font-marcellus font-light">
              {type}
            </p>
            <p className=" font-jost">{roomDetail}</p>
          </div>
          <div>
            {roomFacility && (
              <ul>
                {roomFacility.map((facility, index) => (
                  <li className="flex items-center gap-2 font-jost" key={index}>
                    <span className="text-sm text-secondary">
                      <TiPlus />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="lg:flex items-center mt-4 gap-6">
            <Link to={`/roomdetails/${_id}`}>
              <button className="btn btn-primary text-white font-marcellus">
                Room Details{" "}
              </button>
            </Link>

            <p className=" font-marcellus text-secondary text-xl">
              From ${pricePerNight}/Night
            </p>
          </div>
        </div>
      </div>
    );
  }
};

RoomCard.propTypes = {
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pricePerNight: PropTypes.number.isRequired, // Add validation for pricePerNight
    roomSize: PropTypes.string.isRequired,
    roomImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    roomFacility: PropTypes.arrayOf(PropTypes.string),
    availability: PropTypes.bool,
    image: PropTypes.string,
    specialOffers: PropTypes.bool,
    guests: PropTypes.number.isRequired,
    beds: PropTypes.number.isRequired,
    roomDetail: PropTypes.string,
  }),
  alternateLayout: PropTypes.bool,
};

export default RoomCard;
