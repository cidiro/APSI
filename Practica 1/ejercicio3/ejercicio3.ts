export const convertTime = (time: string): string => {
	const [hora, min, ampm] = time.split(/:| /);	// separa por : o espacios con un regex OR

	let hora24h = parseInt(hora);

	if (ampm === 'pm' && hora24h !== 12)
		hora24h += 12;
	if (ampm === 'am' && hora24h === 12)
		hora24h = 0;

	return `${hora24h.toString().padStart(2, '0')}${min}`; // padStart() mete 0s a la izquierda hasta que tenga 2 caracteres
}
