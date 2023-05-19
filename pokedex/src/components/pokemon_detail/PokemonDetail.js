import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter, getBestSprite } from "../../Helper";

import "./PokemonDetail.css";

export const PokemonDetail = (props) => {
	if (props.pokemon === null) return <></>;

	return (
		<Card sx={{ height: "100%" }}>
			<CardContent>
				<CardMedia sx={{ height: "50%", width: "50%" }} component="img" image={getBestSprite(props.pokemon.sprites)} alt="Paella dish" />

				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>

				<Typography variant="h5" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>

				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
		</Card>
	);
};
