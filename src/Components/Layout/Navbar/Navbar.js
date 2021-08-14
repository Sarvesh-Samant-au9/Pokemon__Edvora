import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import pokeImg from "./poke.png";
const Navbar = () => {
  return (
    <NavbarWrapper className="container-fluid">
      <img src={pokeImg} alt="pokemon" />
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#5454d4",
          paddingLeft: "5px",
          fontWeight: "500",
          fontSize: "24px",
        }}
      >
        Pokemon
      </Link>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  background-color: #dad8d8;
  color: #5454d4;
  font-size: 24px;
  img {
    width: 50px;
    margin-left: 20px;
  }
`;

export default Navbar;
