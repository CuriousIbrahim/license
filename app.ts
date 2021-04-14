import * as path from "https://deno.land/std@0.92.0/path/mod.ts";
import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";

const DEFAULT_OUTPUT_NAME = "LICENSE";

const LICENSE_DIR = "./templates";

const LICENSES_FILE: Map<string, string> = new Map();

const YEAR_REPLACE = "[year]";
const AUTHOR_REPLACE = "[name of copyright owner]";

for await (const dirEntry of Deno.readDir(LICENSE_DIR)) {
    const fileName = dirEntry["name"];
    const nameSplit = fileName.split(".")
    const name = nameSplit.splice(0, nameSplit.length - 1).join(".");

    LICENSES_FILE.set(name, path.join(LICENSE_DIR, fileName));
}

const getOptions = (): string[] => {
    return Array.from(LICENSES_FILE.keys());
}

const getLicenseText = async (license: string): Promise<string | null> => {
    if (!LICENSES_FILE.has(license)) {
        return null;
    }

    return await Deno.readTextFile(LICENSES_FILE.get(license)!)
    .then((response) => {return response});
}

const doesLicenseHaveAuthorField = (license: string): boolean => {
    return license.includes(AUTHOR_REPLACE);
}

const doesLicenseHaveYearField = (license: string): boolean => {
    return license.includes(YEAR_REPLACE);
}

const fillInAuthorField = (license: string, author: string): string => {
    return license.replace(AUTHOR_REPLACE, author);
}

const fillInYearField = (license: string, year: number): string => {
    return license.replace(YEAR_REPLACE, `${year}`);
}

const INSTRUCTIONS = `license (powered by deno)

SUMMARY

A cli tool that allows you to generate a LICENSE file from numerous options

USAGE

    license [license-name]

    - license-name can be one of the following options:
      ${getOptions()}

EXAMPLE

    license mit

    license apache-2.0
`

const main = async () => {
    if (Deno.args.length == 0) {
        console.error(INSTRUCTIONS);
        Deno.exit(0);
    }
    
    const licenseArg = Deno.args[0];

    if (licenseArg === "list") {
        console.log(`Options: ${getOptions()}`);
        Deno.exit(0);
    }

    if (!LICENSES_FILE.has(licenseArg)) {
        console.error(`ERROR: ${licenseArg} is not a valid choice.\n${INSTRUCTIONS}`);
        Deno.exit(1);
    }

    let licenseText = await getLicenseText(licenseArg);

    if (doesLicenseHaveAuthorField(licenseText!)) {
        const ask = new Ask();

        const { author } = await ask.input({
            name: "author",
            message: "Enter the author's name:"
        })

        licenseText = fillInAuthorField(licenseText!, author!);
    }

    if (doesLicenseHaveYearField(licenseText!)) {
        const year = (new Date()).getFullYear();

        licenseText = fillInYearField(licenseText!, year);
    }

    Deno.writeTextFile(DEFAULT_OUTPUT_NAME, licenseText!);

    console.log(`Created ${licenseArg} in ${DEFAULT_OUTPUT_NAME} file`);
}

await main();

