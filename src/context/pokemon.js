import React, { useState, useEffect } from "react";

const PokemonContext = React.createContext();

function PokemonProvider({ children }) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=1025/").then((response) => {
            if (response.ok) {
                response.json().then((pokemon) => setPokemon(pokemon.results));
            }
        });
    }, []);

    return <PokemonContext.Provider value={{ pokemon, setPokemon }}>{children}</PokemonContext.Provider>
}

export { PokemonContext, PokemonProvider };