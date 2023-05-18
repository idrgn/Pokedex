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
