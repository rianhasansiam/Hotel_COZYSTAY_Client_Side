import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import ReviewCards from "../../Components/Review/ReviewCards";
import { useEffect, useState } from "react";
// import PropTypes from "prop-types"; // Import PropTypes

const ReviewSlider = ({ roomDetails }) => {
  console.log(roomDetails)
  // const { _id } = roomDetails;

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://assignment-11-server-umber-nine.vercel.app/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Filter reviews based on matching _id with room_id
        const filteredReviews = data.filter((review) => review.room_id === _id);
        setReviews(filteredReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error.message);
        setError(error.message); // Set error message if fetching fails
      }
    };

    fetchReviews();
  }, [roomDetails]); // Include _id in the dependency array

  return (
    <>
      {error && <p className="error">{error}</p>} {/* Display error message if any */}
      
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 4000 }} // Enable autoplay
        loop={true}
        pagination={{ clickable: true }} // Enable pagination
        scrollbar={{ draggable: true }} // Enable scrollbar
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <ReviewCards review={review} /> {/* Pass review as prop to ReviewCards */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

// PropTypes validation for roomDetails
// ReviewSlider.propTypes = {
//   roomDetails: PropTypes.shape({
//     _id: PropTypes.string.isRequired, // Assuming _id is a string
//   }).isRequired,
// };

export default ReviewSlider;
