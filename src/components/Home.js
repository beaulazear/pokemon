import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PokemonContext } from "../context/pokemon";

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

const PokemonNameButton = styled.div`
  font-size: 0.9rem;
  padding: 10px 10px;
  width: 150px; /* Fixed width for all buttons */
  margin: 8px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-transform: capitalize; /* Capitalize the first letter of each word */
  background-color: #fcead8; /* Pastel orange */
  color: #444; /* Darkened text color */

  &:hover {
    background-color: #f7d9aa; /* Lighter pastel orange */
    color: #333; /* Darkened text color */
  }

  ${({ selected }) =>
        selected &&
        `
    background-color: #a3e4d7; /* Pastel green */
    color: #333; /* Darkened text color */
  `}
`;

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokemonDetails = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SectionCard = styled.div`
  background-color: #fcead8; /* Same as the first card */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  margin: 20px;
  max-width: 600px;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  max-width: 100%;
`;

const ImageSet = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  text-align: center;
  max-width: 100%;
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
    max-height: 300px; /* Limit image height */
  }

  @media (min-width: 768px) {
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const StatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItemContainer = styled.div`
  font-size: 0.9rem;
  padding: 10px 20px; /* Adjust padding as needed */
  margin: 8px;
  border-radius: 20px;
  background-color: #a3e4d7; /* Pastel green */
  color: #333; /* Darkened text color */
  display: inline-block; /* Display stats in a row */
`;

const StatLabel = styled.span`
  font-weight: bold;
`;

const StatValue = styled.span`
  margin-left: 5px; /* Add space between label and value */
`;

export default function Home() {
    const { pokemon } = useContext(PokemonContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonClick = (poke) => {
        fetch(`${poke.url}`).then((response) => {
            if (response.ok) {
                response.json().then((pokeData) => setSelectedPokemon(pokeData));
            }
        });
    };

    return (
        <div id="homeDiv">
            <Title>Pokemon Guide</Title>
            <h2>⬇️ Pick a Poke ⬇️</h2>
            <PokemonList>
                {pokemon?.map((poke) => (
                    <PokemonNameButton
                        key={poke.name}
                        selected={poke.name === selectedPokemon?.name}
                        onClick={() => handlePokemonClick(poke)}
                    >
                        {poke.name}
                    </PokemonNameButton>
                ))}
            </PokemonList>
            {selectedPokemon && (
                <PokemonDetails>
                    <SectionCard>
                        <h2>You have chosen {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}!</h2>
                        <p>
                            {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)} is a {selectedPokemon.types.map((type) => type.type.name).join("/")} type Pokémon with a base experience of {selectedPokemon.base_experience}. Their abilities are {selectedPokemon.abilities.map((ability) => ability.ability.name).join(" / ")}
                        </p>
                    </SectionCard>
                    <SectionCard>
                        <SectionTitle>Hot Pics 🔥</SectionTitle>
                        <ImagesContainer>
                            <p>Let's take a moment to admire their beauty..</p>
                            <ImageSet>
                                <img alt="front face of pokemon" src={selectedPokemon.sprites.front_default} />
                                <img alt="back face of pokemon" src={selectedPokemon.sprites.back_default} />
                            </ImageSet>
                            <p>Aint she stunnin' ? Now look at her shine!</p>
                            <ImageSet>
                                <img alt="shiny pokemon" src={selectedPokemon.sprites.front_shiny} />
                                <img alt="back shiny pokemon" src={selectedPokemon.sprites.back_shiny} />
                            </ImageSet>
                        </ImagesContainer>
                    </SectionCard>
                    <SectionCard>
                        <SectionTitle>Stats 💪</SectionTitle>
                        <StatContainer>
                            {selectedPokemon.stats.map((stat) => (
                                <StatItemContainer key={stat.stat.name}>
                                    <StatLabel>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</StatLabel>
                                    <StatValue>{stat.base_stat}</StatValue>
                                </StatItemContainer>
                            ))}
                        </StatContainer>
                    </SectionCard>
                </PokemonDetails>
            )}
        </div>
    );
}
