import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import styled from "styled-components";
const Cards = () => {
  const [pokemonInfo, setPokemonInfo] = useState([]);

  const [keyword, setKeyword] = useState("");

  const filterPokemons = pokemonInfo.filter((poke) =>
    poke.name.toLowerCase().includes(keyword)
  );

  const onChangeInputHandler = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.trim());
  };

  const fetchData = async () => {
    const promises = [];
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1118`;
    const {
      data: { results },
    } = await axios.get(url);
    for (let i of results) {
      promises.push(fetch(i.url).then((resp) => resp.json()));
    }
    await Promise.all(promises).then((results) => {
      const pokeData = results.map((data) => {
        return {
          name: data.name,
          speed: parseInt(
            data.stats
              .map((item) => (item.stat.name === "speed" ? item.base_stat : ""))
              .join("")
          ),
          hp: parseInt(
            data.stats
              .map((item) => (item.stat.name === "hp" ? item.base_stat : ""))
              .join("")
          ),
          attack: parseInt(
            data.stats
              .map((item) =>
                item.stat.name === "attack" ? item.base_stat : ""
              )
              .join("")
          ),
          defense: parseInt(
            data.stats
              .map((item) =>
                item.stat.name === "defense" ? item.base_stat : ""
              )
              .join("")
          ),
          height: data.height,
          pokemonSVG: data.sprites.other.dream_world.front_default,
          pokemonPNG: data.sprites.front_default,
          type: data.types.map((type) => type.type.name).join(", "),
        };
      });
      setPokemonInfo(pokeData);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(pokemonInfo);
  console.log();
  return (
    <>
      <div className="container-fluid">
        <h4> Total Pokemons {pokemonInfo?.length}</h4>
        {pokemonInfo.length > 0 ? (
          <>
            <InputText
              type="text"
              placeholder="Search Pokemon"
              value={keyword}
              onChange={onChangeInputHandler}
            />
            <div className="row">
              {filterPokemons.map((ele, index) => (
                <Card className="col-md-4 col-sm-10" data={ele} key={index} />
              ))}
            </div>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
};

const InputText = styled.input`
  display: block;
  padding: 5px 5px;
  font-size: large;
  margin: 20px;
  width: 40%;
  height: 50px;
  outline: none;
  border: none;
  border-bottom: 5px solid #5454d4;
  @media screen and (max-width: 600px) {
    width: 70%;
    border-radius: 4px;
    margin: 10px auto;
  }
  &:focus {
    border-bottom: 5px solid rebeccapurple;
  }
  &:focus-within {
    border-bottom: 5px solid rebeccapurple;
  }
  &::placeholder {
    color: #5454d4;
  }
`;
export default Cards;
