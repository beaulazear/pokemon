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
  padding: 15px;
  line-height: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
  max-width: 600px;
`;

const CenteredSectionCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px; /* Add left and right padding */
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

const CenteredButton = styled.div`
  font-size: 0.9rem;
  padding: 10px 10px;
  width: 150px; /* Fixed width for the button */
  margin: 8px auto; /* Center the button horizontally */
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

const FilterButton = styled(PokemonNameButton)`
  width: auto;
  margin: 0 5px;
`;

export default function Home() {
  const { pokemon } = useContext(PokemonContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showButtons, setShowButtons] = useState(true);
  const [movesFilter, setMovesFilter] = useState(10); // Default to showing first 10 moves


  const handlePokemonClick = (poke) => {
    fetch(`${poke.url}`).then((response) => {
      if (response.ok) {
        response.json().then((pokeData) => {
          setSelectedPokemon(pokeData);
          setShowButtons(false); // Hide buttons when a Pokemon is selected
          setMovesFilter(10)
        });
      }
    });
  };

  const handleSelectNewPokemon = () => {
    setSelectedPokemon(null);
    setShowButtons(true); // Show buttons when selecting a new Pokemon
  };

  console.log(selectedPokemon)


  return (
    <div id="homeDiv">
      <Title>Kanto Pokemon Guide</Title>
      <h2>⬇️ Pick a Poke ⬇️</h2>
      {showButtons && (
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
      )}
      {selectedPokemon && (
        <div>
          <CenteredButton onClick={handleSelectNewPokemon}>
            Select New Pokemon
          </CenteredButton>
          <PokemonDetails>
            <CenteredSectionCards>
              <SectionCard>
                <h2>
                  You have chosen{" "}
                  {selectedPokemon.name.charAt(0).toUpperCase() +
                    selectedPokemon.name.slice(1)}
                  !
                </h2>
                <p>
                  {selectedPokemon.name.charAt(0).toUpperCase() +
                    selectedPokemon.name.slice(1)}{" "}
                  is a{" "}
                  {selectedPokemon.types
                    .map((type) => type.type.name)
                    .join("/")}{" "}
                  type Pokémon with a base experience of{" "}
                  {selectedPokemon.base_experience}. Their abilities are{" "}
                  {selectedPokemon.abilities
                    .map((ability) => ability.ability.name)
                    .join(" / ")}
                </p>
              </SectionCard>
              <SectionCard>
                <h2>🔥 Hot Pics 🔥</h2>
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
                  <p>Every pokemon you catch there is a very small chance they will be in it's shiny form.</p>
                </ImagesContainer>
              </SectionCard>
              <SectionCard>
                <h2>💪 Stats 💪</h2>
                <p>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}'s base stats. These can be improved throughout gameplay!</p>
                <StatContainer>
                  {selectedPokemon.stats.map((stat) => (
                    <StatItemContainer key={stat.stat.name}>
                      <StatLabel>{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</StatLabel>
                      <StatValue>{stat.base_stat}</StatValue>
                    </StatItemContainer>
                  ))}
                </StatContainer>
              </SectionCard>
              <SectionCard>
                <h2>🤼 Combat Moves 🤼</h2>
                <p>Moves that can be learned by {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</p>
                <div>
                  <FilterButton
                    selected={movesFilter === 10}
                    onClick={() => setMovesFilter(10)}
                  >
                    Show First 10 Moves
                  </FilterButton>
                  <FilterButton
                    selected={movesFilter === 25}
                    onClick={() => setMovesFilter(25)}
                  >
                    Show 25 Moves
                  </FilterButton>
                  <FilterButton
                    selected={movesFilter === selectedPokemon.moves.length}
                    onClick={() =>
                      setMovesFilter(selectedPokemon.moves.length)
                    }
                  >
                    Show All Moves
                  </FilterButton>
                </div>
                <StatContainer>
                  {selectedPokemon.moves
                    .slice(0, movesFilter)
                    .map((move) => (
                      <StatItemContainer key={move.move.name}>
                        <StatLabel>
                          {move.move.name.charAt(0).toUpperCase() +
                            move.move.name.slice(1)}
                        </StatLabel>
                      </StatItemContainer>
                    ))}
                </StatContainer>
              </SectionCard>
            </CenteredSectionCards>
          </PokemonDetails>
        </div>
      )}
    </div>
  );
}
