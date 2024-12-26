import { useEffect, useState } from 'react';

const RoomReserve = ({ user, data }) => {
  // State to store form data
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [email, setEmail] = useState(user.email);
  const [userName, setUserName] = useState(user.displayName);
  const [type, setType] = useState(data.type);
  const [pricePerNight, setPricePerNight] = useState(data.pricePerNight);
  const [room_id, setRoom_id] = useState(data._id);
  const [image, setImage] = useState(data.image);
  const [description, setDescription] = useState(data.description);

  const totalCost = data.pricePerNight * numRooms;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
      description

    };
    console.log('Reservation Details:', reservationDetails);
    // You can send the reservationDetails to your server or handle it as needed.
  };

// console.log(data)

  return (
    <div className="lg:w-1/3">
      <div className="bg-violet-600 text-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">RESERVE:</h3>
          <p>${data.pricePerNight} /night</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2">Check-in Date:</label>
            <input
              type="date"
              className="w-full p-2 rounded text-gray-900"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Check-out Date:</label>
            <input
              type="date"
              className="w-full p-2 rounded text-gray-900"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2">Rooms:</label>
            <select
              className="w-full p-2 rounded text-gray-900"
              value={numRooms}
              onChange={(e) => setNumRooms(Number(e.target.value))}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Adults:</label>
            <select
              className="w-full p-2 rounded text-gray-900"
              value={numAdults}
              onChange={(e) => setNumAdults(Number(e.target.value))}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Children:</label>
            <select
              className="w-full p-2 rounded text-gray-900"
              value={numChildren}
              onChange={(e) => setNumChildren(Number(e.target.value))}
              required
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded text-gray-900"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block mb-2">User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 rounded text-gray-900"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Display total cost */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-lg font-semibold">Total Cost:</span>
            <span className="text-lg">${totalCost}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomReserve;
