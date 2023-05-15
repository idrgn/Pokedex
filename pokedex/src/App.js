import { Route, Routes } from "react-router-dom";

import { MainPage } from "./screens/main_page/MainPage";
import { NotFound } from "./screens/not_found/NotFound";

function App() {
	return (
		<Routes>
			<Route path="" element={<MainPage />}></Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
