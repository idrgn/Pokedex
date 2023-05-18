import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../Helper";

import "./PokemonCard.css";
import { PokemonType } from "../pokemon_type/PokemonType";

export const PokemonCard = (props) => {
	return (
		<Card sx={{ width: "200px", height: "225px", alignItems: "center", borderRadius: "10%" }} variant="outlined" className="pokemon-card">
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>
				<Typography variant="h5" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>
			</CardContent>
			<CardMedia component="img" height="75" width="75" image={getBestSprite(props.pokemon.sprites)} alt={props.pokemon.name} sx={{ paddingTop: "0.25em", objectFit: "contain" }} />
			<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
				{props.pokemon.types.map((t) => (
					<PokemonType type={t.type.name}></PokemonType>
				))}
			</CardContent>
		</Card>
	);
};

const getBestSprite = (sprites) => {
	if (sprites.hasOwnProperty("versions")) {
		for (let generationName in sprites.versions) {
			const generation = sprites.versions[generationName];
			for (let gameName in generation) {
				const game = generation[gameName];
				if (game.hasOwnProperty("animated")) {
					if (game.animated.front_default !== null) {
						return game.animated.front_default;
					}
				}
			}
		}
	}
	return sprites.front_default;
};
