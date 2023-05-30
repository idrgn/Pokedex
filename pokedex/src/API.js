const P = require("pokeapi-js-wrapper");

const customOptions = {
	versionPath: "/api/v2/",
	cache: true,
	timeout: 5 * 1000, // 5s
	cacheImages: true,
};

export const Pokedex = new P.Pokedex(customOptions);
