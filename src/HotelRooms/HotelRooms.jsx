import { useEffect, useState } from "react";
// import HotelRoomsCard from "./HotelRoomsCard";
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

import Aos from "aos";
import "aos/dist/aos.css";
import HotelRoomsCard from "./HotelRoomsCard";

const HotelRooms = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("https://hotel-booking-server-lake.vercel.app/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <div className=" my-10">
      <div className=" text-center lg:w-2/4 md:w-3/5 mx-auto space-y-5">
        <p data-aos="fade-down" className=" font-roboto font-medium">
          WELCOME TO COZYSTAY LODGE
        </p>
        <p
          data-aos="fade-right"
          className=" font-marcellus md:text-2xl lg:text-5xl text-primary"
        >
          Select Your Cozy Room
        </p>
        <p data-aos="fade-up" className=" font-roboto">
          In a new setting composed of exceptional hotels chalets, nestled in a
          forest of pine trees, the CozyStay Lodge is expanding into a
          harmonious and refined unit that affirms it’s purpose: to sublimate
          the stay of its guests by a tailor-made service.
        </p>
      </div>
      <div data-aos="fade-up" className="container mx-auto my-10 ">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          autoplay={{ delay: 5000 }}
          loop={true}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          className="mySwiper"
          breakpoints={{
            // When window width is >= 769px
            769: {
              slidesPerView: 3,
            },
            // When window width is >= 426px and < 769px
            426: {
              slidesPerView: 2,
            },
            // When window width is < 426px
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {rooms.map((room) => (
            <SwiperSlide key={room._id}>
              <HotelRoomsCard key={room._id} room={room}></HotelRoomsCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HotelRooms;
