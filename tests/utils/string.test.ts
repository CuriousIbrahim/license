import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { doesTextInclude, replaceTextWith } from "../../utils/string.ts";

Deno.test("utils/string.doesTextInclude#1", () => {
    const actual = doesTextInclude("hah", "hah");
    assertEquals(actual, true);
});

Deno.test("utils/string.doesTextInclude#2", () => {
    const actual = doesTextInclude("hah", "haha");
    assertEquals(actual, false);
});

Deno.test("utils/string.doesTextInclude#3", () => {
    const actual = doesTextInclude("hah", "h");
    assertEquals(actual, true);
});

Deno.test("utils/string.replaceTextWith#1", () => {
    const actual = replaceTextWith("hello I am John", "hello", "bye");
    assertEquals(actual, "bye I am John");
});

Deno.test("utils/string.replaceTextWith#2", () => {
    const actual = replaceTextWith("hello hello I am John", "hello", "bye");
    assertEquals(actual, "bye hello I am John");
});

Deno.test("utils/string.replaceTextWith#3", () => {
    const actual = replaceTextWith("I am John", "hello", "bye");
    assertEquals(actual, "I am John");
});

