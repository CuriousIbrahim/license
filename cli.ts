import { Ask }  from "./imports/ask.ts";
import { License } from "./base/license.ts";
import { getLicenseMapping, getLicenseOptions } from "./utils/licenses.ts";
import { DEFAULT_OUTPUT_NAME, INSTRUCTIONS } from "./constants.ts";


const main = async () => {
    const mapping = await getLicenseMapping();

    if (Deno.args.length == 0) {
        console.error(INSTRUCTIONS);
        Deno.exit(0);
    }
    
    const licenseArg = Deno.args[0];

    if (licenseArg === "list") {
        console.log(`Options: ${await getLicenseOptions()}`);
        Deno.exit(0);
    }

    if (!mapping.has(licenseArg)) {
        console.error(`ERROR: ${licenseArg} is not a valid choice.\n${INSTRUCTIONS}`);
        Deno.exit(1);
    }

    const license = await new License(licenseArg);

    if (license.hasAuthorProperty()) {
        const ask = new Ask();

        const { author } = await ask.input({
            name: "author",
            message: "Enter the author's name:"
        })

        license.setAuthorProperty(author!);
    }

    Deno.writeTextFile(DEFAULT_OUTPUT_NAME, license.getLicenseText());

    console.log(`Created ${license.getLicenseName()} license in ${DEFAULT_OUTPUT_NAME} file`);
}

await main();

