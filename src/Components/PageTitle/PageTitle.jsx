import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

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

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
