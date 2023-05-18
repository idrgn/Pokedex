import "./Header.css";

import MenuIcon from "@mui/icons-material/Menu";

import { CatchingPokemonTwoTone } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const pages = [
	{ name: "Inicio", url: "/" },
	{ name: "Pokémons", url: "/pokemons" },
	{ name: "Movimientos", url: "/moves" },
	{ name: "Objetos", url: "/items" },
	{ name: "Cuenta", url: "/account" },
];

export const Header = () => {
	const [anchorElement, setAnchorElement] = useState(null);

	const handleOpenMenu = (event) => {
		setAnchorElement(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorElement(null);
	};

	return (
		<AppBar position="static">
			<Toolbar className="header" justify="space-between">
				<IconButton size="large" edge="start" color="inherit" aria-label="Logo">
					<CatchingPokemonTwoTone />
				</IconButton>
				<Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
					Pokedex
				</Typography>

				<Stack direction="row" spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
					{pages.map((page) => (
						<NavLink to={page.url} style={{ textDecoration: "inherit", color: "inherit" }}>
							<Button key={page.name} sx={{ my: 2, color: "white", display: "block" }}>
								{page.name}
							</Button>
						</NavLink>
					))}
				</Stack>

				<Box sx={{ display: { xs: "flex", md: "none" } }}>
					<IconButton size="large" aria-label="Menú desplegable" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenMenu} color="inherit">
						<MenuIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorElement}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left",
						}}
						open={Boolean(anchorElement)}
						onClose={handleCloseMenu}
						sx={{
							display: { xs: "block", md: "none" },
						}}
					>
						{pages.map((page) => (
							<NavLink to={page.url} style={{ textDecoration: "inherit", color: "inherit" }}>
								<MenuItem key={page.name} onClick={handleCloseMenu}>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							</NavLink>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
