/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Pokedex } from "../../API";
import { customConcat } from "../../Helper";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Moves.css";
import { MoveGrid } from "../../components/move/move_grid/MoveGrid";

export const Moves = () => {
	const amountPerPage = 30;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [moveData, setMoveData] = useState(null);
	const [processedMoveList, setProcessedMoveList] = useState([]);

	async function makeRequests(index, data) {
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

	// Obtener la lista de movimientos al cargar la página
	useEffect(() => {
		Pokedex.getMovesList().then((response) => {
			setMoveData(response);
			setIsDataLoaded(true);
		});
	}, []);

	// Cargar nuevos movimientos al cambiar de índice
	useEffect(() => {
		if (moveData !== null) makeRequests();
	}, [currentIndex, moveData]);

	// Evento que se ejecuta cuando el usuario llega al fondo de la lista
	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	return (
		<div className="contenedor-principal-listado">
			<h1 className="titulo-listado">{moveData ? `Listado de Movimientos (${moveData.count} entradas)` : "Listado de Objetos"}</h1>
			<div className="contenedor-lista-wrapper moves">
				<div className="contenedor-lista">
					<div className="contenedor-cuadricula">
						<div className="lista-small-padding"></div>
						<MoveGrid moveData={processedMoveList} />
						{isDataLoaded && !isLoadingNew ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
					</div>
				</div>
			</div>
		</div>
	);
};
