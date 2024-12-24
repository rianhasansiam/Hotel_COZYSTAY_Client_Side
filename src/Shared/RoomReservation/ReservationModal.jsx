import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ReservationModal({
  bookings,
  roomDetails,
  handleConfirm,
  reservationDetails,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { _id } = roomDetails;
  const email = reservationDetails ? reservationDetails.email : null; // Access email from reservationDetails if it's not null

  return (
    <div>
      {/* <Button>Open modal</Button> */}
      <p>{_id}</p>
      {email && <p>Email: {email}</p>} {/* Display email if it's not null */}
      {bookings.some((booking) => booking.room_id === roomDetails._id) ? (
        <p className=" bg-red-600 text-center text-white py-2 rounded-lg">
          unavailable
        </p>
      ) : (
        <button
          onClick={handleOpen}
          className="btn w-full btn-secondary text-white"
          type="submit"
        >
          Book Now
        </button>
      )}
      <div>
        {bookings.map((booking) => (
          <p key={booking._id}>bookings id: {booking._id}</p>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {_id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
