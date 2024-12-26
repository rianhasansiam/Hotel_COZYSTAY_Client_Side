import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

const UpdateBookingPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = {
      checkInDate: startDate,
      checkOutDate: endDate,
      numRooms,
      numAdults,
      numChildren,
    };

    console.log("Form Data:", formData);
  };

  const [bookingDetails, setBookingDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `https://assignment-11-server-umber-nine.vercel.app/bookings/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingDetails();

    // Clean up function if needed
    return () => {
      // Perform cleanup here if necessary
    };
  }, [id]);

  return (
    <div>
      <form onSubmit={handleUpdate} className="card-body ">
        <div className="flex justify-between items-center gap-4">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text ">Check-in Date:</span>
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="input input-bordered mt-1 w-full"
              required
            />
          </div>

          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text ">Check-out Date:</span>
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="input input-bordered mt-1 w-full"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text ">Rooms:</span>
          </label>
          <select
            value={numRooms}
            onChange={(e) => setNumRooms(parseInt(e.target.value))}
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
            onChange={(e) => setNumAdults(parseInt(e.target.value))}
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
            onChange={(e) => setNumChildren(parseInt(e.target.value))}
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
          <p className="text-right"></p>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-secondary text-white " type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBookingPage;
