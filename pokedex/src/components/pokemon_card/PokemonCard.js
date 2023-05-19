import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter, getBestSprite } from "../../Helper";
import { PokemonType } from "../pokemon_type/PokemonType";

import "./PokemonCard.css";

export const PokemonCard = (props) => {
	return (
		<Card sx={{ width: "200px", height: "225px", alignItems: "center", borderRadius: "10%" }} variant="outlined" className="pokemon-card" style={{ backgroundColor: props.selected ? "lightblue" : "inherit" }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>
				<Typography variant="h5" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>
			</CardContent>
			<CardMedia component="img" height="75" width="75" image={props.animated ? getBestSprite(props.pokemon.sprites) : props.pokemon.sprites.front_default} alt={props.pokemon.name} sx={{ paddingTop: "0.25em", objectFit: "contain" }} />
			<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
				{props.pokemon.types.map((t) => (
					<PokemonType type={t.type.name}></PokemonType>
				))}
			</CardContent>
		</Card>
	);
};
