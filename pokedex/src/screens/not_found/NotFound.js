import { Link } from "react-router-dom";

/**
 * Pantalla de not found
 * @param {*} props
 * @returns
 */
export const NotFound = (props) => {
	return (
		<div>
			<h1>404 - No encontrado :(</h1>
			<Link to="/">Volver a página inicial</Link>
		</div>
	);
};
