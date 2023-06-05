import { Route, Routes } from "react-router-dom";

import { Items } from "./screens/items/Items";
// import { MainPage } from "./screens/main_page/MainPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { Moves } from "./screens/moves/Moves";
import { NotFound } from "./screens/not_found/NotFound";
import { Pokemons } from "./screens/pokemons/Pokemons";

import "./App.css";

const theme = createTheme({
	palette: {
		moves: {
			main: "rgba(255, 255, 255, 0.25)", // Customize the primary color
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<div className="main-container">
				<div className="page-container">
					<Routes>
						<Route path="" element={<Pokemons />}></Route>
						<Route path="/pokemons" element={<Pokemons />}></Route>
						<Route path="/items" element={<Items />}></Route>
						<Route path="/moves" element={<Moves />}></Route>
						<Route path="/moves/:pokemon" element={<Moves />}></Route>
						<Route path="*" element={<NotFound />}></Route>
					</Routes>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
