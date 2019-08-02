#!/usr/bin/env node

// Basic website downloader using web-scraper
const scrape = require("website-scraper");
const {
    MAX_DEPTH,
    ALLOWED_SUFFIXES,
    ALLOWED_IMAGE_SUFFIXES,
    BLACK_LIST
} = require("./consts");
const utils = require("./utils/utils");
const AspPlugin = require("./plugins/asp_plugin");

class Downloader {
    constructor(
        verbose,
        includeImages
    ) {
        this.verbose = verbose;
        this.includeImages = includeImages;
    }

    /**
     * Checks if a resource should be downloaded or not and logs the action.
     * @param {String} url An url to the resource that should be downloaded
     * @param {string} domain The domain from which the site is downloaded.
     */
    urlFilter(url, domain) {
        const shouldDownload = utils.checkUrl(url, domain, {
            allowedSuffixes: ALLOWED_SUFFIXES,
            allowedImageSuffixes: ALLOWED_IMAGE_SUFFIXES,
            blackList: BLACK_LIST,
            includeImages: this.includeImages
        });

        if (shouldDownload && this.verbose) {
            console.log(`Downloading ${url}...`);
        }

        return shouldDownload;
    }

    /**
     * Download all of the website that is under {domain} starting from @{startPoint}.
     * @param {String} domain The domain from which the site is downloaded.
     * @param {String} startPoint The first page that will be downloaded.
     * @param {String} outputFolder The name of the output folder, can be an absolute or ralative path.
     * @param {String} outputFolderSuffix The suffix of the output folder.
     */
    download(domain, startPoint, outputFolder, outputFolderSuffix) {
        console.log(
            `Downloading all urls under ${domain}, starting from ${startPoint}`
        );

        scrape({
            urls: [startPoint],
            recursive: true,
            directory: `${outputFolder}.${outputFolderSuffix}`,
            maxDepth: MAX_DEPTH,
            // @ts-ignore
            plugins: [new AspPlugin()],
            urlFilter: url => this.urlFilter(url, domain)
        })
            .then(() => {
                console.log(`Finished downloading ${startPoint}`);
            })
            .catch(err => {
                console.log("An error occurred", err);
            });
    }
}

module.exports = Downloader;