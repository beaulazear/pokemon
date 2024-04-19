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
  font-size: 1rem;
  padding: 8px 16px;
  margin: 8px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-transform: capitalize; /* Capitalize the first letter of each word */

  &:hover {
    background-color: #f0f0f0;
  }

  ${({ selected }) =>
        selected &&
        `
    background-color: #ffcc00;
  `}
`;


const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatItem = styled.div`
  margin-bottom: 8px;
  font-size: 1rem;
  color: #333;
  text-transform: capitalize; /* Capitalize the first letter of each word */
`;

export default function Home() {
    const { pokemon } = useContext(PokemonContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    console.log(selectedPokemon)

    const handlePokemonClick = (poke) => {
        fetch(`${poke.url}`).then((response) => {
            if (response.ok) {
                response.json().then((pokeData) => setSelectedPokemon(pokeData))
            }
        })
    };

    return (
        <div id="homeDiv">
            <Title>Pokemon Hoe</Title>
            <h2>Pick-A-Poke ⬇️</h2>
            {pokemon?.map((poke) => (
                <PokemonNameButton
                    key={poke.name}
                    selected={poke.name === selectedPokemon?.name}
                    onClick={() => handlePokemonClick(poke)}
                >
                    {poke.name}
                </PokemonNameButton>
            ))}
            {selectedPokemon && (
                <div>
                    <h2>You have chosen {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}!</h2>
                    <p>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}'s base experience is {selectedPokemon.base_experience}</p>
                    <h3>Stats 💪</h3>
                    {selectedPokemon && (
                        <StatContainer>
                            {selectedPokemon.stats.map((stat) => (
                                <StatItem key={stat.stat.name}>
                                    <p>{stat.stat.name}: {stat.base_stat}</p>
                                </StatItem>
                            ))}
                        </StatContainer>
                    )}

                    <h3>Hot Pics 🔥</h3>
                    <p>Let's take a moment to admire their beauty..</p>
                    <img alt="front face of pokemon" src={selectedPokemon.sprites.front_default} />
                    <img alt="back face of pokemon" src={selectedPokemon.sprites.back_default} />
                    <p>Aint she stunnin' ? Now look at her shine!</p>
                    <img alt="shiny pokemon" src={selectedPokemon.sprites.front_shiny} />
                    <img alt="back shiny pokemon" src={selectedPokemon.sprites.back_shiny} />
                    <h3></h3>
                </div>
            )}
        </div>
    );
}
