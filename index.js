#!/usr/bin/env node

// Basic website downloader using web-scraper
const scrape = require("website-scraper");
const {
    domain,
    verbose,
    startPoint,
    outputFolder,
    outputFolderSuffix,
    includeImages
} = require("./args_parser");
const {
    MAX_DEPTH,
    ALLOWED_SUFFIXES,
    ALLOWED_IMAGE_SUFFIXES,
    BLACK_LIST
} = require("./consts");
const utils = require("./utils/utils");

const urlFilter = url => {
    const shouldDownload = utils.checkUrl(url, domain, {
        allowedSuffixes: ALLOWED_SUFFIXES,
        allowedImageSuffixes: ALLOWED_IMAGE_SUFFIXES,
        blackList: BLACK_LIST,
        includeImages
    });

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
