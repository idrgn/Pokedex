import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter, getBestSprite, getFlavorText, getGeneraText, getLightColor } from "../../Helper";
import { PokemonStats } from "../pokemon_stats/PokemonStats";
import { PokemonType } from "../pokemon_type/PokemonType";

import "./PokemonDetail.css";

export const PokemonDetail = (props) => {
	if (props.pokemon === null || props.detail === null) {
		return (
			<Card sx={{ height: "100%", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-around", justifyItems: "space-around" }}>
				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="h4">
					Selecciona un Pokémon para ver sus detalles
				</Typography>
			</Card>
		);
	}

	return (
		<Card sx={{ height: "100%", minHeight: "80vh", backgroundColor: getLightColor(props.detail.color.name), display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", marginTop: "30px" }}>
					<CardMedia sx={{ height: "35%", width: "35%" }} component="img" image={getBestSprite(props.pokemon.sprites)} alt="Paella dish" />
				</Box>

				<Typography sx={{ fontSize: 14, textAlign: "center" }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>

				<Typography sx={{ textAlign: "center" }} variant="h4" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>

				<Typography sx={{ textAlign: "center" }} color="text.secondary" variant="body2" component="div">
					{getGeneraText(props.detail.genera)}
				</Typography>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					{props.pokemon.types.map((t) => (
						<PokemonType type={t.type.name} size="big"></PokemonType>
					))}
				</CardContent>

				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.detail.flavor_text_entries)}
				</Typography>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					{props.pokemon.abilities.map((a) => (
						<Typography>{capitalizeFirstLetter(a.ability.name)}</Typography>
					))}
				</CardContent>

				<CardContent>
					<PokemonStats stats={props.pokemon.stats}></PokemonStats>
				</CardContent>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					<Typography sx={{ textAlign: "center" }} component="div">
						{`Altura: ${props.pokemon.height}`}
					</Typography>
					<Typography sx={{ textAlign: "center" }} component="div">
						{`Peso: ${props.pokemon.weight}`}
					</Typography>
				</CardContent>
			</CardContent>
		</Card>
	);
};
