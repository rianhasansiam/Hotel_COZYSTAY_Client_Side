import { useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const RoomCard = ({ room, alternateLayout }) => {



const [reviews,setReviews]=useState([])
console.log(reviews)


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  const { user } = useContext(AuthContext);
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





useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://assignment-11-server-umber-nine.vercel.app/eachReview/${_id}`); // Fetch room details by ID
      setReviews(response.data);  
    } catch (err) {
      console.log('Data fetching problem', err);  // Log errors if data fetch fails
    }
  };

  if (_id) {
    fetchData();  // Fetch data when component mounts or `id` changes
  }
}, []);

  const navigate=useNavigate()

  if (alternateLayout) {
    return (
      
     
      <div onClick={()=>navigate(`/roomdetails/${_id}`)} className="flex justify-between lg:gap-10 gap-2 h-[450px] items-center shadow-xl p-10 rounded-xl overflow-hidden cursor-pointer">
        <div data-aos="fade-right" className="lg:w-1/3 lg:space-y-14 ">
          <div>
            <p className=" text-sm text-primary font-medium font-jost">
              {roomSize} / {guests} Guests / {beds} Beds
            </p>
          </div>
          <div className=" font-jost">
            <p className="lg:text-4xl text-2xl font-marcellus font-light">
              {type}
            </p>
            <p className=" font-jost">{roomDetail}</p>
            <h1 className="font-semibold text-xl my-0">Review Users: {reviews.length}</h1>
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
            autoplay={{ delay: 2000 }}
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="w-full h-[450px]" src={image} alt="" />
            </SwiperSlide>
            {roomImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <Link to={`/roomdetails/${_id}`}>
                  <img
                    src={imageUrl}
                    alt={`Room ${index + 1}`}
                    className="w-full h-[450px]"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  
    );
  } else {
    return (
      <div onClick={()=>navigate(`/roomdetails/${_id}`)} className="flex justify-between lg:gap-10 gap-2 h-[450px] items-center shadow-xl p-10 rounded-xl overflow-hidden">
        <div data-aos="fade-right" className="lg:w-2/3 w-1/2 ">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation={true}
            autoplay={{ delay: 2000 }}
            loop={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img className="w-full h-[450px]" src={image} alt="" />
            </SwiperSlide>
            {roomImages.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <Link to={`/roomdetails/${_id}`}>
                  <img
                    src={imageUrl}
                    alt={`Room ${index + 1}`}
                    className="w-full h-[450px]"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div data-aos="fade-left" className="lg:w-1/3 w-1/2 lg:space-y-14 ">
          <div>
            <p className=" text-sm text-primary font-medium font-jost">
              {roomSize} / {guests} Guests / {beds} Beds
            </p>
          </div>
          <div className=" font-jost">
            <p className="lg:text-4xl text-2xl font-marcellus font-light">
              {type}
            </p>
            <p className=" font-jost">{roomDetail}</p>
            <h1 className="font-semibold text-xl my-0">Review Users: {reviews.length}</h1>
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
    _id: PropTypes.string,
    type: PropTypes.string,
    pricePerNight: PropTypes.number,
    roomSize: PropTypes.string,
    roomImages: PropTypes.arrayOf(PropTypes.string),
    roomFacility: PropTypes.arrayOf(PropTypes.string),
    guests: PropTypes.number,
    beds: PropTypes.number,
    roomDetail: PropTypes.string,
    image: PropTypes.string,
  }),
  alternateLayout: PropTypes.bool,
};

export default RoomCard;
