import React from "react";
import styled from "styled-components";
import Cards from "../Components/Card/Cards";
import Footer from "../Components/Layout/Footer/Footer";
import Navbar from "../Components/Layout/Navbar/Navbar";

const Home = () => {
  return (
    <ContainerWrapper>
      <Navbar />
      <CardWrapper>
        <Cards />
      </CardWrapper>
      <Footer />
    </ContainerWrapper>
  );
};

const CardWrapper = styled.div`
  min-height: 80vh;
`;
const ContainerWrapper = styled.div`
  min-height: 100vh;
`;
export default Home;
