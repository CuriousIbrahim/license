import {
    LICENSE_DIR,
} from "../constants.ts";
import {
    join
} from "../imports/path.ts";

const licenseFiles: Map<string, string> = new Map();

const isLicenseFilesEmpty = (): boolean => Array.from(licenseFiles.keys()).length === 0;

export const getLicenseMapping = async (): Promise<Map<string, string>> => {
    if (isLicenseFilesEmpty()) {
        for await (const dirEntry of Deno.readDir(LICENSE_DIR)) {
            const fileName = dirEntry["name"];
            const nameSplit = fileName.split(".")
            const name = nameSplit.splice(0, nameSplit.length - 1).join(".");
        
            licenseFiles.set(name, join(LICENSE_DIR, fileName));
        }
    }

    return licenseFiles;
}


export const getLicenseOptions = async (): Promise<string[]> => {
    return Array.from((await getLicenseMapping()).keys());
}

