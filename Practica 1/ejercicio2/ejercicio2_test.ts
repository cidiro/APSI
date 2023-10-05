import { assertEquals } from "https://deno.land/std@0.202.0/assert/mod.ts";
import { passwordSafety } from "./ejercicio2.ts";


Deno.test("Testing passwordSafety()", () => {
	assertEquals(passwordSafety('123'), -2);
	assertEquals(passwordSafety('password'), -1);
	assertEquals(passwordSafety('password99'), 1);
	assertEquals(passwordSafety('password123!'), 1);
	assertEquals(passwordSafety('superlongpassword123??'), 3);
});
