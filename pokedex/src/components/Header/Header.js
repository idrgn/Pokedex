import "./Header.css";

import { CatchingPokemonTwoTone } from "@mui/icons-material";
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";

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
					<Button color="inherit">Inicio</Button>
					<Button color="inherit">Pokedex</Button>
					<Button color="inherit">Iniciar Sesión</Button>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};
