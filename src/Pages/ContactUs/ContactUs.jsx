import LeafletMap from "../../Components/LeafletMap/LeafletMap";
import PageTitle from "../../Components/PageTitle/PageTitle";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);

  return (
    <div>
      <PageTitle title="Contact Us"></PageTitle>
      <div>
        <LeafletMap></LeafletMap>
      </div>
      <div className="bg-gray-200">
        <div className="lg:flex p-14 justify-center items-center container mx-auto bg-white gap-14">
          <div data-aos="fade-right" className="lg:w-1/2">
            <img
              src="https://i.ibb.co/yfnsfFy/pexels-nguyendesigner-244133.jpg"
              alt=""
            />
          </div>
          <div data-aos="fade-left" className="lg:w-1/2 md:mt-5 mt-5">
            <p data-aos="fade-up" className="text-4xl font-marcellus">
              Contact Information
            </p>
            <div className="divider divider-secondary"></div>
            <p data-aos="fade-up" className=" font-jost">
              Address: Guidino 25, 6900, Lugano, Switzerland
            </p>
            <div className="divider divider-secondary"></div>
            <p data-aos="fade-up" className=" font-jost">
              Phone Number: +41 22 345 67 88
            </p>
            <div className="divider divider-secondary"></div>
            <p data-aos="fade-up" className=" font-jost">
              Email: info@cozystay.com
            </p>
            <div className="divider divider-secondary"></div>
            <p
              data-aos="fade-up"
              className="mt-10 text-4xl font-marcellus mb-10"
            >
              Contact Information
            </p>

            {/* xs */}
            <textarea
              data-aos="fade-up"
              placeholder="Email"
              className="textarea textarea-bordered textarea-xs w-full"
            ></textarea>
            {/* sm */}
            <textarea
              data-aos="fade-up"
              placeholder="Your email"
              className="textarea textarea-bordered textarea-sm w-full "
            ></textarea>
            {/* md */}
            <textarea
              data-aos="fade-up"
              placeholder="Subject"
              className="textarea textarea-bordered textarea-md w-full "
            ></textarea>
            {/* lg */}
            <textarea
              data-aos="fade-up"
              placeholder="Your message"
              className="textarea textarea-bordered textarea-lg w-full "
            ></textarea>
            <button
              data-aos="fade-up"
              className="text-white btn btn-secondary w-full mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
