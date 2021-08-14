import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./style.css";
const Card = (props) => {
  console.log(props.data.pokemonSVG);
  return (
    <CardWrapper
      className="card"
      style={{
        background: props.data.pokemonSVG
          ? `url(${props.data.pokemonSVG})`
          : `url(${props.data.pokemonPNG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <CardContent className="card-content">
        <CardTitle className="card-title">{props.data.name}</CardTitle>
        <CardType className="card-type">
          Pokemon Type {props.data.type}
        </CardType>
        <Link className="pokemon__button" to={`/pokemon/${props.data.name}`}>
          More Details
        </Link>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  color: #ffffff;
  background-size: cover;
  border: 2px solid black;
  width: 35ch;
  margin:auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 300px;
  transition: transform 500ms ease;

  @media screen and (max-width: 500px) {
    height: 150%;
  }
`;
const CardContent = styled.div`
  padding: 1.5rem;
  background: linear-gradient(
    hsl(0 0% 10% / 0),
    hsl(20 0% 0% / 0.2) 20%,
    hsl(0 0% 0% / 1)
  );
  @media screen and (max-width: 500px) {
    padding: 3rem 4rem;
  }
`;
const CardTitle = styled.h2`
  position: relative;
  width: max-content;
  &::after {
    content: "";
    position: absolute;
    height: 4px;
    left: calc(1.5rem * -1);
    width: calc(100% + 1.5rem);
    bottom: 0;
    background-color: #54d49f;
    /* transform: scaleX(0); */
    transform-origin: left;
    transition: transform ease 500ms;
  }
`;
const CardType = styled.p`
  color: rgba(255, 255, 255);
`;
export default Card;
