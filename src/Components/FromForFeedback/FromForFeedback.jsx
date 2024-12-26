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

    // Automatically generate a timestamp when the review is submitted
    const timestamp = new Date().toISOString();
    
    // Create the review object with required fields
    const review = {
      comment: reviewContent,
      rating: rating,
      name: user ? user.displayName : "Guest",  // Read-only username
      timestamp: timestamp,
      room_id: room_id,
      review_id: _id,
      image: user?.photoURL,  // Optional: user's profile image if available
      email: user?.email,     // Optional: user's email if available
    };

    console.log("Review:", review);

    // Submit the review to the server
    fetch("https://assignment-11-server-umber-nine.vercel.app/reviews", {
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
          // Notify the user of success
          toast.success("Review submitted successfully");
        }
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        toast.error("Failed to submit review");
      });

    // Reset the form
    setReviewContent("");
    setRating(1);
  };

  return (
    <div>
      <h2 className="font-marcellus text-4xl">Write a review</h2>
      <form className="card-body p-0" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Review</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Write your review here"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)} // Handle review content change
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

        {/* Read-only Username */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName || "Guest"} // Display the user's name or "Guest" if not logged in
            className="input input-bordered"
            readOnly // Make the input read-only
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
