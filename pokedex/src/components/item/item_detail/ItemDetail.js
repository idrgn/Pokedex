import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getFlavorText, getItemText } from "../../../Helper";

import "./ItemDetail.css";

export const ItemDetail = (props) => {
	if (props.item === null) {
		return (
			<Card sx={{ height: "100%", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-around", justifyItems: "space-around" }}>
				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="h4">
					Selecciona un Objeto para ver sus detalles
				</Typography>
			</Card>
		);
	}

	return (
		<Card sx={{ height: "100%", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<CardContent>
				<Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: "20px", marginTop: "30px" }}>
					<CardMedia sx={{ height: "175px", width: "100%", paddingTop: "0.25em", objectFit: "contain" }} component="img" image={props.item.sprites.default} alt={getItemText(props.item.names)} />
				</Box>

				<Typography sx={{ fontSize: 14, textAlign: "center" }} color="text.secondary" gutterBottom>
					Nº {props.item.id}
				</Typography>

				<Typography sx={{ textAlign: "center" }} variant="h4" component="div">
					{getItemText(props.item.names)}
				</Typography>

				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.item.flavor_text_entries)}
				</Typography>
			</CardContent>
		</Card>
	);
};
