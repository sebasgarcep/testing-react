import type { Pokemon } from "./types";

export async function getPokemon(): Promise<Pokemon> {
    const [pokemon, species] = await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon/1")
            .then(response => response.json()),
        fetch("https://pokeapi.co/api/v2/pokemon-species/1")
            .then(response => response.json()),
    ]);

    return {
        name: pokemon.name,
        picture: pokemon.sprites.front_default,
        description: species.flavor_text_entries[0].flavor_text,
    };
}
