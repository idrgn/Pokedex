/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Pokedex } from "../../API";
import { customConcat } from "../../Helper";
import { ItemGrid } from "../../components/card_grid/CardGrid";
import { ItemDetail } from "../../components/item_detail/ItemDetail";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Items.css";

export const Items = () => {
	const amountPerPage = 10;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemData, setItemData] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [processedItemList, setProcessedItemList] = useState([]);

	async function makeRequests() {
		const dataToProcess = itemData.results.map((obj) => obj.url).slice(currentIndex, currentIndex + amountPerPage);
		Pokedex.resource(dataToProcess)
			.then((response) => {
				setProcessedItemList((prevList) => customConcat(prevList, response));
				setIsLoadingNew(false);
			})
			.catch((error) => {
				setCurrentIndex((prevIndex) => prevIndex - amountPerPage);
				setIsLoadingNew(false);
			});
	}

	// Obtener la lista de objetos al cargar la página
	useEffect(() => {
		Pokedex.resource("/api/v2/item?limit=100000&offset=0")
			.then((response) => {
				setItemData(response);
				setIsDataLoaded(true);
			})
			.catch((error) => {
				setItemData([]);
			});
	}, []);

	// Cargar nuevos objetos al cambiar de índice
	useEffect(() => {
		if (itemData !== null) makeRequests();
	}, [currentIndex, itemData]);

	// Evento que se ejecuta cuando el usuario llega al fondo de la lista
	const onScroll = () => {
		setCurrentIndex((prevIndex) => prevIndex + amountPerPage);
	};

	// Evento que se ejecuta cuando cambia el objeto seleccionado
	const onSelectionChanged = (i) => {
		setSelectedItem(i);
	};

	return (
		<div className="contenedor-principal-listado">
			<h1 className="titulo-listado">{itemData ? `Listado de Objetos (${itemData.count} entradas)` : "Listado de Objetos"}</h1>
			<div className="contenedor-listado-detalle">
				<div className="contenedor-lista-wrapper">
					<div className="contenedor-lista">
						<div className="contenedor-cuadricula">
							<div className="lista-small-padding"></div>
							<ItemGrid onSelectionChanged={onSelectionChanged} itemData={processedItemList} />
							{isDataLoaded && !isLoadingNew ? <ScrollToElement onScrollToElement={onScroll} /> : <></>}
						</div>
					</div>
				</div>
				<div className="contenedor-detalle">
					<ItemDetail item={selectedItem} />
				</div>
			</div>
		</div>
	);
};
