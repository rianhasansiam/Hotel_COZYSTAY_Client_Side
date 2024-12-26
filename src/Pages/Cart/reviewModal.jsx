import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FromForFeedback from "../../Components/FromForFeedback/FromForFeedback";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";

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

const ReviewModal = ({ booking }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { _id } = booking;

  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch reviews when component mounts
      fetch("https://assignment-11-server-umber-nine.vercel.app/reviews")
        .then((response) => response.json())
        .then((data) => {
          // Filter reviews by user email and matching booking ID
          const userReviews = data.filter(
            (review) => review.email === user.email && review.review_id === _id
          );
          setReviews(userReviews);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [user, _id]);

  // console.log("review from bookings", reviews);

  return (
    <div>
      {/* <p>booking id :{_id}</p>
      <p>Review ID: {reviews.map((review) => review.review_id).join(", ")}</p> */}
      <button
        onClick={handleOpen}
        className="btn btn-sm bg-secondary text-white"
      >
        Review
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {reviews.length > 0 ? (
            <Typography variant="h6">Already Submitted Feedback.</Typography>
          ) : (
            <FromForFeedback booking={booking} />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ReviewModal;
