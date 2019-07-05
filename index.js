#!/usr/bin/env node

// Basic website downloader using web-scraper
const scrape = require("website-scraper");
const { domain, verbose, startPoint, outputFolder, outputFolderSuffix } = require("./args_parser");
const utils = require("./utils/utils");
const { allowedSuffix, blackList, maxDepth } = require('./consts').default;

const urlFilter = url => {
    const shouldDownload = utils.checkUrl(
        url,
        domain,
        allowedSuffix,
        blackList
    );

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
    maxDepth,
    urlFilter
})
    .then(data => {
        console.log(`Finished downloading ${startPoint}`);
    })
    .catch(err => {
        console.log("An error occured", err);
    });
