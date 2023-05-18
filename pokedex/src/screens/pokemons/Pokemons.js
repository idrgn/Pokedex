import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { CardGrid, GridTypes } from "../../components/card_grid/CardGrid";

export const Pokemons = () => {
	const amountPerPage = 20;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [pokemonData, setPokemonData] = useState(null);
	const [processedPokemonList, setProcessedPokemonList] = useState([]);

	useEffect(() => {
		axios.get(`${api_pokemon}pokemon?limit=100000&offset=0`).then((response) => {
			setPokemonData(response.data);
		});
	}, []);

	useEffect(() => {
		if (pokemonData === null) return;

		for (let entry of pokemonData.results.slice(currentIndex, currentIndex + amountPerPage)) {
			axios.get(entry.url).then((response) => {
				setProcessedPokemonList((prevList) => prevList.concat(response.data));
			});
		}

		// setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	}, [currentIndex, pokemonData]);

	return (
		<div>
			<h1>Lista de Pokémons</h1>
			<CardGrid pokemonData={processedPokemonList} type={GridTypes.Pokemon}></CardGrid>
		</div>
	);
};
