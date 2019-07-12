const _ = require("lodash");
const urlParser = require("url");
const {
    ALLOWED_SUFFIXES,
    BLACK_LIST,
    ALLOWED_IMAGE_SUFFIXES,
    INCLUDE_IMAGES
} = require("../consts");
const resourceManager = require("../resource_manager/resource_manager");

/**
 * Checks if the url ends with at least one of the provided suffixes.
 * Please note the function doesn't add . before the suffix however it is recommended
 * to pass suffixes with . in order to make sure that it is really a file's suffix.
 * For example if we pass ['js'] we probably want all of the js files and not
 * the page https://reactjs.
 *
 * @param {String} url The url that will be checked.
 * @param {String[]} allowedSuffix All of the allowed suffixes in an array.
 * @returns {Boolean}
 */
const checkSuffix = (url, allowedSuffix) =>
    _.some(allowedSuffix, suffix => _.endsWith(urlParser.parse(url).pathname, suffix));

/**
 * Checks the urls against the passed black list.
 * @param {String} url The url that will be checked
 * @param {String[]} blackList All of the blacklisted strings.
 * @returns {Boolean}
 */
const checkBlackList = (url, blackList) =>
    !_.some(blackList, item => _.includes(url, item));

/**
 * Checks that the domain is part of the url.
 * @param {String} url The url that will be checked.
 * @param {String} domain The expected domain.
 * @returns {Boolean}
 */
const checkDomain = (url, domain) => Boolean(domain && _.includes(url, domain));

/**
 * Extracts the resource name (For example https://google.com/something/test.png => test.png).
 * @param {String} url The url from which we want to extract the resource name.
 */
const getResourceNameFromUrl = url =>
    _(urlParser.parse(url).pathname.split("/"))
        .filter(item => !!item)
        .nth(-1);

/**
 * Check if the image should be downloaded by the following logic:
 * If an image with the same name was already downloaded than don't download it, this is needed because sometimes a different
 * 1. url points to the same image, for example:
 *    https://someapi.com/v1.1/en/logo.png and https://someapi.com/v1.1/he/logo.png.
 *    This logic only works when the crawlers filenameGenerator parameter is set to byType, see {@link https://github.com/website-scraper/node-website-scraper#filenamegenerator}.
 * 2. The urls ends with one of the {@link allowedImageSuffixes}.
 * @param {String} url The url that will be checked.
 * @param {String[]} allowedImageSuffixes All of the allowed suffixes for images, must be a valid image suffix.
 */
const checkImage = (url, allowedImageSuffixes) => {
    if (!checkSuffix(url, allowedImageSuffixes)) {
        return false;
    }
    const imageName = getResourceNameFromUrl(url);
    if (!resourceManager.containsResource(imageName)) {
        resourceManager.addResource(imageName);
        return true;
    } else {
        return false;
    }
};

/**
 * Checks if the url should be downloaded.
 * Please note: in case one of the black listed items is in the url it will be disqualified regardless
 * of the other parameters.
 * @param {String} url The url that will be checked.
 * @param {String} domain The expected domain of the url.
 * @param {Object} obj All of the configurations for the check function.
 * @param {String[]} obj.allowedSuffixes All of the allowed suffixes.
 * @param {string[]} obj.allowedImageSuffixes All of the allowed suffixes for an image to have.
 * @param {String[]} obj.blackList Black listed keywords.
 * @param {boolean} obj.includeImages should the script download images as well?
 * @returns {Boolean} Wether the url should be downloaded or not.
 */
const checkUrl = (
    url,
    domain,
    { allowedSuffixes, allowedImageSuffixes, blackList, includeImages } = {
        allowedSuffixes: ALLOWED_SUFFIXES,
        allowedImageSuffixes: ALLOWED_IMAGE_SUFFIXES,
        blackList: BLACK_LIST,
        includeImages: INCLUDE_IMAGES
    }
) => {
    if (!checkBlackList(url, blackList)) {
        return false;
    }
    return (
        checkSuffix(url, allowedSuffixes) ||
        checkDomain(url, domain) ||
        (checkImage(url, allowedImageSuffixes) && includeImages)
    );
};

module.exports = {
    checkSuffix,
    checkBlackList,
    checkDomain,
    checkUrl,
    getResourceNameFromUrl,
    checkImage
};
