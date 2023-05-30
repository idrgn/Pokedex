import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getFlavorText, getLightColor, getName } from "../../../Helper";
import { Type } from "../../type/Type";
import { MoveType } from "../move_type/MoveType";
import "./MoveCard.css";

export const MoveCard = (props) => {
	return (
		<Card sx={{ borderRadius: "10px" }} variant="outlined" className="move-card" style={{ backgroundColor: getLightColor("salmon") }}>
			<CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex" }}>
					<MoveType type={props.move.damage_class.name}></MoveType>
					<Typography sx={{ paddingLeft: "5px" }}>{getName(props.move.names)}</Typography>
				</Box>

				<Type type={props.move.type.name} size="sma"></Type>
			</CardContent>

			<CardContent>
				<Typography sx={{ fontSize: 14 }}>{getFlavorText(props.move.flavor_text_entries)}</Typography>
			</CardContent>

			<CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography>{`Daño: ${props.move.power ? props.move.power : "-"}`}</Typography>
				<Typography>{`Usos: ${props.move.pp ? props.move.pp : "-"}`}</Typography>
				<Typography>{`Precisión: ${props.move.chance ? props.move.chance : "-"}`}</Typography>
			</CardContent>
		</Card>
	);
};
