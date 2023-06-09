import { Grid } from "@mui/material";
import { useState } from "react";
import { PokemonCard } from "../pokemon_card/PokemonCard";

import "./PokemonGrid.css";

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

	let pokemonData = props.pokemonData;

	if (props.type !== null) {
		pokemonData = pokemonData.filter((p) => {
			for (let entry of p.types) {
				if (props.type.id === entry.type.name) return true;
			}
			return false;
		});
	}

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{pokemonData.map((p) => (
				<Grid item onClick={() => onSelect(p)} className="pokemon-grid-container">
					<PokemonCard pokemon={p} selected={p.id === selected} animated={props.animated}></PokemonCard>
				</Grid>
			))}
		</Grid>
	);
};
