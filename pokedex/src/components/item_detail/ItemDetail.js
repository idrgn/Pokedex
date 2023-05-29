import { Card, CardContent, Typography } from "@mui/material";
import { getFlavorText } from "../../Helper";

import "./ItemDetail.css";

export const ItemDetail = (props) => {
	if (props.item === null) {
		return (
			<Card sx={{ height: "100%", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-around", justifyItems: "space-around" }}>
				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="h4">
					Selecciona un Pokémon para ver sus detalles
				</Typography>
			</Card>
		);
	}

	return (
		<Card sx={{ height: "100%", minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<CardContent>
				<Typography sx={{ fontSize: 14, textAlign: "center" }} color="text.secondary" gutterBottom>
					Nº {props.item.id}
				</Typography>

				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.item.flavor_text_entries)}
				</Typography>
			</CardContent>
		</Card>
	);
};
