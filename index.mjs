// Basic website downloader using web-scraper
import scrape from 'website-scraper';
import _ from 'lodash';
const startPoint = 'https://overreacted.io/';
const domain = 'https://overreacted.io/';
const allowedSuffix = ['.js', '.css']
const blackList = ['https://github']

const checkSuffix = (url) => _.some(allowedSuffix, suffix => _.endsWith(url, suffix));

const checkBlackList = (url) => !_.some(blackList, item => _.includes(url, item));

const checkDomain = (url) => _.includes(url, domain);

const urlFilter = (url) => {
    const shouldDownloadUrl = (checkSuffix(url) || checkDomain(url)) & checkBlackList(url);
    if (shouldDownloadUrl) {
        console.log(`Downloading ${url}`);
    }
    return shouldDownloadUrl;
}

scrape({
    urls: [startPoint],
    urlFilter: urlFilter,
    recursive: true,
    maxDepth: 50,
    directory: './node-website',
}).then((data) => {
    console.log("Done!!!")
}).catch((err) => {
    console.log("An error occured", err)
});

