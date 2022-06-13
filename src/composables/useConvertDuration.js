export default function useConvertDuration(milliseconds) {
	const date = new Date(0, 0, 0, 0, 0, 0, milliseconds);
	if (date.getHours() > 0)
		return `${date.getHours()} ч. ${date.getMinutes()} мин.`;
	else
		return `${date.getMinutes()}:${date.getSeconds() < 10
			? `0${date.getSeconds()}`
			: date.getSeconds()}`;
}
