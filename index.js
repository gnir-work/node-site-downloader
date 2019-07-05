#!/usr/bin/env node

// Basic website downloader using web-scraper
const scrape = require("website-scraper");
const {
    domain,
    verbose,
    startPoint,
    outputFolder,
    outputFolderSuffix
} = require("./args_parser");
const { MAX_DEPTH } = require("./consts");
const utils = require("./utils/utils");

const urlFilter = url => {
    const shouldDownload = utils.checkUrl(url, domain);

    if (shouldDownload && verbose) {
        console.log(`Downloading ${url}...`);
    }

    return shouldDownload;
};

console.log(
    `Downloading all urls under ${domain}, starting from ${startPoint}`
);

scrape({
    urls: [startPoint],
    recursive: true,
    directory: `${outputFolder}.${outputFolderSuffix}`,
    maxDepth: MAX_DEPTH,
    urlFilter
})
    .then(data => {
        console.log(`Finished downloading ${startPoint}`);
    })
    .catch(err => {
        console.log("An error occured", err);
    });
