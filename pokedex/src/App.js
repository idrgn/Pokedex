import { Route, Routes } from "react-router-dom";

import { MainPage } from "./screens/main_page/MainPage";
import { NotFound } from "./screens/not_found/NotFound";

import "./App.css";

function App() {
	return (
		<div className="container">
			<Routes>
				<Route path="" element={<MainPage />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
}

export default App;
