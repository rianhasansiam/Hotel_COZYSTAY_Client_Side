import { BiSolidDrink } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaBed, FaCircle, FaWifi } from "react-icons/fa";
import { FaBottleDroplet } from "react-icons/fa6";
import { GiSlippers, GiTowel, GiWashingMachine } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineCoffeeMaker, MdOutlinePets, MdPool } from "react-icons/md";
import { PiHairDryerFill, PiTelevisionSimple } from "react-icons/pi";
import { RiSafe2Fill } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbAirConditioning } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";
import RoomReservation from "../../Shared/RoomReservation/RoomReservation";
import ReviewForm from "../../Shared/ReviewForm/ReviewForm";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
import ReviewSlider from "./ReviewSlider";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Components/PageTitle/PageTitle";

import Aos from "aos";
import "aos/dist/aos.css";

const RoomDetails = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  const roomDetails = useLoaderData();
  const { user } = useContext(AuthContext);

  const {
    _id,
    type,
    pricePerNight,
    roomSize,
    availability,
    roomImages,
    specialOffers,
    image,
    description,
    guests,
    beds,
  } = roomDetails;

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

        // Filter bookings based on room ID and user email
        const filteredBookings = data.filter(
          (booking) => booking.room_id === _id && booking.email === user.email
        );

        setBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookings();

    return () => {};
  }, [_id, user]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://hotel-booking-server-lake.vercel.app/reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Filter reviews based on matching _id and user email
        const filteredReviews = data.filter(
          (review) =>
            review.details_id === roomDetails._id && review.email === user.email
        );
        setReviews(filteredReviews);
        // console.log("Filtered reviews data:", filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
      }
    };

    fetchReviews();

    return () => {};
  }, [roomDetails, user]);

  const cancelBooking = (id) => {
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
    <div>
      <PageTitle title="Room Details"></PageTitle>
      <div>
        <img className="w-full h-96" src={image} alt="" />
      </div>
      <div className=" container mx-auto lg:flex justify-between my-10">
        <div data-aos="fade-up" className="lg:w-3/5 space-y-10 lg:mr-24">
          <p data-aos="fade-up" className=" text-4xl font-marcellus font-light">
            {type}
          </p>
          <p data-aos="fade-up" className=" text-secondary text-xl">
            Special Offer:{" "}
            <span>{specialOffers ? specialOffers : "No Offers"}</span>
          </p>
          <div className=" flex justify-between">
            <div
              data-aos="fade-up"
              className=" flex justify-start items-center gap-5 font-roboto"
            >
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
          </div>

          <div className=" space-y-5 font-roboto">
            <p data-aos="fade-up">
              <span className="font-semibold">
                This room shows an example of the “Booking Rules”.
              </span>{" "}
              These information can be reflected in the calendar on the right or
              below the content.
            </p>
            <ul data-aos="fade-up" className=" space-y-2">
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Reservations must be made at least 3 days in advance
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Reservations can only be made up to 90 days in advance
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                No check-in on Mondays
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                No check-out on Fridays
              </li>
            </ul>
          </div>
          <div data-aos="fade-up">
            <p className=" font-roboto">{description}</p>
          </div>
          <div></div>
          <div className=" space-y-5">
            <p
              data-aos="fade-up"
              className=" font-marcellus font-light text-2xl"
            >
              Family-friendly Amenities
            </p>
            <div
              data-aos="fade-up"
              className="text-white grid lg:grid-cols-3 gap-4"
            >
              <div className="flex justify-center items-center gap-2 bg-secondary p-4 rounded-lg">
                <p className=" text-2xl ">
                  <MdPool />
                </p>
                <p>Kids Swimming Pool</p>
              </div>
              <div className="flex justify-center items-center gap-2 bg-secondary p-4 rounded-lg">
                <p className=" text-2xl ">
                  <FaBed />
                </p>
                <p>Extra Beds/Baby Crib</p>
              </div>
              <div className="flex justify-center items-center gap-2 bg-secondary p-4 rounded-lg">
                <p className=" text-2xl ">
                  <GiWashingMachine />
                </p>
                <p>Washing Machine</p>
              </div>
            </div>
          </div>
          <div className=" space-y-5">
            <p
              data-aos="fade-up"
              className=" font-marcellus font-light text-2xl"
            >
              Room Amenities
            </p>
            <div className="grid grid-cols-2 gap-3">
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <TbAirConditioning />
                </span>
                Air conditioner
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <PiTelevisionSimple />
                </span>
                Cable TV
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <FaWifi />
                </span>
                Wifi & Internet
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <GiTowel />
                </span>
                Towels
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <GiSlippers />
                </span>
                Slippers
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <PiHairDryerFill />
                </span>
                Hair Dryer
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <FaBottleDroplet />
                </span>
                Shampoo
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <MdOutlineCoffeeMaker />
                </span>
                Espresso Machine
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <RiSafe2Fill />
                </span>
                Safe Box
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <BiSolidDrink />
                </span>
                Welcome Drinks
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <MdOutlinePets />
                </span>
                Pet Friendly
              </p>
              <p data-aos="fade-up" className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <CgSmartHomeRefrigerator />
                </span>
                In-room Refrigerator
              </p>
            </div>
          </div>
          <div className=" space-y-5">
            <p
              data-aos="fade-up"
              className=" font-marcellus font-light text-2xl"
            >
              What’s included in this suite?
            </p>
            <ul data-aos="fade-up" className=" space-y-2">
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Private balcony
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                140x200 cm Elite bed
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Upholstered seat beside the panoramic window
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                TV-UHD screen for watching mountaineering films
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Writing desk with USB ports for documenting your adventures
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Room safe for your top mountain photos
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Service station with Lavazza coffee machine, kettle and tea
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Bathroom with rain shower
              </li>
              <li className="flex items-center gap-4 ">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Comfortable terry towels and bathrobes
              </li>
            </ul>
          </div>
          <div className=" space-y-5">
            <h3 data-aos="fade-up" className="text-4xl font-marcellus">
              Feedback from our Guests
            </h3>
            <ReviewSlider
              bookings={bookings}
              reviews={reviews}
              roomDetails={roomDetails}
            ></ReviewSlider>
          </div>
          <div>
            <div data-aos="fade-up">
              {user ? (
                bookings.some(
                  (booking) =>
                    booking.room_id === roomDetails._id &&
                    booking.email === user.email
                ) ? (
                  reviews.some(
                    (review) =>
                      review.details_id === roomDetails._id &&
                      review.email === user.email
                  ) ? (
                    <p className="font-marcellus lg:text-4xl">
                      You have already submitted a review for this room.
                    </p>
                  ) : (
                    <ReviewForm roomDetails={roomDetails} />
                  )
                ) : (
                  <p className="font-marcellus lg:text-4xl">
                    To submit a review, you need to book the room first.
                  </p>
                )
              ) : (
                <p className="font-marcellus lg:text-4xl">
                  Please log in to submit a review.
                </p>
              )}
            </div>
          </div>
        </div>
        <div data-aos="fade-up" className="lg:w-2/5  font-marcellus">
          <div className=" bg-primary rounded-lg shadow-xl px-10 py-14">
            <div className="flex justify-between items-center">
              <p
                data-aos="fade-up"
                className=" font-marcellus text-2xl font-light text-white"
              >
                RESERVE:
              </p>
              <p data-aos="fade-up" className=" font-jost text-white">
                From <span className=" font-sm text-lg ">${pricePerNight}</span>{" "}
                /night
              </p>
            </div>
            <RoomReservation
              bookings={bookings}
              roomDetails={roomDetails}
              reviews={reviews}
              cancelBooking={cancelBooking}
            ></RoomReservation>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoomDetails;
