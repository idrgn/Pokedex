import { Route, Routes } from "react-router-dom";

import { Account } from "./screens/account/Account";
import { Items } from "./screens/items/Items";
import { MainPage } from "./screens/main_page/MainPage";
import { Moves } from "./screens/moves/Moves";
import { NotFound } from "./screens/not_found/NotFound";
import { Pokemons } from "./screens/pokemons/Pokemons";

import "./App.css";

function App() {
	return (
		<div className="main-container">
			<div className="page-container">
				<Routes>
					<Route path="" element={<MainPage />}></Route>
					<Route path="/pokemons" element={<Pokemons />}></Route>
					<Route path="/items" element={<Items />}></Route>
					<Route path="/moves" element={<Moves />}></Route>
					<Route path="/account" element={<Account />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</div>
		</div>
	);
}

export default App;
