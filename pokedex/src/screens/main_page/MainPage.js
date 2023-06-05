import { Button, Typography } from "@mui/material";
import "./MainPage.css";

/**
 * Pantalla principal
 * @param {*} props
 * @returns
 */
export const MainPage = (props) => {
	return (
		<div className="main-page-container">
			<div className="main-page-content">
				<Typography variant="h1" className="main-page-title">
					Pokédex
				</Typography>

				<Typography variant="h6" className="main-page-description">
					Tu guía completa del mundo Pokémon
				</Typography>

				<div className="main-page-separator" />

				<Button>Pokémons</Button>
				<Button>Movimientos</Button>
				<Button>Objetos</Button>
			</div>
		</div>
	);
};
