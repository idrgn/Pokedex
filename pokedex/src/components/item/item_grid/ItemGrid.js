import { Grid } from "@mui/material";
import { useState } from "react";
import { ItemCard } from "../item_card/ItemCard";

import "./ItemGrid.css";

export const ItemGrid = (props) => {
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
			{props.itemData.map((i) => (
				<Grid item onClick={() => onSelect(i)} className="item-grid-container">
					<ItemCard item={i} selected={i.id === selected}></ItemCard>
				</Grid>
			))}
		</Grid>
	);
};
