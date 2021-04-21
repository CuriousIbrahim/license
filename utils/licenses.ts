import { LICENSE_DIR } from "../constants.ts";
import { join } from "../imports/path.ts";

export const getLicenseOptions = (): string[] => {
  return Array.from(LicenseMapping.getInstance().keys());
};

export class LicenseMapping {
  private static instance: Map<string, string>;

  static getInstance(): Map<string, string> {
    if (!this.instance) {
      this.instance = new Map();
      for (const dirEntry of Deno.readDirSync(LICENSE_DIR)) {
        const fileName = dirEntry["name"];
        const nameSplit = fileName.split(".");
        const name = nameSplit.splice(0, nameSplit.length - 1).join(".");
  
        this.instance.set(name, join(LICENSE_DIR, fileName));
      }
    }

    return this.instance;
  }
}

