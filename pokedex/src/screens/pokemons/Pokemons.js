import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { CardGrid, GridTypes } from "../../components/card_grid/CardGrid";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

export const Pokemons = () => {
	const amountPerPage = 20;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [pokemonData, setPokemonData] = useState(null);
	const [processedPokemonList, setProcessedPokemonList] = useState([]);

	useEffect(() => {
		axios.get(`${api_pokemon}pokemon?limit=100000&offset=0`).then((response) => {
			setPokemonData(response.data);
			setIsDataLoaded(true);
		});
	}, []);

	useEffect(() => {
		if (pokemonData === null) return;

		for (let entry of pokemonData.results.slice(currentIndex, currentIndex + amountPerPage)) {
			axios.get(entry.url).then((response) => {
				setProcessedPokemonList((prevList) => prevList.concat(response.data).sort((a, b) => (a.id > b.id ? 1 : -1)));
			});
		}
	}, [currentIndex, pokemonData]);

	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	return (
		<div>
			<h1>Lista de Pokémons</h1>
			<CardGrid pokemonData={processedPokemonList} type={GridTypes.Pokemon}></CardGrid>
			{isDataLoaded ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
		</div>
	);
};
