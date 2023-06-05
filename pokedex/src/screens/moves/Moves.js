/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokedex } from "../../API";
import { PokemonTypes } from "../../Data";
import { capitalizeFirstLetter, customConcat } from "../../Helper";
import { LoadingIndicator } from "../../components/loading_indicator/LoadingIndicator";
import { MoveGrid } from "../../components/move/move_grid/MoveGrid";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Moves.css";

export const Moves = () => {
	const params = useParams();

	const amountPerPage = 30;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [moveData, setMoveData] = useState(null);
	const [processedMoveList, setProcessedMoveList] = useState([]);
	const [autocompleteData, setAutocompleteData] = useState([]);
	const [searchValue, setSearchValue] = useState(null);
	const [searchInputValue, setSearchInputValue] = useState("");
	const [searchValueType, setSearchValueType] = useState(null);
	const [searchInputValueType, setSearchInputValueType] = useState("");
	const [endReached, setEndReached] = useState(false);
	const [searchText, setSearchText] = useState(null);

	async function makeRequests() {
		setIsLoadingNew(true);
		const dataToProcess = moveData.results.map((obj) => obj.url).slice(currentIndex, currentIndex + amountPerPage);
		Pokedex.resource(dataToProcess)
			.then((response) => {
				setProcessedMoveList((prevList) => customConcat(prevList, response));
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
			id: p.name,
		};
	}

	// Obtener la lista de movimientos al cargar la página
	useEffect(() => {
		Pokedex.getMovesList().then((response) => {
			setMoveData(response);
			setIsDataLoaded(true);
		});

		Pokedex.getPokemonsList().then((response) => {
			setAutocompleteData(response.results.map(mapPokemonList));
		});
	}, []);

	// Cargar nuevos movimientos al cambiar de índice
	useEffect(() => {
		if (moveData !== null) {
			if (currentIndex > moveData.count) {
				setEndReached(true);
			} else {
				makeRequests();
			}
		}
	}, [currentIndex, moveData]);

	// Evento que se ejecuta cuando el usuario llega al fondo de la lista
	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	return (
		<div className="contenedor-principal-listado">
			<h1 className="titulo-listado">{params.pokemon ? `Listado de Movimientos de ${capitalizeFirstLetter(params.pokemon)}` : moveData ? `Listado de Movimientos (${moveData.count} entradas)` : "Listado de Movimientos"}</h1>

			<div className="contenedor-controles">
				<TextField
					id="text-field-name"
					label="Filtrar por nombre"
					variant="outlined"
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
				/>

				<Autocomplete
					hidden={params.pokemon != null}
					className="control"
					value={searchValue}
					onChange={(event, newValue) => {
						setSearchValue(newValue);
					}}
					inputValue={searchInputValue}
					onInputChange={(event, newInputValue) => {
						setSearchInputValue(newInputValue);
					}}
					disablePortal
					id="combo-box-pokemon"
					options={autocompleteData}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Buscar por Pokémon" />}
				/>

				<Autocomplete
					className="control"
					value={searchValueType}
					onChange={(event, newValue) => {
						setSearchValueType(newValue);
					}}
					inputValue={searchInputValueType}
					onInputChange={(event, newInputValue) => {
						setSearchInputValueType(newInputValue);
					}}
					disablePortal
					id="combo-box-types"
					options={PokemonTypes}
					sx={{ width: 300 }}
					renderInput={(params) => <TextField {...params} label="Filtrar por tipo" />}
				/>
			</div>

			<div className="contenedor-lista-wrapper moves">
				<div className="contenedor-lista">
					<div className="contenedor-cuadricula">
						<div className="lista-small-padding"></div>
						<MoveGrid moveData={processedMoveList} type={searchValueType} name={searchText} pokemon={params.pokemon ? { id: params.pokemon } : searchValue} />
						{isDataLoaded && !isLoadingNew ? <ScrollToElement onScrollToElement={onScroll} /> : <div className="small-div"></div>}
						{endReached ? <></> : <LoadingIndicator />}
					</div>
				</div>
			</div>
		</div>
	);
};
