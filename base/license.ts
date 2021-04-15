import {
    getLicenseMapping
} from "../utils/licenses.ts"
import {
    AUTHOR_REPLACE,
    YEAR_REPLACE
} from "../constants.ts";
import {
    getCurrentYear
} from "../utils/date.ts";
import {
    doesTextInclude,
    replaceTextWith
} from "../utils/string.ts";

export class License {
    private authorProperty!: boolean;
    private yearProperty!: boolean;
    private licenseName!: string;
    private licenseText!: string;

    constructor (licenseName: string) {
        this.licenseName = licenseName;        

        getLicenseMapping()
            .then(mapping => {
                const licensePath = mapping.get(licenseName);

                this.licenseText = Deno.readTextFileSync(licensePath!);

                this.authorProperty = this.doesLicenseHaveAuthorField();
                this.yearProperty = this.doesLicenseHaveYearField();     

                if (this.yearProperty) {
                    this.licenseText = replaceTextWith(this.licenseText, YEAR_REPLACE, `${getCurrentYear()}`);
                }
            });
    }

    public hasAuthorProperty (): boolean {
        return this.authorProperty;
    }

    public setAuthorProperty (author: string): void {
        this.licenseText = replaceTextWith(this.licenseText, AUTHOR_REPLACE, author)
    }

    public getLicenseText (): string {
        return this.licenseText;
    }

    public getLicenseName (): string {
        return this.licenseName.toUpperCase();
    }

    private doesLicenseHaveAuthorField (): boolean {
        return doesTextInclude(this.licenseText, AUTHOR_REPLACE)
    }

    private doesLicenseHaveYearField (): boolean {
        return doesTextInclude(this.licenseText, YEAR_REPLACE)
    }

}