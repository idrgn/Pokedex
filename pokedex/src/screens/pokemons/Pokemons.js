import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { customConcat } from "../../Helper";
import { GridTypes, PokemonGrid } from "../../components/card_grid/CardGrid";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Pokemons.css";
import { PokemonDetail } from "../../components/pokemon_detail/PokemonDetail";

export const Pokemons = () => {
	const amountPerPage = 20;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [pokemonData, setPokemonData] = useState(null);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
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
				setProcessedPokemonList((prevList) => customConcat(prevList, response.data));
			});
		}
	}, [currentIndex, pokemonData]);

	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	const onSelectionChanged = (p) => {
		setSelectedPokemon(p);
	};

	return (
		<div>
			<h1>Lista de Pokémons</h1>
			<div id="contenedor-listado-detalle">
				<div id="contenedor-lista-wrapper">
					<div id="contenedor-lista">
						<div id="lista-pokemon">
							<div id="lista-small-padding"></div>
							<PokemonGrid onSelectionChanged={onSelectionChanged} pokemonData={processedPokemonList} type={GridTypes.Pokemon}></PokemonGrid>
							{isDataLoaded ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
						</div>
					</div>
				</div>
				<div id="contenedor-detalle">
					<PokemonDetail pokemon={selectedPokemon} />
				</div>
			</div>
		</div>
	);
};
