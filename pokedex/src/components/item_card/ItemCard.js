import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getItemText } from "../../Helper";

import "./ItemCard.css";

export const ItemCard = (props) => {
	return (
		<Card sx={{ borderRadius: "10px" }} variant="outlined" className="item-card" style={{ backgroundColor: props.selected ? "lightblue" : "azure", transition: "background-color 0.5s" }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.item.id}
				</Typography>
				<Typography variant="h5" component="div">
					{getItemText(props.item.names)}
				</Typography>
			</CardContent>
			<CardMedia component="img" height="75" width="75" image={props.item.sprites.default} alt={getItemText(props.item.names)} sx={{ paddingTop: "0.25em", objectFit: "contain" }} />
		</Card>
	);
};
