import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./MainPage.css";

/**
 * Pantalla principal
 * @param {*} props
 * @returns
 */
export const MainPage = (props) => {
	const navigate = useNavigate();

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

				<Button
					onClick={() => {
						window.scrollTo(0, 0);
						navigate(`/pokemons`);
					}}
				>
					Pokémons
				</Button>
				<Button
					onClick={() => {
						window.scrollTo(0, 0);
						navigate(`/moves`);
					}}
				>
					Movimientos
				</Button>
				<Button
					onClick={() => {
						window.scrollTo(0, 0);
						navigate(`/items`);
					}}
				>
					Objetos
				</Button>
			</div>
		</div>
	);
};
