import { Card, CardContent, Typography } from "@mui/material";
import { getLightColor } from "../../Helper";

import "./MoveCard.css";

export const MoveCard = (props) => {
	return (
		<Card sx={{ borderRadius: "10px" }} variant="outlined" className="move-card" style={{ backgroundColor: getLightColor("red") }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Nº {props.move.id}
				</Typography>
				<Typography sx={{ fontSize: 14 }}>Nº {props.move.name}</Typography>
			</CardContent>
		</Card>
	);
};
