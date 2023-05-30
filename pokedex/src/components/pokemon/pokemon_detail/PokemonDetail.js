import { Height, Scale, Star, VisibilityOff } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { capitalizeFirstLetter, getBestSprite, getFlavorText, getGeneraText, getLightColor } from "../../../Helper";
import { PokemonStats } from "../pokemon_stats/PokemonStats";

import "./PokemonDetail.css";
import { PokemonType } from "../../type/Type";

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
		<Card sx={{ height: "100%", minHeight: "80vh", backgroundColor: getLightColor(props.detail.color.name), display: "flex", flexDirection: "column", justifyContent: "space-around", transition: "background-color 0.5s" }}>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", marginTop: "30px" }}>
					<CardMedia sx={{ height: "175px", width: "100%", paddingTop: "0.25em", objectFit: "contain" }} component="img" image={getBestSprite(props.pokemon.sprites)} alt={props.pokemon.name} />
				</Box>

				<Typography sx={{ fontSize: 14, textAlign: "center" }} color="text.secondary" gutterBottom>
					Nº {props.pokemon.id}
				</Typography>

				<Typography sx={{ textAlign: "center" }} variant="h4" component="div">
					{capitalizeFirstLetter(props.pokemon.name)}
				</Typography>

				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Typography sx={{ textAlign: "center" }} color="text.secondary" variant="body2" component="div">
						{getGeneraText(props.detail.genera)}
					</Typography>
					{props.detail.is_legendary ? <Star sx={{ marginLeft: "5px" }} fontSize="14px" color="disabled" /> : <></>}
				</Box>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					{props.pokemon.types.map((t) => (
						<PokemonType type={t.type.name} size="big"></PokemonType>
					))}
				</CardContent>

				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.detail.flavor_text_entries)}
				</Typography>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }} className="ability-container">
					{props.pokemon.abilities.map((a) => (
						<Box className="ability-single">
							<Typography>{capitalizeFirstLetter(a.ability.name)}</Typography>
							{a.is_hidden ? <VisibilityOff sx={{ marginLeft: "5px" }} fontSize="14px" color="disabled" /> : <></>}
						</Box>
					))}
				</CardContent>

				<CardContent>
					<PokemonStats stats={props.pokemon.stats}></PokemonStats>
				</CardContent>

				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					<Box className="measure-single">
						<Height sx={{ marginRight: "10px" }} />
						<Typography sx={{ textAlign: "center" }} component="div">
							{`Altura: ${props.pokemon.height} dm`}
						</Typography>
					</Box>

					<Box className="measure-single">
						<Scale sx={{ marginRight: "10px" }} />
						<Typography sx={{ textAlign: "center" }} component="div">
							{`Peso: ${props.pokemon.weight} hg`}
						</Typography>
					</Box>
				</CardContent>
			</CardContent>
		</Card>
	);
};