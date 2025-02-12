import { useEffect } from "react";
import Benefits from "../../Components/Benefits/Benefits";
import HotelRooms from "../../Components/HotelRooms/HotelRooms";
import Map from "../../Components/Map/Map";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Review from "../../Components/Review/Review";
import Banner from "./Banner";
import HomePageModal from "./HomePageModal";

import Aos from "aos";
import "aos/dist/aos.css";
import Offer from "./Offer";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  useEffect(() => {
    Aos.refresh();
  });

  return (
    <div>
      <PageTitle title="Home"></PageTitle>
      <HomePageModal></HomePageModal>
      <Banner></Banner>
      <div>
        <HotelRooms></HotelRooms>
      </div>
      <div>
        <Map></Map>
      </div>
      <div>
        <Benefits></Benefits>
      </div>
      <div>
        <Offer></Offer>
      </div>
      <div>
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
