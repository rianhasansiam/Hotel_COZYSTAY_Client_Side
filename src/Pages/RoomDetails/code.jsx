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
import ReviewCards from "../../Components/Review/ReviewCards";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

const RoomDetails = () => {
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

  const [reviews, setReviews] = useState([]);
  // const [bookings, setBookings] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRoomBooked, setIsRoomBooked] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  // useEffect(() => {
  //   // Fetch reviews when component mounts
  //   fetch("https://assignment-11-server-umber-nine.vercel.app/reviews")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const filteredReviews = data.filter(
  //         (review) => review.review_id === _id
  //       );
  //       setReviews(filteredReviews);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reviews:", error);
  //     });
  // }, [_id]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch bookings for the current room
      fetch(`https://assignment-11-server-umber-nine.vercel.app/bookings/room/${_id}`)
        .then((response) => response.json())
        .then((data) => {
          setBookings(data);
          console.log("room data", data);
          // Check if the current user has booked the room
          setIsRoomBooked(data.some((booking) => booking.email === user.email));
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [isAuthenticated, _id, user]);

  // Fetch bookings for the current room
  // useEffect(() => {
  //   fetch("https://assignment-11-server-umber-nine.vercel.app/bookings")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const submitReview = data.filter((roomID) => roomID.room_id === _id);
  //       setBookings(submitReview);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching bookings:", error);
  //     });
  // }, []);

  useEffect(() => {
    // Fetch reviews when component mounts
    fetch("https://assignment-11-server-umber-nine.vercel.app/reviews")
      .then((response) => response.json())
      .then((data) => {
        const filteredReviews = data.filter(
          (review) => review.review_id === _id
        );
        setReviews(filteredReviews);
        // Check if the current user has submitted a review
        setIsFeedbackSubmitted(
          filteredReviews.some((review) => review.email === user.email)
        );
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [_id, user]);
  console.log("review data", reviews);

  // const isRoomBooked = bookings.some(
  //   (booking) => booking.room_id === roomDetails._id
  // );

  // const isFeedback = reviews.some(
  //   (review) => review.review_id === roomDetails._id
  // );

  // const isAuthenticated = !!user;

  // const [hasBookedRoom, setHasBookedRoom] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     // Fetch bookings when component mounts
  //     fetch("https://assignment-11-server-umber-nine.vercel.app/bookings")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // Filter bookings by user email
  //         const userBookings = data.filter(
  //           (booking) => booking.email === user.email
  //         );
  //         setHasBookedRoom(userBookings);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching bookings:", error);
  //       });
  //   }
  // }, [user]);
  // console.log(hasBookedRoom);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Function to fetch bookings data
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "https://assignment-11-server-umber-nine.vercel.app/bookings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        // Set the fetched bookings data to state
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    // Call the fetchBookings function when component mounts
    fetchBookings();

    // Clean up function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return (
    <div className="">
      <div>
        <img className="w-full h-96" src={image} alt="" />
      </div>

      <div className=" container mx-auto flex justify-between my-10">
        <div className="w-3/5 space-y-10 mr-24">
          <p className=" text-4xl font-marcellus font-light">{type}</p>
          <p className=" text-secondary text-xl">
            Special Offer:{" "}
            <span>{specialOffers ? specialOffers : "No Offers"}</span>
          </p>
          <div className=" flex justify-between">
            <div className=" flex justify-start items-center gap-5 font-roboto">
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
            <p>
              <span className="font-semibold">
                This room shows an example of the “Booking Rules”.
              </span>{" "}
              These information can be reflected in the calendar on the right or
              below the content.
            </p>
            <ul className=" space-y-2">
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
          <div>
            <p className=" font-roboto">{description}</p>
          </div>
          <div className=" space-y-5">
            <p className=" font-marcellus font-light text-2xl">
              Family-friendly Amenities
            </p>
            <div className="text-white grid grid-cols-3 gap-4">
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
            <p className=" font-marcellus font-light text-2xl">
              Room Amenities
            </p>
            <div className="grid grid-cols-2 gap-3">
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <TbAirConditioning />
                </span>
                Air conditioner
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <PiTelevisionSimple />
                </span>
                Cable TV
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <FaWifi />
                </span>
                Wifi & Internet
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <GiTowel />
                </span>
                Towels
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <GiSlippers />
                </span>
                Slippers
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <PiHairDryerFill />
                </span>
                Hair Dryer
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <FaBottleDroplet />
                </span>
                Shampoo
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <MdOutlineCoffeeMaker />
                </span>
                Espresso Machine
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <RiSafe2Fill />
                </span>
                Safe Box
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <BiSolidDrink />
                </span>
                Welcome Drinks
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <MdOutlinePets />
                </span>
                Pet Friendly
              </p>
              <p className="flex items-center gap-4">
                <span className="text-2xl text-secondary">
                  <CgSmartHomeRefrigerator />
                </span>
                In-room Refrigerator
              </p>
            </div>
          </div>
          <div className=" space-y-5">
            <p className=" font-marcellus font-light text-2xl">
              What’s included in this suite?
            </p>
            <ul className=" space-y-2">
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
            <h3 className="text-4xl font-marcellus">
              Feedback from our Guests
            </h3>
            {reviews.length > 0 ? (
              <p>Total Reviews: {reviews.length}</p>
            ) : (
              <p>No Review Yet!!</p>
            )}
            {reviews.length > 0 ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ delay: 6000 }}
                loop={true}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                className="mySwiper"
              >
                {reviews.map((review) => (
                  <SwiperSlide key={review._id}>
                    <ReviewCards key={review._id} review={review}></ReviewCards>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              isRoomBooked ? (
                reviews.some(
                  (review) =>
                    review.room_id === _id && review.email === user.email
                ) ? (
                  <p className="font-marcellus text-4xl">
                    You have already submitted a review for this room.
                  </p>
                ) : (
                  <ReviewForm roomDetails={roomDetails} />
                )
              ) : (
                <p className="font-marcellus text-4xl">
                  To submit a review, you need to book the room first.
                </p>
              )
            ) : (
              <p className="font-marcellus text-4xl">
                Please log in to submit a review.
              </p>
            )}
            {/* {bookings.length > 0 ? (
              <ReviewForm roomDetails={roomDetails} />
            ) : (
              <p className=" font-marcellus text-4xl">
                For Submit Review You Need To Book Room
              </p>
            )} */}
          </div>
        </div>
        <div className="w-2/5  font-marcellus">
          <div className=" bg-primary rounded-lg shadow-xl px-10 py-14">
            <div className="flex justify-between items-center">
              <p className=" font-marcellus text-2xl font-light text-white">
                RESERVE:
              </p>
              <p className=" font-jost text-white">
                From <span className=" font-sm text-lg ">${pricePerNight}</span>{" "}
                /night
              </p>
            </div>
            <RoomReservation
              pricePerNight={pricePerNight}
              roomId={_id}
              roomDetails={roomDetails}
              reviews={reviews}
              bookings={bookings}
            ></RoomReservation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
