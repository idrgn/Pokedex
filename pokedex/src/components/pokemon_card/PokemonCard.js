import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter } from "../../Helper";

export const PokemonCard = (props) => {
	return (
		<Card>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>
				<Typography variant="h5" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>
				<CardMedia component="img" height="75" width="75" image={getBestSprite(props.pokemon.sprites)} alt={props.pokemon.name} sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} />
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
