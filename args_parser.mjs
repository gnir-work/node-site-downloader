import yargs from "yargs";

export default yargs
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
            alias: "o",
            type: "string",
            demandOption: true
        },
        verbose: {
            description:
                "Should the script print every downloaded url to stdout?",
            type: "boolean",
            alias: "v"
        },
        outputFolderSuffix: {
            description: "The suffix that will be added to the output folder.",
            default: 'site'
        }
    }).argv;
