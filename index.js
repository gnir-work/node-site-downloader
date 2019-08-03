#!/usr/bin/env node

const {
    domain,
    verbose,
    startPoint,
    outputFolder,
    outputFolderSuffix,
    includeImages
} = require("./libs/args_parser");
const Downloader = require('./libs/downloader');

const downloader = new Downloader(verbose, includeImages);

downloader.download(domain, startPoint, outputFolder, outputFolderSuffix)
