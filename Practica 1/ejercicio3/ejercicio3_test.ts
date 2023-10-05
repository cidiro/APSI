import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { convertTime } from "./ejercicio3.ts";


Deno.test("Testing convertTime()", () => {
	assertEquals(convertTime("8:05 am"), "0805");
	assertEquals(convertTime("8:15 pm"), "2015");
	assertEquals(convertTime("12:45 am"), "0045");
	assertEquals(convertTime("12:01 pm"), "1201");
	assertEquals(convertTime("01:27 pm"), "1327");
});
