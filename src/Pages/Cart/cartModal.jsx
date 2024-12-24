import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
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

const CartModal = ({ booking, handleDelete }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { _id } = booking;

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <button
        onClick={handleOpen}
        className="btn btn-sm bg-red-600 text-white hover:bg-red-600 hover:border-none"
      >
        Delete
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are You Sure Delete Your Booking!!
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-primary mt-10 text-white"
          >
            Confirm
          </button>
        </Box>
      </Modal>
    </div>
  );
};

CartModal.propTypes = {
  booking: PropTypes.shape({
    _id: PropTypes.string,
    checkInDate: PropTypes.string,
    checkOutDate: PropTypes.string,
    numRooms: PropTypes.number,
    numAdults: PropTypes.number,
    totalCost: PropTypes.number,
    type: PropTypes.string,
    image: PropTypes.string,
    pricePerNight: PropTypes.number,
  }),
  handleDelete: PropTypes.func,
};

export default CartModal;
