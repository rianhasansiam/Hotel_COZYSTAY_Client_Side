import axios from "axios";
import { Bed, Maximize, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../Components/FirebaseProvider/AuthContext";
import EachRoomReview from "./EachRoomReview";

const RoomDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [email, setEmail] = useState(user?.email || "");
  const [userName, setUserName] = useState(user?.displayName || "");
  const [type, setType] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);

  const totalCost = pricePerNight * numRooms;
  const hasActiveBooking = bookings.length > 0;

  useEffect(() => {
    setEmail(user?.email || "");
    setUserName(user?.displayName || "");
  }, [user]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!id) {
        return;
      }

      try {
        const [roomResponse, bookingResponse] = await Promise.all([
          axios.get(
            `https://assignment-11-server-umber-nine.vercel.app/rooms/${id}`
          ),
          axios.get(
            `https://assignment-11-server-umber-nine.vercel.app/bookings/${id}`
          ),
        ]);

        setData(roomResponse.data);

        const bookingData = bookingResponse.data;
        setBookings(
          Array.isArray(bookingData)
            ? bookingData
            : bookingData
              ? [bookingData]
              : []
        );
      } catch (error) {
        console.error("Room data fetch failed:", error);
      }
    };

    fetchRoomDetails();
  }, [id]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setType(data.type || "");
    setPricePerNight(Number(data.pricePerNight) || 0);
    setRoomId(data._id || "");
    setImage(data.image || "");
    setDescription(data.description || "");
  }, [data]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!id) {
        return;
      }

      try {
        const response = await axios.get(
          `https://assignment-11-server-umber-nine.vercel.app/eachReview/${id}`
        );
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Review fetch failed:", error);
      }
    };

    fetchReviews();
  }, [id]);

  const openModal = () => {
    if (!user?.email) {
      navigate("/login", {
        state: { from: `/roomdetails/${id}` },
      });
      return;
    }

    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const reservationDetails = {
      checkInDate,
      checkOutDate,
      numRooms,
      numAdults,
      numChildren,
      totalCost,
      email,
      userName,
      type,
      pricePerNight,
      room_id: roomId,
      image,
      description,
    };

    axios
      .post(
        "https://assignment-11-server-umber-nine.vercel.app/bookings",
        reservationDetails
      )
      .then(() => {
        closeModal();
        navigate("/booking");
      })
      .catch((error) => {
        console.error("Booking request failed:", error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      <div className="lg:w-2/3 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{data?.type}</h1>
          <p className="text-pink-500 mt-2">{data?.specialOffers}</p>

          <div className="flex flex-wrap gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5" />
              <span>{data?.roomSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{data?.guests} Guests</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              <span>{data?.beds} Beds</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Room Facilities</h2>
            <div className="flex flex-wrap gap-4">
              {Array.isArray(data?.roomFacility) &&
                data.roomFacility.map((amenity) => (
                  <span
                    className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg"
                    key={amenity}
                  >
                    {amenity}
                  </span>
                ))}
            </div>
          </div>

          <div className="space-y-5 font-roboto">
            <p>
              <span className="font-semibold">
                This room shows an example of the &quot;Booking Rules&quot;.
              </span>{" "}
              This information can be reflected in the calendar on the right or
              below the content.
            </p>

            <ul className="space-y-2">
              <li className="flex items-center gap-4">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Reservations must be made at least 3 days in advance
              </li>
              <li className="flex items-center gap-4">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                Reservations can only be made up to 90 days in advance
              </li>
              <li className="flex items-center gap-4">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                No check-in on Mondays
              </li>
              <li className="flex items-center gap-4">
                <span className="text-sm text-secondary">
                  <FaCircle />
                </span>
                No check-out on Fridays
              </li>
            </ul>

            <div>
              <p className="font-roboto">{data?.description}</p>
            </div>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {reviews.map((review, index) => (
              <EachRoomReview key={review._id || `${review.timestamp}-${index}`} rev={review} />
            ))}
          </div>
        ) : (
          <div className="text-3xl font-semibold">
            No reviews found. You can add reviews after booking the room.
          </div>
        )}

        <button
          className="bg-pink-500 hover:bg-pink-600 text-white w-full py-3 rounded-lg transition-all disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={openModal}
          disabled={hasActiveBooking}
        >
          {hasActiveBooking ? "Unavailable" : "Book Now"}
        </button>
      </div>

      <div className="w-full lg:w-1/2 h-[500px]">
        <img
          className="h-full w-full rounded-xl object-cover"
          src={data?.image}
          alt={data?.type || "Room"}
        />
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">
              Enter Booking Details
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkInDate" className="block font-medium mb-2">
                    Check-In Date:
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(event) => setCheckInDate(event.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkOutDate" className="block font-medium mb-2">
                    Check-Out Date:
                  </label>
                  <input
                    type="date"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(event) => setCheckOutDate(event.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numRooms" className="block font-medium mb-2">
                    Number of Rooms:
                  </label>
                  <input
                    type="number"
                    id="numRooms"
                    value={numRooms}
                    onChange={(event) => setNumRooms(Number(event.target.value))}
                    className="w-full border rounded-lg px-3 py-2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numAdults" className="block font-medium mb-2">
                    Number of Adults:
                  </label>
                  <input
                    type="number"
                    id="numAdults"
                    value={numAdults}
                    onChange={(event) => setNumAdults(Number(event.target.value))}
                    className="w-full border rounded-lg px-3 py-2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numChildren" className="block font-medium mb-2">
                    Number of Children:
                  </label>
                  <input
                    type="number"
                    id="numChildren"
                    value={numChildren}
                    onChange={(event) =>
                      setNumChildren(Number(event.target.value))
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userName" className="block font-medium mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Confirm Booking
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="mt-6 ml-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
