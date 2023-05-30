/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Pokedex } from "../../API";
import { capitalizeFirstLetter, customConcat } from "../../Helper";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";
import { PokemonDetail } from "../../components/pokemon/pokemon_detail/PokemonDetail";
import { PokemonGrid } from "../../components/pokemon/pokemon_grid/PokemonGrid";

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
	const [searchValue, setSearchValue] = useState(null);
	const [searchInputValue, setSearchInputValue] = useState("");

	async function makeRequests() {
		const dataToProcess = pokemonData.results.map((obj) => obj.url).slice(currentIndex, currentIndex + amountPerPage);
		Pokedex.resource(dataToProcess)
			.then((response) => {
				setProcessedPokemonList((prevList) => customConcat(prevList, response));
				setIsLoadingNew(false);
			})
			.catch((error) => {
				setCurrentIndex((prevIndex) => prevIndex - amountPerPage);
				setIsLoadingNew(false);
			});
	}

	function mapPokemonList(p) {
		const pokemonId = p.url.split("/pokemon/")[1].slice(0, -1);
		return {
			label: `${pokemonId} - ${capitalizeFirstLetter(p.name)}`,
			id: pokemonId,
		};
	}

	// Obtener la lista de Pokémon al cargar la página
	useEffect(() => {
		Pokedex.getPokemonsList()
			.then((response) => {
				setPokemonData(response);
				setIsDataLoaded(true);
				setAutocompleteData(response.results.map(mapPokemonList));
			})
			.catch((error) => {
				setPokemonData([]);
			});
	}, []);

	// Cargar nuevos Pokémon al cambiar de índice
	useEffect(() => {
		if (pokemonData !== null) makeRequests();
	}, [currentIndex, pokemonData]);

	// Evento que se ejecuta al cambiar el Pokémon seleccionado en el menú superior
	useEffect(() => {
		if (searchValue === null) return;

		Pokedex.getPokemonByName(searchValue.id)
			.then((response) => {
				setSelectedPokemon(response);
			})
			.catch((error) => {
				setSelectedPokemon(null);
			});

		Pokedex.getPokemonSpeciesByName(searchValue.id)
			.then((response) => {
				setSelectedPokemonDetail(response);
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

		Pokedex.getPokemonSpeciesByName(p.id)
			.then((response) => {
				setSelectedPokemonDetail(response);
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
