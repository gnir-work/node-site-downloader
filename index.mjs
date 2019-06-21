// Basic website downloader using web-scraper
import scrape from "website-scraper";
import argv from "./args_parser";
import { checkUrl } from "./utils";

const allowedSuffix = [".js", ".css"];
const blackList = ["https://github"];
const maxDepth = 50;

const urlFilter = url => {
    const shouldDownload = checkUrl(url, argv.domain, allowedSuffix, blackList);

    if (shouldDownload && argv.verbose) {
        console.log(`Downloading ${url}...`);
    }

    return shouldDownload;
};

console.log(
    `Downloading all urls under ${argv.domain}, starting from ${argv.startPoint}`
);

scrape({
    urls: [argv.startPoint],
    recursive: true,
    maxDepth: 50,
    directory: argv.outputFolder,
    urlFilter: urlFilter
})
    .then(data => {
        console.log(`Finished downloading ${argv.startPoint}`);
    })
    .catch(err => {
        console.log("An error occured", err);
    });
