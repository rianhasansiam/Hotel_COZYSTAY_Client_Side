import { Helmet } from "react-helmet";

const PageTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="cozystay" content="room booking" />
      </Helmet>
    </div>
  );
};

export default PageTitle;
