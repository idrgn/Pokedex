import { Grid } from "@mui/material";
import { useState } from "react";
import { ItemCard } from "../item_card/ItemCard";
import { PokemonCard } from "../pokemon_card/PokemonCard";

import "./CardGrid.css";
import { MoveCard } from "../move_card/MoveCard";

export const GridTypes = {
	Pokemon: "pokemon",
	Item: "item",
	Move: "move",
};

export const CardGrid = (props) => {
	if (props.type === GridTypes.Pokemon) return PokemonGrid(props);
	else return <></>;
};

export const PokemonGrid = (props) => {
	const [selected, setSelected] = useState(null);

	const onSelect = (p) => {
		if (selected !== p.id) {
			setSelected(p.id);
			if (props.hasOwnProperty("onSelectionChanged")) {
				props.onSelectionChanged(p);
			}
		}
	};

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{props.pokemonData.map((p) => (
				<Grid item onClick={() => onSelect(p)} className="pokemon-grid-container">
					<PokemonCard pokemon={p} selected={p.id === selected} animated={props.animated}></PokemonCard>
				</Grid>
			))}
		</Grid>
	);
};

export const ItemGrid = (props) => {
	const [selected, setSelected] = useState(null);

	const onSelect = (i) => {
		if (selected !== i.id) {
			setSelected(i.id);
			if (props.hasOwnProperty("onSelectionChanged")) {
				props.onSelectionChanged(i);
			}
		}
	};

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{props.itemData.map((i) => (
				<Grid item onClick={() => onSelect(i)} className="item-grid-container">
					<ItemCard item={i} selected={i.id === selected}></ItemCard>
				</Grid>
			))}
		</Grid>
	);
};

export const MoveGrid = (props) => {
	const [selected, setSelected] = useState(null);

	const onSelect = (i) => {
		if (selected !== i.id) {
			setSelected(i.id);
			if (props.hasOwnProperty("onSelectionChanged")) {
				props.onSelectionChanged(i);
			}
		}
	};

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{props.moveData.map((m) => (
				<Grid item onClick={() => onSelect(m)} className="item-grid-container">
					<MoveCard move={m} selected={m.id === selected}></MoveCard>
				</Grid>
			))}
		</Grid>
	);
};
