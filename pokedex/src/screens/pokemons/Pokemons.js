import { Autocomplete, FormControlLabel, Switch, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { capitalizeFirstLetter, customConcat } from "../../Helper";
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
	const [autocompleteData, setAutocompleteData] = useState([]);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [selectedPokemonDetail, setSelectedPokemonDetail] = useState(null);
	const [processedPokemonList, setProcessedPokemonList] = useState([]);
	const [, setUnprocessedList] = useState([]);
	const [searchValue, setSearchValue] = useState(null);
	const [searchInputValue, setSearchInputValue] = useState("");

	async function makeRequests(index, data) {
		const requests = [];

		for (let entry of data.results.slice(index, index + amountPerPage)) {
			requests.push(
				axios
					.get(entry.url)
					.then((response) => {
						if (response.status === 200) {
							setProcessedPokemonList((prevList) => customConcat(prevList, response.data));
						}
					})
					.catch((error) => {
						setUnprocessedList((prevList) => customConcat(prevList, entry.url));
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
		axios
			.get(`${api_pokemon}pokemon?limit=100000&offset=0`)
			.then((response) => {
				if (response.status === 200) {
					setPokemonData(response.data);

					setAutocompleteData(
						response.data.results.map((p) => {
							const pokemonId = p.url.split("/pokemon/")[1].slice(0, -1);
							return {
								label: `${pokemonId} - ${capitalizeFirstLetter(p.name)}`,
								id: pokemonId,
							};
						})
					);

					setIsDataLoaded(true);
				}
			})
			.catch((error) => {
				setPokemonData([]);
			});
	}, []);

	// Cargar nuevos Pokémon al cambiar de índice
	useEffect(() => {
		if (pokemonData === null) return;
		makeRequests(currentIndex, pokemonData);
	}, [currentIndex, pokemonData]);

	// Evento que se ejecuta al cambiar el Pokémon seleccionado en el menú superior
	useEffect(() => {
		if (searchValue === null) return;

		axios
			.get(`${api_pokemon}pokemon/${searchValue.id}`)
			.then((response) => {
				if (response.status === 200) {
					setSelectedPokemon(response.data);
				}
			})
			.catch((error) => {
				setSelectedPokemon(null);
			});

		axios
			.get(`${api_pokemon}pokemon-species/${searchValue.id}`)
			.then((response) => {
				if (response.status === 200) {
					setSelectedPokemonDetail(response.data);
				}
			})
			.catch((error) => {
				setSelectedPokemonDetail(null);
			});
	}, [searchValue]);

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

		axios
			.get(`${api_pokemon}pokemon-species/${p.id}`)
			.then((response) => {
				if (response.status === 200) {
					setSelectedPokemonDetail(response.data);
				}
			})
			.catch((error) => {
				setSelectedPokemonDetail(null);
			});
	};

	return (
		<div className="contenedor-principal-listado">
			<h1 className="titulo-listado">Listado de Pokémons</h1>
			<div className="contenedor-controles">
				<FormControlLabel control={<Switch checked={loadGifs} onChange={loadGifsChanged} name="loadgif" />} label="Cargar imágenes animadas" />
				<Autocomplete
					value={searchValue}
					onChange={(event, newValue) => {
						setSearchValue(newValue);
					}}
					inputValue={searchInputValue}
					onInputChange={(event, newInputValue) => {
						setSearchInputValue(newInputValue);
					}}
					disablePortal
					id="combo-box"
					options={autocompleteData}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Pokémon" />}
				/>
			</div>

			<div className="contenedor-listado-detalle">
				<div className="contenedor-lista-wrapper">
					<div className="contenedor-lista">
						<div className="contenedor-cuadricula">
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
