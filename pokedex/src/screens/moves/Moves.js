import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { customConcat } from "../../Helper";
import { MoveGrid } from "../../components/card_grid/CardGrid";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Moves.css";

export const Moves = () => {
	const amountPerPage = 20;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [moveData, setMoveData] = useState(null);
	const [processedMoveList, setProcessedMoveList] = useState([]);

	async function makeRequests(index, data) {
		const requests = [];

		for (let entry of data.results.slice(index, index + amountPerPage)) {
			requests.push(
				axios.get(entry.url).then((response) => {
					if (response.status === 200) {
						setProcessedMoveList((prevList) => customConcat(prevList, response.data));
					}
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

	// Obtener la lista de movimientos al cargar la página
	useEffect(() => {
		axios
			.get(`${api_pokemon}move?limit=100000&offset=0`)
			.then((response) => {
				if (response.status === 200) {
					setMoveData(response.data);
					setIsDataLoaded(true);
				}
			})
			.catch((error) => {
				setMoveData([]);
			});
	}, []);

	// Cargar nuevos movimientos al cambiar de índice
	useEffect(() => {
		if (moveData === null) return;
		makeRequests(currentIndex, moveData);
	}, [currentIndex, moveData]);

	// Evento que se ejecuta cuando el usuario llega al fondo de la lista
	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	return (
		<div className="contenedor-principal-listado">
			<h1 className="titulo-listado">{moveData ? `Listado de Movimientos (${moveData.count} entradas)` : "Listado de Objetos"}</h1>
			<div className="contenedor-listado-detalle">
				<div className="contenedor-lista-wrapper">
					<div className="contenedor-lista">
						<div className="contenedor-cuadricula">
							<div className="lista-small-padding"></div>
							<MoveGrid moveData={processedMoveList} />
							{isDataLoaded && !isLoadingNew ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
