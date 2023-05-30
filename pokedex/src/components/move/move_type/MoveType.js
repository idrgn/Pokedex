import { capitalizeFirstLetter } from "../../../Helper";

import "./MoveType.css";

export const MoveType = (props) => {
	return <img src={`/move-types/${props.type}.png`} alt={capitalizeFirstLetter(props.type)} className="move-type" />;
};
