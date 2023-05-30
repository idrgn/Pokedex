import { Card, CardContent, Typography } from "@mui/material";
import { getFlavorText, getLightColor, getName } from "../../../Helper";

import "./MoveCard.css";
import { MoveType } from "../move_type/MoveType";

export const MoveCard = (props) => {
	return (
		<Card sx={{ borderRadius: "10px" }} variant="outlined" className="move-card" style={{ backgroundColor: getLightColor("red") }}>
			<CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>{getName(props.move.names)}</Typography>
				<MoveType type={props.move.damage_class.name}></MoveType>
			</CardContent>

			<CardContent>
				<Typography sx={{ fontSize: 14 }}>{getFlavorText(props.move.flavor_text_entries)}</Typography>
			</CardContent>
		</Card>
	);
};
