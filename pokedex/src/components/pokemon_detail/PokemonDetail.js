import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter, getBestSprite, getFlavorText } from "../../Helper";

import "./PokemonDetail.css";

export const PokemonDetail = (props) => {
	if (props.pokemon === null || props.detail === null) return <></>;

	return (
		<Card sx={{ height: "100%" }}>
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

				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.detail.flavor_text_entries)}
				</Typography>
			</CardContent>
		</Card>
	);
};
