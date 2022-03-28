import React from "react";
import { CContainer,CImage } from "@coreui/react";

const Home = () => {
  return (
    <CContainer className="justify-content-center col d-flex align-items-center">
      <h1>Welcome to Campuseer</h1>
      <CImage
              src={require("../../assets/campuseerWhite.png")}
              height={180}
              alt="user"
            />
    </CContainer>
  );
};

export default Home;
