import { FaCar, FaHandsWash, FaWifi } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlineDinnerDining } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";

const Benefits = () => {
  return (
    <div className="container mx-auto lg:flex justify-between my-10">
      <div className="lg:w-1/2 mb-4 space-y-5">
        <p data-aos="fade-up" className=" font-roboto">
          DISCOVER THE SERVICES WE OFFERED
        </p>
        <p data-aos="fade-up" className=" font-marcellus text-5xl text-primary">
          Chalets With All the Benefits of a Hotel
        </p>
        <ul className="font-marcellus grid grid-cols-2 gap-4">
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <FaCar></FaCar>
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Airport Pick-up Service</p>
              <p>
                Hassle-free transport from the airport to your accommodation.
              </p>
            </div>
          </li>
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <FaHandsWash />
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Housekeeper Services</p>
              <p>Professional cleaning for a pristine and comfortable stay.</p>
            </div>
          </li>
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <FaWifi />
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Wifi & Internet</p>
              <p>Seamless connectivity for work and entertainment needs.</p>
            </div>
          </li>
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <GiWashingMachine />
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Laundry Services</p>
              <p>Convenient laundry facilities to keep your clothes fresh.</p>
            </div>
          </li>
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <MdOutlineDinnerDining />
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Breakfast in Bed</p>
              <p>Indulge in a delicious morning meal delivered to you.</p>
            </div>
          </li>
          <li data-aos="fade-up" className="flex gap-4">
            <span className="text-4xl text-secondary">
              <RiParkingBoxLine />
            </span>
            <div className=" space-y-2">
              <p className="text-xl">Private Parking Space</p>
              <p>Secure parking facilities for your peace of mind.</p>
            </div>
          </li>
        </ul>
      </div>
      <div data-aos="fade-up" className="lg:w-1/2">
        <img
          className="h-[550px] w-full"
          src="https://i.ibb.co/zhjWssb/alev-takil-lw3-Lqe2-K7xc-unsplash.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Benefits;
