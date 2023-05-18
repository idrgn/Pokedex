import { Route, Routes } from "react-router-dom";

import { Account } from "./screens/account/Account";
import { ItemList } from "./screens/item_list/ItemList";
import { MainPage } from "./screens/main_page/MainPage";
import { MoveList } from "./screens/move_list/MoveList";
import { NotFound } from "./screens/not_found/NotFound";
import { PokemonList } from "./screens/pokemon_list/PokemonList";

function App() {
	return (
		<Routes>
			<Route path="" element={<MainPage />}></Route>
			<Route path="/pokemons" element={<PokemonList />}></Route>
			<Route path="/items" element={<ItemList />}></Route>
			<Route path="/moves" element={<MoveList />}></Route>
			<Route path="/account" element={<Account />}></Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
