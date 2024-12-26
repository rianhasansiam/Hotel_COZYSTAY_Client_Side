import { FaCircle, FaBed, FaWifi } from 'react-icons/fa';
import { MdPool, MdOutlineCoffeeMaker, MdOutlinePets } from 'react-icons/md';
import { GiWashingMachine, GiTowel, GiSlippers } from 'react-icons/gi';
import { TbAirConditioning } from 'react-icons/tb';
import { PiTelevisionSimple, PiHairDryerFill } from 'react-icons/pi';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { RiSafe2Fill } from 'react-icons/ri';
import { BiSolidDrink } from 'react-icons/bi';

import axios from 'axios';

import { Bed, Maximize, Users } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Components/FirebaseProvider/FirebaseProvider';
import EachRoomReview from './EachRoomReview';

const RoomDetails = () => {
  const { id } = useParams();  // Get room ID from URL parameters
  const { user } = useContext(AuthContext);  // Get user from AuthContext
  const [data, setData] = useState(null);  // State for storing room data
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state
  const navigate = useNavigate();

  // State to store form data
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [email, setEmail] = useState(user?.email || '');
  const [userName, setUserName] = useState(user?.displayName || '');
  const [type, setType] = useState('');
  const [pricePerNight, setPricePerNight] = useState(0);
  const [room_id, setRoom_id] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState([]);
  const [booking, setBookings] = useState([]);

  const totalCost = pricePerNight * numRooms;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the default form submission behavior

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
      room_id,
      image,
      description,
    };

    console.log('Reservation Details:', reservationDetails);

    // Axios post request inside handleSubmit
    axios.post('http://localhost:5000/bookings', reservationDetails)
      .then(response => {
        console.log(response.data);
        // Navigate to the bookings page or show success message if needed
        bookFunc();
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  // You can call bookFunc() inside handleSubmit once the Axios request is successful
  const bookFunc = () => {
    setIsModalOpen(false);
    navigate('/booking');
  };

  // Fetch room data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // Fetch room details
          const roomResponse = await axios.get(`http://localhost:5000/rooms/${id}`);
          setData(roomResponse.data);

          // Fetch room bookings
          const bookingResponse = await axios.get(`http://localhost:5000/bookings/${id}`);
          setBookings(bookingResponse.data);
        }
      } catch (err) {
        console.log('Data fetching problem', err);  // Log errors if data fetch fails
      }
    };

    fetchData();  // Call the async function
  }, [id]);

  useEffect(() => {
    if (data) {
      setType(data.type);
      setPricePerNight(data.pricePerNight);
      setRoom_id(data._id);
      setImage(data.image);
      setDescription(data.description);
    }
  }, [data]);

  // Modal open and close functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eachReview/${id}`); // Fetch room details by ID
        setReview(response.data);  // Update state with room details
      } catch (err) {
        console.log('Data fetching problem', err);  // Log errors if data fetch fails
      }
    };

    if (id) {
      fetchData();  // Fetch data when component mounts or `id` changes
    }
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
      {/* Left Content */}
      <div className="lg:w-2/3 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{data?.type}</h1>
          <p className="text-pink-500 mt-2">{data?.specialOffers}</p>

          <div className="flex gap-6 text-gray-600">
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
            <div className="flex gap-4">
              {data?.roomFacility &&
                Array.isArray(data.roomFacility) &&
                data.roomFacility.map((amenity, index) => (
                  <button className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg" key={index}>
                    {amenity}
                  </button>
                ))}
            </div>
          </div>

          <div className="space-y-5 font-roboto">
            <p>
              <span className="font-semibold">
                This room shows an example of the “Booking Rules”.
              </span>{' '}
              This information can be reflected in the calendar on the right or below the content.
            </p>

            {/* Booking Rules List */}
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

            {/* Description Section */}
            <div>
              <p className="font-roboto">{data?.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {Array.isArray(review) && review.length > 0 ? (
          <div className='flex flex-wrap justify-center'>
            {review.map((rev, index) => (
              <EachRoomReview key={index} rev={rev} />
            ))}
          </div>
        ) : (
          <div className='text-3xl font-semibold'>No reviews found. You can add reviews after booking the room.</div>
        )}

        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white w-full py-3 rounded-lg transition-all"
          onClick={openModal}  // Open modal when clicked
          disabled={booking.length !== 0}  // Disable button if no bookings
        >
          {booking.length === 0 ? "Book Now" : "Unavailable"}
        </button>
      </div>

      {/* Room Image */}
      <div className='w-[50%] h-[500px]'>
        <img className='h-full w-full rounded-xl object-cover' src={data?.image} alt="room image" />
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Enter Booking Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Form inputs for booking details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkInDate" className="block font-medium mb-2">Check-In Date:</label>
                  <input
                    type="date"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkOutDate" className="block font-medium mb-2">Check-Out Date:</label>
                  <input
                    type="date"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numRooms" className="block font-medium mb-2">Number of Rooms:</label>
                  <input
                    type="number"
                    id="numRooms"
                    value={numRooms}
                    onChange={(e) => setNumRooms(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numAdults" className="block font-medium mb-2">Number of Adults:</label>
                  <input
                    type="number"
                    id="numAdults"
                    value={numAdults}
                    onChange={(e) => setNumAdults(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="numChildren" className="block font-medium mb-2">Number of Children:</label>
                  <input
                    type="number"
                    id="numChildren"
                    value={numChildren}
                    onChange={(e) => setNumChildren(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium mb-2">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userName" className="block font-medium mb-2">Name:</label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
