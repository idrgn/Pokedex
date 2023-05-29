import axios from "axios";
import { useEffect, useState } from "react";
import { api_pokemon } from "../../API";
import { customConcat } from "../../Helper";
import { ItemGrid } from "../../components/card_grid/CardGrid";
import { ItemDetail } from "../../components/item_detail/ItemDetail";
import { ScrollToElement } from "../../components/scroll_to_element/ScrollToElement";

import "./Items.css";

export const Items = () => {
	const amountPerPage = 20;

	const [isDataLoaded, setIsDataLoaded] = useState(false);
	const [isLoadingNew, setIsLoadingNew] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemData, setItemData] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [processedItemList, setProcessedItemList] = useState([]);

	async function makeRequests(index, data) {
		const requests = [];

		for (let entry of data.results.slice(index, index + amountPerPage)) {
			requests.push(
				axios.get(entry.url).then((response) => {
					if (response.status === 200) {
						setProcessedItemList((prevList) => customConcat(prevList, response.data));
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

	// Obtener la lista de objetos al cargar la página
	useEffect(() => {
		axios
			.get(`${api_pokemon}item?limit=100000&offset=0`)
			.then((response) => {
				if (response.status === 200) {
					setItemData(response.data);
					setIsDataLoaded(true);
				}
			})
			.catch((error) => {
				setItemData([]);
			});
	}, []);

	// Cargar nuevos objetos al cambiar de índice
	useEffect(() => {
		if (itemData === null) return;
		makeRequests(currentIndex, itemData);
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
