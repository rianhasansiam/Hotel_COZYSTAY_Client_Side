import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import axios from "axios";

const BookingsUpdate = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const roomDetails = useLoaderData();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const { user } = useContext(AuthContext);

  const navigate=useNavigate()

  const handleNumRoomsChange = (e) => {
    setNumRooms(parseInt(e.target.value));
  };

  const handleNumAdultsChange = (e) => {
    setNumAdults(parseInt(e.target.value));
  };

  const handleNumChildrenChange = (e) => {
    setNumChildren(parseInt(e.target.value));
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Destructure roomDetails safely, make sure roomDetails is not undefined.
  if (!roomDetails) {
    return <div>Loading...</div>;
  }

  const { pricePerNight, room_id } = roomDetails[0];
  const totalCost = pricePerNight * numRooms;
  // console.log(room_id)

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedDetails = {
      checkInDate: startDate, // Ensure startDate is correctly set
      checkOutDate: endDate,  // Ensure endDate is correctly set
      numRooms,
      numAdults,
      numChildren,
      totalCost: pricePerNight * numRooms,
      type: roomDetails.type,
      image: roomDetails.image,
      description: roomDetails.description,
      roomImages: roomDetails.roomImages,
      room_id: room_id,
      email: user?.email,
      user: user?.displayName,
      pricePerNight,
    };

    console.log("Submitted Data:", updatedDetails);

    axios
      .patch(`https://assignment-11-server-umber-nine.vercel.app/booking/update/${room_id}`, updatedDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Booking updated successfully");

      navigate('/booking')


        // Optionally reset the form or do other actions after success
      })
      .catch((error) => {
        console.error("Error updating booking:", error.message);
        toast.error(error.response?.data?.message || "Failed to update booking");
      });
  };

  return (
    <div className="min-h-[calc(100vh-246px)] container mx-auto">
      <h2 data-aos="fade-down" className="text-4xl font-marcellus text-center">
        Update Booking
      </h2>
      <div className="lg:flex justify-center items-center mt-10 mb-14">
        <div className="lg:w-1/2">
          <form onSubmit={handleUpdate} className="card-body pt-0">
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Check-in Date:</span>
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                className="input input-bordered mt-1 w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text ">Check-out Date:</span>
              </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                className="input input-bordered mt-1 w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text ">Rooms:</span>
              </label>
              <select
                value={numRooms}
                onChange={handleNumRoomsChange}
                className="select select-bordered mt-1"
                required
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Adults:</span>
              </label>
              <select
                value={numAdults}
                onChange={handleNumAdultsChange}
                className="select select-bordered mt-1"
                required
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text ">Children:</span>
              </label>
              <select
                value={numChildren}
                onChange={handleNumChildrenChange}
                className="select select-bordered mt-1"
                required
              >
                {[0, 1, 2, 3].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="divider divider-secondary"></div>
            <div className="flex justify-between items-center text-2xl ">
              <p>Total Cost:</p>
              <p className="text-right">${totalCost}</p>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-secondary text-white " type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookingsUpdate;
