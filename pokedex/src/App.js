import { Route, Routes } from "react-router-dom";

import { MainPage } from "./screens/main_page/MainPage";
import { NotFound } from "./screens/not_found/NotFound";
import { Header } from "./components/header/Header";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="" element={<Header />}>
				<Route path="" element={<MainPage />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
