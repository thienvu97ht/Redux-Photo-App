// @ts-nocheck
import Banner from "components/Banner/index";
import Images from "constants/images";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

MainPage.propTypes = {
  photos: PropTypes.array,
};

MainPage.defaultProps = {
  photos: [],
};

function MainPage(props) {
  const photos = useSelector((state) => state.photos);
  console.log(photos);

  return (
    <div className="photo-main">
      <Banner
        title="🎉 Your awesome photos 🎉"
        backgroundUrl={Images.PINK_BG}
      />

      <Container className="text-center">
        <Link to="/photos/add">Add new photo</Link>
      </Container>
    </div>
  );
}

export default MainPage;
