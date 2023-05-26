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
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [pokemonData, setPokemonData] = useState(null);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [selectedPokemonDetail, setSelectedPokemonDetail] = useState(null);
	const [processedPokemonList, setProcessedPokemonList] = useState([]);

	async function makeRequests(index, data) {
		const requests = [];

		for (let entry of data.results.slice(index, index + amountPerPage)) {
			requests.push(
				axios.get(entry.url).then((response) => {
					setProcessedPokemonList((prevList) => customConcat(prevList, response.data));
				})
			);
		}

		try {
			await Promise.all(requests);
		} catch (error) {
			setCurrentIndex((prevIndex) => prevIndex - amountPerPage);
		} finally {
			setIsLoadingNew(false);
		}
	}

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
		makeRequests(currentIndex, pokemonData);
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

		axios.get(`${api_pokemon}pokemon-species/${p.id}`).then((response) => {
			setSelectedPokemonDetail(response.data);
		});
	};

	return (
		<div className="pokedex-list-main-container">
			<h1 className="listado-pokemon-titulo">Listado de Pokémons</h1>
			<div className="controles-pokemon">
				<FormControlLabel control={<Switch checked={loadGifs} onChange={loadGifsChanged} name="loadgif" />} label="Cargar imágenes animadas" />
			</div>
			<div className="contenedor-listado-detalle">
				<div className="contenedor-lista-wrapper">
					<div className="contenedor-lista">
						<div className="lista-pokemon">
							<div className="lista-small-padding"></div>
							<PokemonGrid onSelectionChanged={onSelectionChanged} pokemonData={processedPokemonList} animated={loadGifs}></PokemonGrid>
							{isDataLoaded && !isLoadingNew ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
						</div>
					</div>
				</div>
				<div className="contenedor-detalle">
					<PokemonDetail pokemon={selectedPokemon} detail={selectedPokemonDetail} />
				</div>
			</div>
		</div>
	);
};
