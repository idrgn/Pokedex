import "./PokemonType.css";

export const PokemonType = (props) => {
	if (!props.hasOwnProperty("size")) return <span className={`span type ${props.type} med-size`} />;
	if (props.size === "big") return <span className={`span type ${props.type} big-size`} />;
	if (props.size === "med") return <span className={`span type ${props.type} med-size`} />;
};
