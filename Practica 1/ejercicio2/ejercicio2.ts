export const passwordSafety = (password: string): number => {
	let score = 0;
	const characters = password.split('');

	const hasLetter = characters.some(char => isNaN(parseInt(char))); // parseInt() devuelve un NaN si no puede convertir el string a number
	const hasNumber = characters.some(char => !isNaN(parseInt(char)));
	const hasSpecial = characters.some(char => char.match(/[!@#$€%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)); // regex que checkea todos los caracteres especiales
	const hasThreeNumbers = password.match(/\d{3}/); // regex que checkea si hay 3 numeros seguidos

	if (hasLetter && hasNumber) {
		score += 1;
	}

	if (hasThreeNumbers) {
		score -= 1;
	}

	if (password.length > 20) {
		score += 2;
	}

	if (password.length < 10) {
		score -= 1;
	}

	if (hasSpecial) {
		score += 1;
	}

	return score;
}
