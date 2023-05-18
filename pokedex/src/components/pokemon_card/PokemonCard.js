import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export const PokemonCard = (props) => {
	console.log("Rendering pokemon card");
	return (
		<Card>
			<CardContent>
				<Typography variant="h5" component="div">
					{props.pokemon.name}
				</Typography>
				<CardMedia component="img" height="150" width="150" image={props.pokemon.sprites.front_default} alt={props.pokemon.name} sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }} />
			</CardContent>
		</Card>
	);
};
