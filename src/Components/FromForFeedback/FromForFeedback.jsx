import { useContext, useState } from "react";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const FromForFeedback = ({ booking }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(1);
  const [reviewContent, setReviewContent] = useState("");

  const { _id, room_id } = booking;

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const review = {
      comment: reviewContent,
      rating: rating,
      name: user ? user.displayName : "Guest",
      timestamp: timestamp,
      details_id: room_id,
      review_id: _id,
      room_id: room_id,
      image: user?.photoURL,
      email: user?.email,
    };
    console.log("Review:", review);

    // Submit the review to the server
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          // alert("Review submitted successfully");
          toast.success("Review submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        // alert("Failed to submit review");
        toast.error("Failed to submit review");
      });

    setReviewContent("");
    setRating(1);
  };

  return (
    <div>
      <h2 className="font-marcellus text-4xl">Write a review</h2>
      <form className="card-body p-0 " onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Review</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Review"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)} // Add onChange handler to update review content
            name="review"
            required
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating:</span>
          </label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="select select-bordered mt-1"
            required
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            value={user?.displayName || ""} // Set default value to user's display name
            className="input input-bordered"
            name="name"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FromForFeedback;
