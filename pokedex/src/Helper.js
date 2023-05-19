export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function customConcat(list, element) {
	if (!list.includes(element)) {
		return list.concat(element).sort((a, b) => (a.id > b.id ? 1 : -1));
	} else {
		return list;
	}
}

export const getBestSprite = (sprites) => {
	if (sprites.hasOwnProperty("versions")) {
		for (let generationName in sprites.versions) {
			const generation = sprites.versions[generationName];
			for (let gameName in generation) {
				const game = generation[gameName];
				if (game.hasOwnProperty("animated")) {
					if (game.animated.front_default !== null) {
						return game.animated.front_default;
					}
				}
			}
		}
	}
	return sprites.front_default;
};

export const getFlavorText = (flavor) => {
	let spanish = null;
	let english = null;

	for (let entry of flavor) {
		if (entry.language.name === "es") spanish = entry.flavor_text;
		else if (entry.language.name === "en") english = entry.flavor_text;
		if (spanish != null && english != null) break;
	}

	if (spanish != null) return spanish;
	if (english != null) return english;
	return "Descripción desconocida...";
};
