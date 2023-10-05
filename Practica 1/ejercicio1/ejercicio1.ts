export const bubbleSort = (arr: number[]): number[] => {
	let swap = false;

	arr.forEach((num, i) => {
		if (num > arr[i+1]) {
			swap = true;
			[arr[i], arr[i+1]] = [arr[i+1], arr[i]]; // Array destructuring para intercambiar valores
		}
	});

	if (swap) {
		return bubbleSort(arr);
	}

	return arr;
}
