import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { getCurrentYear } from "../../utils/date.ts";

Deno.test("utils/date.getCurrentYear#1", () => {
  const actual = getCurrentYear();
  assertEquals(actual, 2021);
});
