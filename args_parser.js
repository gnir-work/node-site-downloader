// @ts-nocheck
const yargs = require("yargs");

/**
 * All of the user parameters
 * @typedef {Object<String, any>} UserParams
 * @property {String} domain All urls under this domain will be downloaded.
 * @property {String} startPoint The entry point to the website from which the scrapper will start, must be under the [domain] url passed.
 * @property {String} outputFolder The folder in which the site will be saved on your computer.
 * @property {boolean} verbose Should the script print progress to stdout?.
 * @property {string} outputFolderSuffix The suffix that will be added to the output folder [outputFolder].
 */
/**
 * @type {UserParams}
 */
const params = yargs
    .help()
    .alias("help", "h")
    .command("download", "Download a web site locally", {
        domain: {
            description: "All urls under this domain will be downloaded",
            alias: "d",
            type: "string",
            demandOption: true
        },
        startPoint: {
            description:
                "The entry point to the website from which the scrapper will start, must be under the [domain] url passed.",
            alias: "s",
            type: "string",
            demandOption: true
        },
        outputFolder: {
            description:
                "The folder in which the site will be saved on your computer",
            alias: "o",
            type: "string",
            demandOption: true
        },
        verbose: {
            description: "Should the script print progress to stdout?",
            type: "boolean",
            alias: "v"
        },
        outputFolderSuffix: {
            description: "The suffix that will be added to the output folder.",
            type: "string",
            default: "site"
        }
    })
    .demandCommand(1, "Please selected at least on command before moving on")
    .argv;

module.exports = params;
