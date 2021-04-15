import { getLicenseOptions} from "./utils/licenses.ts";

export const DEFAULT_OUTPUT_NAME = "LICENSE";
export const LICENSE_DIR = "./templates";
export const YEAR_REPLACE = "[year]";
export const AUTHOR_REPLACE = "[name of copyright owner]";
export const INSTRUCTIONS = `license (powered by deno)

SUMMARY

A cli tool that allows you to generate a LICENSE file from numerous options

USAGE

    license [license-name]

    - license-name can be one of the following options:
      ${await getLicenseOptions()}

EXAMPLE

    license mit

    license apache-2.0
`;