import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import video from "../../assets/bg-video.mp4";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  return (
    <div>
      <div className="hero">
        <video autoPlay muted loop className="hero-video">
          {/* Add multiple video sources for better browser compatibility */}
          <source src={video} type="video/mp4" />
          {/* Add additional video sources here */}
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay bg-opacity-60 "></div>
        <div className=" flex justify-center items-center text-center text-white  gap-10">
          <div className="lg:w-3/5 space-y-5">
            <div className="px-5 md:px-24 space-y-2">
              <p
                data-aos="fade-down"
                className=" font-roboto font-medium lg:font-semibold"
              >
                BEST PLACE FOR RELAX
              </p>
              <p
                data-aos="fade-right"
                className=" font-marcellus font-normal md:text-2xl text-xl lg:text-5xl"
              >
                Perfect Countryside Vacation at CozyStay Lodge
              </p>
              <p data-aos="fade-left" className=" font-jost">
                Nestled in Napa Valley, CozyStay Lodge is a luxury boutique
                hotel in the heart of wine country, conveniently located in the
                historic Napa Mill neighbourhood, just steps from some of the
                best wineries and restaurants.
              </p>
            </div>
            
          </div>
        </div>
            <Link to="/room" className="btn relative top-36">View Details</Link>
      </div>
    </div>
  );
};

export default Banner;
