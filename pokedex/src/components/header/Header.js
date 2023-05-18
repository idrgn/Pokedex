import "./Header.css";

import { CatchingPokemonTwoTone } from "@mui/icons-material";
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const pages = [
	{ name: "Inicio", url: "/" },
	{ name: "Pokémons", url: "/pokemons" },
	{ name: "Movimientos", url: "/moves" },
	{ name: "Objetos", url: "/items" },
	{ name: "Cuenta", url: "/account" },
];

export const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar className="header">
				<IconButton size="large" edge="start" color="inherit" aria-label="Logo">
					<CatchingPokemonTwoTone />
				</IconButton>
				<Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
					Pokedex
				</Typography>
				<Stack direction="row" spacing={2}>
					{pages.map((page) => (
						<NavLink to={page.url} style={{ textDecoration: "inherit", color: "inherit" }}>
							<Button key={page.name} sx={{ my: 2, color: "white", display: "block" }}>
								{page.name}
							</Button>
						</NavLink>
					))}
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
