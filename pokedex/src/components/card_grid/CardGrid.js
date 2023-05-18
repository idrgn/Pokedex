import { Grid } from "@mui/material";
import { PokemonCard } from "../pokemon_card/PokemonCard";

export const GridTypes = {
	Pokemon: "pokemon",
	Item: "item",
	Move: "move",
};

export const CardGrid = (props) => {
	if (props.type === GridTypes.Pokemon) return pokemonGrid(props.pokemonData);
	else return <></>;
};

const pokemonGrid = (pokemonData) => {
	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{pokemonData.map((p) => (
				<Grid item>
					<PokemonCard pokemon={p}></PokemonCard>
				</Grid>
			))}
		</Grid>
	);
};