//Your data modules to make the Axios calls and get the data

const axios = require('axios');

async function getPokemon() {
    const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return data;
};

const pokemon = async () => {
    const pokemonData = await getPokemon();
    return pokemonData;
};

const pokemonById = async (id) => {
    id = id.trim();
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return data;
};

module.exports = {pokemon, pokemonById};