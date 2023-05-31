import { AwesomeButton } from "react-awesome-button";

import "./LoadingIndicator.css";

export const LoadingIndicator = (props) => {
	return (
		<div className="loading-indicator-container">
			<AwesomeButton type="primary" className="loading-indicator-button" disabled="true	">
				Cargando datos...
			</AwesomeButton>
		</div>
	);
};
