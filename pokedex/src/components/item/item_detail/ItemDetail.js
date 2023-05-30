import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getFlavorText, getLightColor, getName } from "../../../Helper";
import { Box } from "@mui/system";

import "./ItemDetail.css";

export const ItemDetail = (props) => {
	if (props.item === null) {
		return (
			<Card sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", justifyItems: "space-around" }}>
				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="h4">
					Selecciona un Objeto para ver sus detalles
				</Typography>
			</Card>
		);
	}

	return (
		<Card sx={{ backgroundColor: getLightColor("lightgreen") }} className="item-detail-container">
			<Box sx={{ display: "flex" }}>
				<CardContent className="item-detail-box">
					<CardMedia sx={{ height: "100px", width: "100%", objectFit: "contain" }} component="img" image={props.item.sprites.default} alt={getName(props.item.names)} />
				</CardContent>
				<CardContent className="item-detail-box">
					<Typography sx={{ textAlign: "center" }} variant="h4" component="div">
						{getName(props.item.names)}
					</Typography>
				</CardContent>
			</Box>

			<CardContent className="item-detail-box">
				<Typography sx={{ textAlign: "center", padding: "20px" }} variant="body2" component="div">
					{getFlavorText(props.item.flavor_text_entries)}
				</Typography>
			</CardContent>
		</Card>
	);
};
