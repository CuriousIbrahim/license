import {
    LICENSE_DIR,
} from "../constants.ts";
import {
    join
} from "../imports/path.ts";

const licenseFiles: Map<string, string> = new Map();

const isLicenseFilesEmpty = (): boolean => Array.from(licenseFiles.keys()).length === 0;

export const getLicenseMapping = (): Map<string, string> => {
    if (isLicenseFilesEmpty()) {
        for (const dirEntry of Deno.readDirSync(LICENSE_DIR)) {
            const fileName = dirEntry["name"];
            const nameSplit = fileName.split(".")
            const name = nameSplit.splice(0, nameSplit.length - 1).join(".");
        
            licenseFiles.set(name, join(LICENSE_DIR, fileName));
        }
    }

    return licenseFiles;
}


export const getLicenseOptions = (): string[] => {
    return Array.from(getLicenseMapping().keys());
}
