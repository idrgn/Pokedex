import { Route, Routes } from "react-router-dom";

import { Items } from "./screens/items/Items";
// import { MainPage } from "./screens/main_page/MainPage";
import { Moves } from "./screens/moves/Moves";
import { NotFound } from "./screens/not_found/NotFound";
import { Pokemons } from "./screens/pokemons/Pokemons";

import "./App.css";

function App() {
	return (
		<div className="main-container">
			<div className="page-container">
				<Routes>
					<Route path="" element={<Pokemons />}></Route>
					<Route path="/pokemons" element={<Pokemons />}></Route>
					<Route path="/items" element={<Items />}></Route>
					<Route path="/moves" element={<Moves />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
