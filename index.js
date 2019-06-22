#!/usr/bin/env node

// Basic website downloader using web-scraper
const scrape = require("website-scraper");
const argv = require("./args_parser");
const utils = require("./utils/utils");

const allowedSuffix = [".js", ".css"];
const blackList = ["https://github"];
const maxDepth = 50;

const urlFilter = url => {
    const shouldDownload = utils.checkUrl(
        url,
        argv.domain,
        allowedSuffix,
        blackList
    );

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
    directory: `${argv.outputFolder}.${argv.outputFolderSuffix}`,
    maxDepth,
    urlFilter
})
    .then(data => {
        console.log(`Finished downloading ${argv.startPoint}`);
    })
    .catch(err => {
        console.log("An error occured", err);
    });
