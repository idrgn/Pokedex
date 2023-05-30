const P = require("pokeapi-js-wrapper");

const customOptions = {
	cache: true,
	timeout: 10 * 1000,
};

export const Pokedex = new P.Pokedex(customOptions);
