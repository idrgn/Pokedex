import { Grid } from "@mui/material";
import { useState } from "react";
import { PokemonCard } from "../pokemon_card/PokemonCard";

export const GridTypes = {
	Pokemon: "pokemon",
	Item: "item",
	Move: "move",
};

export const CardGrid = (props) => {
	if (props.type === GridTypes.Pokemon) return PokemonGrid(props.pokemonData);
	else return <></>;
};

export const PokemonGrid = (pokemonData) => {
	const [selected, setSelected] = useState(null);

	const onSelect = (id) => {
		setSelected(id);
	};

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{pokemonData.map((p) => (
				<Grid item onClick={() => onSelect(p.id)}>
					<PokemonCard pokemon={p} selected={p.id === selected}></PokemonCard>
				</Grid>
			))}
		</Grid>
	);
};
