import "./PokemonType.css";

export const PokemonType = (props) => {
	console.log("Adding types");
	console.log(`span.type.${props.type}`);
	return <span className={`span type ${props.type}`} />;
};
