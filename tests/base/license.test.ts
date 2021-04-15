import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { License } from "../../base/license.ts";
import { replaceTextWith } from "../../utils/string.ts"
import { getCurrentYear } from "../../utils/date.ts";
import { AUTHOR_REPLACE, YEAR_REPLACE } from "../../constants.ts";

Deno.test("base/license.License#1", async () => {
    const license = await new License("mit");
    assertEquals(license.hasYearProperty(), true);
    assertEquals(license.hasYearProperty(), true);
    assertEquals(license.getLicenseName(), "MIT");
});

Deno.test("base/license.License#2", async () => {
    const license = await new License("unlicense");
    assertEquals(license.hasYearProperty(), false);
    assertEquals(license.hasYearProperty(), false);
    assertEquals(license.getLicenseName(), "UNLICENSE");
});

Deno.test("base/license.License#3", async () => {
    const license = await new License("mit");

    const temp = await Deno.readTextFile("templates/mit.template");
    const expected1 = replaceTextWith(temp, YEAR_REPLACE, `${getCurrentYear()}`);

    assertEquals(license.getLicenseText(), expected1);

    const expected2 = replaceTextWith(expected1, AUTHOR_REPLACE, "John Doe");

    license.setAuthorProperty("John Doe");

    console.log("is equal", license.getLicenseText(), expected2, license.getLicenseText() === expected2);

    assertEquals(license.getLicenseText(), expected2);
});

Deno.test("base/license.License#4", async () => {
    const license = await new License("unlicense");

    const expected = await Deno.readTextFile("templates/unlicense.template");

    assertEquals(license.getLicenseText(), expected);
});