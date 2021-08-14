/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PokemonInfo = ({
  match: {
    params: { id },
  },
}) => {
  const [allInfo, setAllInfo] = useState(null);
  const [allDescription, setDescription] = useState(null);
  const [somePokemons, setSomePokemons] = useState([]);
  const [paraInfo, setParaInfo] = useState("");
  const pokemonOther = async (id) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
  };

  const pokemonParticular = async (id) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setAllInfo(data);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    setDescription(response.data);
    setParaInfo(
      response.data.flavor_text_entries.filter(
        (ele) => ele.language.name === "en"
      )
    );

    const promises = [];
    const pokeData = [];
    for (let i = 0; i < 8; i = i + 1) {
      let idNumber = Math.floor(Math.random() * 898) + 1;
      promises.push(pokemonOther(idNumber));
    }
    await Promise.all(promises).then((re) => {
      const poke = re.map((data) => {
        return {
          name: data.name,
          id: data.id,
          bigImage: data.sprites.other["official-artwork"].front_default,
          smallImage: data.sprites["front_default"],
          type: data.types.map((type) => type.type.name).join(", "),
        };
      });
      pokeData.push(poke);
    });
    setSomePokemons(pokeData.flat());
  };

  const [getId, setGetId] = useState(id);
  useEffect(() => {
    pokemonParticular(getId);
  }, [getId]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const colors = ["#364F6B", "#3FC1C9", "#FC5185", "#000BBB"];

  return (
    <div className="container-fluid">
      {allInfo !== null && (
        <>
          <h1 className="text-center mt-3">
            {capitalizeFirstLetter(allInfo.name)}
          </h1>
          <Wrapper>
            <WrapperImage>
              <img
                src={
                  allInfo.sprites.other.dream_world.front_default
                    ? allInfo.sprites.other.dream_world.front_default
                    : allInfo.sprites.front_default
                }
                alt={allInfo.name}
              />
              <WrapperRanges>
                {allInfo.stats.map((ele) => (
                  <>
                    <WrapperBar
                      width={`${parseInt(ele.base_stat)}%`}
                      color={colors[Math.floor(Math.random() * colors.length)]}
                    >
                      <span>{ele.stat.name}</span>
                      <span>{ele.base_stat}%</span>
                    </WrapperBar>
                  </>
                ))}
              </WrapperRanges>
            </WrapperImage>
            <WrapperRight>
              <WrapperRightTop>
                <WrappedDiv>
                  Abilities :{" "}
                  {allInfo.abilities.map((ele) => (
                    <SpanAbility key={ele.ability.name}>
                      {ele.ability.name},
                    </SpanAbility>
                  ))}
                </WrappedDiv>
                <WrappedDiv>
                  Experience:{" "}
                  <SpanAbility>{allInfo.base_experience}</SpanAbility>
                </WrappedDiv>
                <WrappedDiv>
                  Weight: <SpanAbility>{allInfo.weight}</SpanAbility>
                </WrappedDiv>
                <WrappedDiv>
                  Pokemon type:
                  {allInfo.types &&
                    allInfo.types.map((ele) => (
                      <SpanAbility key={ele.slot}>{ele.type.name},</SpanAbility>
                    ))}
                </WrappedDiv>
                {allDescription !== null && (
                  <>
                    <p
                      style={{
                        color: "rebeccapurple",
                        fontFamily: "cursive",
                        fontSize: "20px",
                      }}
                    >
                      {paraInfo.length !== 0 &&
                        paraInfo[Math.floor(Math.random() * paraInfo.length)][
                          "flavor_text"
                        ].replace(/(\r\n|\n|\f|\f|\r)/gm, " ")}
                    </p>
                  </>
                )}
              </WrapperRightTop>
              <WrapperRightBottom>
                <h5 className="text-center">Other Pokemons</h5>
                {somePokemons &&
                  somePokemons.map((ele, index) => (
                    <Link
                      to={`/pokemon/${ele.name}`}
                      onClick={() => setGetId(ele.name)}
                      key={index}
                    >
                      {<img src={ele.bigImage} alt={ele.name} />}
                    </Link>
                  ))}
                <div className="mt-4">
                  <Link to="/" className="btn btn-outline-danger">
                    Return Back
                  </Link>
                </div>
              </WrapperRightBottom>
            </WrapperRight>
          </Wrapper>
        </>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  width: 80%;
  min-height: 70vh;
  margin: auto;
  display: flex;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const WrapperImage = styled.div`
  flex: 7;
  img {
    display: block;
    width: 80%;
    height: 50%;
    margin: auto;
  }
  @media screen and (max-width: 600px) {
    flex: 1;
  }
`;
const WrapperRanges = styled.div`
  display: flex;
  height: 45%;
  margin-top: 5px;
  flex-direction: column;
  justify-content: space-between;
`;
const WrapperBar = styled.div`
  background-color: ${(props) => props.color};
  padding: 2px 3px;
  color: white;
  width: ${(props) => props.width};
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  @media screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;
const WrapperRight = styled.div`
  flex: 10;
`;
const WrapperRightTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media screen and (max-width: 600px) {
    flex: 1;
  }
`;
const WrapperRightBottom = styled.div`
  height: 60%;
  img {
    width: 120px;
  }
`;
const SpanAbility = styled.span`
  font-family: cursive;
  color: #5454d4;
  padding: 5px;
  font-size: 1.1rem;
`;
const WrappedDiv = styled.div`
  margin-bottom: 10px;
`;
export default PokemonInfo;
