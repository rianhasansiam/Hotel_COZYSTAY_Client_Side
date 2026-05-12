import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaCircle, FaRegClock } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import PageTitle from "../../Components/PageTitle/PageTitle";
import PriceFilter from "./PriceFilter";
import RoomCard from "./RoomCard";

const Room = () => {
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://assignment-11-server-umber-nine.vercel.app/reviews"
        );
        setReview(Array.isArray(response.data) ? response.data : []);
      } catch (fetchError) {
        setError("Error fetching review data.");
        console.error(fetchError);
      }
    };

    fetchReviews();
  }, []);

  const fetchRooms = async (minPrice, maxPrice) => {
    try {
      const response = await fetch(
        `https://assignment-11-server-umber-nine.vercel.app/rooms?minPrice=${
          minPrice || ""
        }&maxPrice=${maxPrice || ""}`
      );

      if (!response.ok) {
        setError("Failed to fetch rooms.");
        console.error("Failed to fetch rooms:", response.statusText);
        return;
      }

      const data = await response.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      setError("Failed to fetch rooms.");
      console.error("Error fetching rooms:", fetchError);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleFilterChange = (minPrice, maxPrice) => {
    fetchRooms(minPrice, maxPrice);
  };

  return (
    <div className="mb-14">
      <PageTitle title="Room" />
      <div
        className="hero h-[550px]"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/FwrrV3D/pexels-jvdm-1457842.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md text-white space-y-5">
            <p data-aos="fade-right" className="font-roboto font-semibold">
              OUR ACCOMMODATIONS
            </p>
            <p data-aos="fade-left" className="font-marcellus text-7xl">
              Stay With Us
            </p>
            <p data-aos="fade-up" className="font-roboto">
              Spend your comfortable holiday in the heart of the beautiful Napa
              Valley.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="my-10 lg:w-1/2 mx-auto text-center space-y-5">
          <p data-aos="fade-up" className="font-roboto">
            WELCOME TO COZYSTAY LODGE
          </p>
          <p data-aos="fade-up" className="font-marcellus text-5xl">
            Select Your Cozy Room
          </p>
          <p data-aos="fade-up" className="font-marcellus">
            In a new setting composed of exceptional hotels chalets, nestled in
            a forest of pine trees, the CozyStay Lodge is expanding into a
            harmonious and refined unit that affirms its purpose: to sublimate
            the stay of its guests by a tailor-made service.
          </p>
          <div className="flex flex-col justify-center items-center mt-5 w-full font-roboto lg:flex-row">
            <p data-aos="fade-right" className="flex items-center gap-4">
              <span className="text-xl text-secondary">
                <FaRegClock />
              </span>
              CHECK IN: 3:00 PM
            </p>
            <div className="divider lg:divider-horizontal divider-secondary"></div>
            <p data-aos="fade-left" className="flex items-center gap-4">
              <span className="text-xl text-secondary">
                <FaRegClock />
              </span>
              CHECK OUT: 12:00 PM
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="container mx-auto my-6 text-center text-red-600">
          {error}
        </p>
      )}

      <h1 className="font-semibold text-3xl text-center">
        Our Hotel&apos;s Total Reviews: {review.length}
      </h1>

      <div className="container mx-auto grid grid-cols-1 gap-10 my-10">
        <PriceFilter onFilterChange={handleFilterChange} />
        {rooms.map((room, index) => {
          const alternateLayout = index % 2 === 0;
          return (
            <RoomCard
              key={room._id}
              room={room}
              alternateLayout={alternateLayout}
            />
          );
        })}
      </div>

      <div className="lg:flex justify-between items-center lg:h-[650px]">
        <div className="lg:w-1/2 bg-primary lg:h-full text-left lg:p-24 text-white lg:space-y-6">
          <p
            data-aos="fade-right"
            className="font-roboto font-medium text-center lg:text-left"
          >
            COZY & COMFORTABLE STAY EXPERIENCE
          </p>
          <p
            data-aos="fade-right"
            className="font-marcellus text-2xl text-center lg:text-left lg:text-5xl"
          >
            Complimentary Amenities In Your Suite
          </p>
          <p
            data-aos="fade-right"
            className="font-jost text-center lg:text-left"
          >
            All rooms have a bathroom with bathtub and/or shower, cable
            television/radio, free WIFI and mini bar. In addition, all rooms are
            equipped with a Nespresso coffee machine. Most rooms are carpeted,
            some have parquet flooring.
          </p>
          <ul data-aos="fade-right" className="grid grid-cols-2 justify-center">
            <li className="flex items-center gap-2">
              <span className="text-secondary">
                <TiPlus />
              </span>
              Free-standing Shower
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2">
          <img
            className="lg:h-[650px] lg:w-full"
            src="https://i.ibb.co/Zf4Pxg9/pexels-talksintheam-2263510.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="container mx-auto lg:flex justify-center gap-10 my-16">
        <div className="lg:w-1/2 space-y-5">
          <p data-aos="fade-right" className="font-jost text-primary">
            START YOUR COMFORTABLE STAY
          </p>
          <p data-aos="fade-right" className="font-marcellus text-4xl">
            Hotel Rates, Information & Reservation Policies
          </p>
          <p data-aos="fade-right" className="font-jost">
            Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
            Rhoncus ut, imperdiet a, venenatis vitae, justo. Cras dapibus.
            Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
          </p>
        </div>
        <div data-aos="fade-right" className="lg:w-1/2 space-y-5 text-lg">
          <p className="flex items-center gap-2 font-jost">
            <span className="text-secondary text-sm">
              <FaCircle />
            </span>
            We are happy to arrange late check-ins, but please note that this
            must be pre-arranged with management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;
