import "./PokemonType.css";

export const PokemonType = (props) => {
	if (props.size === null) return <span className={`span type ${props.type}`} />;
	if (props.size === "big") return <span className={`span type ${props.type} big-type`} />;
};
