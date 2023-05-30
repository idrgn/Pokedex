import { Toll } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getName, getLightColor } from "../../../Helper";

import "./ItemCard.css";

export const ItemCard = (props) => {
	return (
		<Card sx={{ borderRadius: "10px" }} variant="outlined" className="item-card" style={{ backgroundColor: props.selected ? "palegreen" : getLightColor("palegreen"), transition: "background-color 0.5s" }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.item.id}
				</Typography>
				<Typography variant="h5" component="div">
					{getName(props.item.names)}
				</Typography>
			</CardContent>
			<CardMedia component="img" height="75" width="75" image={props.item.sprites.default} alt={getName(props.item.names)} sx={{ paddingTop: "0.25em", objectFit: "contain" }} />

			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography sx={{ fontSize: 14 }} color="text.secondary">
						{props.item.cost}
					</Typography>
					<Box sx={{ width: "5px" }}></Box>
					<Toll fontSize="10" />
				</Box>
			</CardContent>
		</Card>
	);
};
