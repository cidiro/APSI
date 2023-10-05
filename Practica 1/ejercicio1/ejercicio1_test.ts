import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { bubbleSort } from "./ejercicio1.ts";


Deno.test("Testing bubbleSort()", () => {
	assertEquals(bubbleSort(
		[81, 54, 31, 37, 99, 97, 59, 90, 65, 48]),
		[31, 37, 48, 54, 59, 65, 81, 90, 97, 99]
	);
	assertEquals(bubbleSort(
		[19, 89, 91, 56, 89, 21,  7,  1, 83, 50]),
		[ 1,  7, 19, 21, 50, 56, 83, 89, 89, 91]
	);
	assertEquals(bubbleSort(
		[79, 35, 23, 59, 72, 27, 79,  6, 64, 4]),
		[ 4,  6, 23, 27, 35, 59, 64, 72, 79, 79]
	);
	assertEquals(bubbleSort(
		[90, 35, 43, 33, 86, 70, 58, 58, 99, 50]),
		[33, 35, 43, 50, 58, 58, 70, 86, 90, 99]
	);
	assertEquals(bubbleSort(
		[13, 45, 61, 83, 57, 97, 93, 43,  9, 71]),
		[ 9, 13, 43, 45, 57, 61, 71, 83, 93, 97]
	);
});
