import { Grid } from "@mui/material";
import { useState } from "react";
import { MoveCard } from "../move_card/MoveCard";

export const MoveGrid = (props) => {
	const [selected, setSelected] = useState(null);

	const onSelect = (i) => {
		if (selected !== i.id) {
			setSelected(i.id);
			if (props.hasOwnProperty("onSelectionChanged")) {
				props.onSelectionChanged(i);
			}
		}
	};

	return (
		<Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
			{props.moveData.map((m) => (
				<Grid item onClick={() => onSelect(m)} className="item-grid-container">
					<MoveCard move={m} selected={m.id === selected}></MoveCard>
				</Grid>
			))}
		</Grid>
	);
};
