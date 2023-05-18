export type Pokemon = {
    name: string,
    picture: string,
    description: string,
};

export type Client = {
    getPokemon: () => Promise<Pokemon>,
};
