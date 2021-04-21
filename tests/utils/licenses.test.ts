import { assertEquals } from "https://deno.land/std@0.93.0/testing/asserts.ts";
import { LICENSE_DIR } from "../../constants.ts";
import { getLicenseOptions, LicenseMapping } from "../../utils/licenses.ts";
import { join } from "../../imports/path.ts";

Deno.test("utils/licenses.getLicenseMapping#1", async () => {
  const actual = await LicenseMapping.getInstance();

  const expected: Map<string, string> = new Map();
  expected.set("agpl-3.0", join(LICENSE_DIR, "agpl-3.0.template"));
  expected.set("apache-2.0", join(LICENSE_DIR, "apache-2.0.template"));
  expected.set("bsl-1.0", join(LICENSE_DIR, "bsl-1.0.template"));
  expected.set("gpl-3.0", join(LICENSE_DIR, "gpl-3.0.template"));
  expected.set("lgpl-3.0", join(LICENSE_DIR, "lgpl-3.0.template"));
  expected.set("mit", join(LICENSE_DIR, "mit.template"));
  expected.set("mpl-2.0", join(LICENSE_DIR, "mpl-2.0.template"));
  expected.set("unlicense", join(LICENSE_DIR, "unlicense.template"));

  assertEquals(actual, expected);
});

Deno.test("utils/licenses.getLicenseOptions#1", async () => {
  const actual = await getLicenseOptions();

  assertEquals(actual.length, 8);
});

Deno.test("utils/licenses.getLicenseOptions#2", async () => {
  const actual = await getLicenseOptions();

  const expected = [
    "agpl-3.0",
    "apache-2.0",
    "bsl-1.0",
    "gpl-3.0",
    "lgpl-3.0",
    "mit",
    "mpl-2.0",
    "unlicense",
  ];

  assertEquals(actual.sort(), expected.sort());
});
