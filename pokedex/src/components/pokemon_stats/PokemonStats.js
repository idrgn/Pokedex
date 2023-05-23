import { Box, Tooltip } from "@mui/material";

import "./PokemonStats.css";

const statNames = {
	hp: "Vida",
	attack: "Ataque",
	defense: "Defensa",
	"special-attack": "Ataque especial",
	"special-defense": "Defensa especial",
	speed: "Velocidad",
};

const shortStatNames = {
	hp: "PV",
	attack: "Atk",
	defense: "Def",
	"special-attack": "AtS",
	"special-defense": "DefS",
	speed: "Vel",
};

export const PokemonStats = (props) => {
	return (
		<Box className="all-stat-container">
			{props.stats.map((s) => (
				<Tooltip title={getStatName(s.stat.name)} placement="top">
					<div className="single-stat-container">
						<span className="stat-single">{s.base_stat}</span>
						<span>{getShortStatName(s.stat.name)}</span>
					</div>
				</Tooltip>
			))}
		</Box>
	);
};

const getStatName = (originalName) => {
	if (statNames.hasOwnProperty(originalName)) return statNames[originalName];
	else return originalName;
};

const getShortStatName = (originalName) => {
	if (shortStatNames.hasOwnProperty(originalName)) return shortStatNames[originalName];
	else return originalName;
};
