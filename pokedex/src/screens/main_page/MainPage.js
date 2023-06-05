import "./MainPage.css";

/**
 * Pantalla principal
 * @param {*} props
 * @returns
 */
export const MainPage = (props) => {
	return (
		<div>
			<div
				className="main-page-container"
				style={{
					backgroundImage: `url(${process.env.PUBLIC_URL + "/background.jpg"})`,
				}}
			></div>
		</div>
	);
};
