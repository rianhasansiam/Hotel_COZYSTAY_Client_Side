// import { useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Aos from "aos";
// import "aos/dist/aos.css";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
// import UpdateEdit from "./UpdateEdit";

// const RoomReservation = ({ roomDetails}) => {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [numRooms, setNumRooms] = useState(1);
//   const [numAdults, setNumAdults] = useState(1);
//   const [numChildren, setNumChildren] = useState(0);
//   const { user } = useContext(AuthContext);
//   const [reservationDetails, setReservationDetails] = useState(null);

//   const handleNumRoomsChange = (e) => {
//     setNumRooms(parseInt(e.target.value));
//   };

//   const handleNumAdultsChange = (e) => {
//     setNumAdults(parseInt(e.target.value));
//   };

//   const handleNumChildrenChange = (e) => {
//     setNumChildren(parseInt(e.target.value));
//   };

//   // const { _id, type, image, roomSize } = roomDetails;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const details = {
//       checkInDate: startDate,
//       checkOutDate: endDate,
//       numRooms,
//       numAdults,
//       numChildren,
//       totalCost: roomDetails.pricePerNight * numRooms,
//       type: roomDetails.type,
//       image: roomDetails.image,
//       description: roomDetails.description,
//       roomImages: roomDetails.roomImages,
//       room_id: roomDetails._id,
//       email: user?.email,
//       user: user?.displayName,
//       pricePerNight: roomDetails.pricePerNight,
//     };
//     setReservationDetails(details);
//     setModalIsOpen(true);
//   };
//   // console.log(reservationDetails);

//   const totalCost = roomDetails.pricePerNight * numRooms;

//   const handleConfirm = (e) => {
//     e.preventDefault();

//     const reservationDetails = {
//       checkInDate: startDate,
//       checkOutDate: endDate,
//       numRooms,
//       numAdults,
//       numChildren,
//       totalCost,
//       type: roomDetails.type,
//       image: roomDetails.image,
//       description: roomDetails.description,
//       roomImages: roomDetails.roomImages,
//       room_id: roomDetails._id,
//       email: user?.email,
//       user: user?.displayName,
//       pricePerNight: roomDetails.pricePerNight,
//     };
//     console.log("Reservation Details:", reservationDetails);

   
//   };

//   // const [bookings, setBookings] = useState([]);

//   // useEffect(() => {
//   //   const fetchBookings = async () => {
//   //     try {
//   //       const response = await fetch(
//   //         "https://assignment-11-server-umber-nine.vercel.app/bookings"
//   //       );
//   //       if (!response.ok) {
//   //         throw new Error("Failed to fetch bookings");
//   //       }
//   //       const data = await response.json();
//   //       setBookings(data);
//   //       // console.log("Bookings data:", data);
//   //     } catch (error) {
//   //       console.error("Error fetching bookings:", error.message);
//   //     }
//   //   };

//   //   fetchBookings();

//   //   return () => {};
//   // }, []);

//   useEffect(() => {
//     Aos.init({ duration: 2000 });
//     Aos.refresh();
//   }, []);

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="card-body">
//         <div data-aos="fade-up" className="form-control mt-6"></div>
//         <div className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Check-in Date:</span>
//           </label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="input input-bordered mt-1 w-full"
//             required
//           />
//         </div>

//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Check-out Date:</span>
//           </label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="input input-bordered mt-1 w-full"
//             required
//           />
//         </div>

//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Rooms:</span>
//           </label>
//           <select
//             value={numRooms}
//             onChange={handleNumRoomsChange}
//             className="select select-bordered mt-1"
//             required
//           >
//             {[1, 2, 3, 4].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Adults:</span>
//           </label>
//           <select
//             value={numAdults}
//             onChange={handleNumAdultsChange}
//             className="select select-bordered mt-1"
//             required
//           >
//             {[1, 2, 3, 4].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Children:</span>
//           </label>
//           <select
//             value={numChildren}
//             onChange={handleNumChildrenChange}
//             className="select select-bordered mt-1"
//             required
//           >
//             {[0, 1, 2, 3].map((num) => (
//               <option key={num} value={num}>
//                 {num}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">Email</span>
//           </label>
//           <input
//             type="email"
//             placeholder="email"
//             defaultValue={user?.email}
//             className="input input-bordered"
//             readOnly
//           />
//         </div>
//         <div data-aos="fade-up" className="form-control">
//           <label className="label">
//             <span className="label-text text-white">User Name</span>
//           </label>
//           <input
//             type="text"
//             defaultValue={user?.displayName}
//             placeholder="user name"
//             className="input input-bordered"
//             readOnly
//           />
//         </div>
//         <div data-aos="fade-up" className="divider divider-secondary"></div>
//         <div
//           data-aos="fade-up"
//           className=" flex justify-between items-center text-2xl text-white"
//         >
//           <p>Total Cost:</p>
//           <p className=" text-right">${totalCost}</p>
//         </div>

//         <div data-aos="fade-up" className="form-control mt-6">
//           <UpdateEdit
//             _id={_id}
//             bookings={bookings}
//             cancelBooking={cancelBooking}
//           ></UpdateEdit>
//           <div>
//             {bookings.some((booking) => booking.room_id === roomDetails._id) ? (
//               <p className=" bg-red-600 text-center text-white py-2 rounded-lg">
//                 unavailable
//               </p>
//             ) : (
//               <button
//                 onClick={handleOpen}
//                 className="btn w-full btn-secondary text-white"
//                 type="submit"
//               >
//                 Book Now
//               </button>
//             )}
//             <Modal
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >
//               <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                   Reservation Details
//                 </Typography>
//                 {reservationDetails && (
//                   <div>
//                     <img src={image} alt="" />
//                     <div className="flex mt-5 gap-4">
//                       <div className="w-1/2 border border-secondary px-2">
//                         <p>
//                           Check-in Date:{" "}
//                           {reservationDetails.checkInDate.toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="w-1/2 border border-secondary px-2">
//                         <p>
//                           Check-out Date:{" "}
//                           {reservationDetails.checkOutDate.toLocaleDateString()}
//                         </p>
//                       </div>
//                     </div>
//                     <p>Number of Rooms: {reservationDetails.numRooms}</p>
//                     <p>Number of Adults: {reservationDetails.numAdults}</p>
//                     <p>Number of Children: {reservationDetails.numChildren}</p>
//                     <p>Total Cost: ${reservationDetails.totalCost}</p>
//                     <p>Type: {reservationDetails.type}</p>
//                     {/* <p>Email: {reservationDetails.email}</p> */}
//                     {/* <p>User Name: {reservationDetails.user}</p> */}
//                     {/* <p>Description: {reservationDetails.description}</p> */}
//                     {/* Add other properties as needed */}
//                   </div>
//                 )}
//                 <div className="flex justify-between mt-10">
//                   <button
//                     className="btn bg-red-600 text-white"
//                     onClick={handleClose}
//                   >
//                     Close
//                   </button>
//                   <button
//                     onClick={handleConfirm}
//                     className=" btn btn-primary text-white"
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               </Box>
//             </Modal>
//           </div>

//           <div></div>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// RoomReservation.propTypes = {
//   roomDetails: PropTypes.object,
//   bookings: PropTypes.array,
// };
// export default RoomReservation;
