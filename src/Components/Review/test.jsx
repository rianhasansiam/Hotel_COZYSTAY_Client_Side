import { useContext, useEffect, useState } from "react";
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
import ReviewCards from "./ReviewCards";
import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(5);
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   // Fetch reviews when component mounts
  //   fetch(
  //     `http://localhost:5000/reviews?minRating=${selectedRating}&maxRating=${selectedRating}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReviews(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reviews:", error);
  //     });
  // }, [selectedRating]);

  // console.log(reviews);

  useEffect(() => {
    if (user) {
      // Fetch reviews when component mounts
      fetch("http://localhost:5000/reviews")
        .then((response) => response.json())
        .then((data) => {
          // Filter reviews by user email and matching booking ID

          setReviews(data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, []);

  console.log("review from home", reviews);

  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.value);
    setSelectedRating(rating);
  };

  return (
    <div className="space-y-10 my-10">
      <div className="bg-primary py-20">
        <div className="container mx-auto space-y-10">
          <div className=" text-center w-3/5 mx-auto space-y-5 text-white">
            <h3 className="text-4xl font-marcellus">
              Feedback from our Guests
            </h3>
            <p>
              Consectetur adipisicing elit. Nihil, illum voluptate eveniet ex
              fugit ea delectus, sed voluptatem. Laborum accusantium libero
              commodi id officiis itaque esse adipisci, necessitatibus
              asperiores, illo odio.
            </p>
            <div className="flex justify-center mt-5">
              <label className="mr-3">Select Rating:</label>
              <select
                className=" bg-secondary px-5 py-1 rounded-lg"
                onChange={handleRatingChange}
                value={selectedRating}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              navigation={true}
              // autoplay={{ delay: 6000 }}
              loop={true}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className="mySwiper"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <ReviewCards key={review._id} review={review}></ReviewCards>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
