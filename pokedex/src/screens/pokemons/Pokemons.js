import { FormControlLabel, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { customConcat } from "../../Helper";
import { PokemonGrid } from "../../components/card_grid/CardGrid";
import { PokemonDetail } from "../../components/pokemon_detail/PokemonDetail";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Pokemons.css";

export const Pokemons = () => {
	const amountPerPage = 20;

	const [loadGifs, setLoadGifs] = useState(false);
	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [pokemonData, setPokemonData] = useState(null);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [selectedPokemonDetail, setSelectedPokemonDetail] = useState(null);
	const [processedPokemonList, setProcessedPokemonList] = useState([]);

	// Obtener la lista de Pokémon al cargar la página
	useEffect(() => {
		axios.get(`${api_pokemon}pokemon?limit=100000&offset=0`).then((response) => {
			setPokemonData(response.data);
			setIsDataLoaded(true);
		});
	}, []);

	// Cargar nuevos Pokémon al cambiar de índice
	useEffect(() => {
		if (pokemonData === null) return;

		for (let entry of pokemonData.results.slice(currentIndex, currentIndex + amountPerPage)) {
			axios.get(entry.url).then((response) => {
				setProcessedPokemonList((prevList) => customConcat(prevList, response.data));
			});
		}
	}, [currentIndex, pokemonData]);

	// Evento que se ejecuta cuando el usuario llega al fondo de la lista
	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	// Evento que se ejecuta al cambiar el switch de cargar GIFs
	const loadGifsChanged = (event) => {
		setLoadGifs(event.target.checked);
	};

	// Evento que se ejecuta cuando cambia el Pokémon seleccionado
	const onSelectionChanged = (p) => {
		setSelectedPokemon(p);
		setSelectedPokemonDetail(null);

		axios.get(`${api_pokemon}pokemon-species/${p.id}`).then((response) => {
			setSelectedPokemonDetail(response.data);
		});
	};

	return (
		<div>
			<h1 id="listado-pokemon-titulo">Listado de Pokémons</h1>
			<div id="controles-pokemon">
				<FormControlLabel control={<Switch checked={loadGifs} onChange={loadGifsChanged} name="loadgif" />} label="Cargar imágenes animadas" />
			</div>
			<div id="contenedor-listado-detalle">
				<div id="contenedor-lista-wrapper">
					<div id="contenedor-lista">
						<div id="lista-pokemon">
							<div id="lista-small-padding"></div>
							<PokemonGrid onSelectionChanged={onSelectionChanged} pokemonData={processedPokemonList} animated={loadGifs}></PokemonGrid>
							{isDataLoaded ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
						</div>
					</div>
				</div>
				<div id="contenedor-detalle">
					<PokemonDetail pokemon={selectedPokemon} detail={selectedPokemonDetail} />
				</div>
			</div>
		</div>
	);
};
