const _ = require("lodash");

/**
 * Checks if the url ends with at least one of the provided suffixes.
 * Please note the function doesn't add . before the suffix however it is recommended
 * to pass suffixes with . in order to make sure that it is really a file's suffix.
 * For example if we pass ['js'] we probably want all of the js files and not
 * the page https://reactjs.
 * 
 * @param {String} url The url that will be checked.
 * @param {Array[String]} allowedSuffix All of the allowed suffixes in an array.
 * @returns {Boolean}
 */
const checkSuffix = (url, allowedSuffix) =>
    _.some(allowedSuffix, suffix => _.endsWith(url, suffix));

/**
 * Checks the urls against the passed black list. 
 * @param {String} url The url that will be checked
 * @param {Array[String]} blackList All of the blacklisted strings.
 * @returns {Boolean}
 */
const checkBlackList = (url, blackList) =>
    !_.some(blackList, item => _.includes(url, item));

/**
 * Checks that the domain is part of the url.
 * @param {String} url The url that will be checked. 
 * @param {String} domain The expected domain.
 * @param {Boolean}
 */
const checkDomain = (url, domain) => Boolean(domain && _.includes(url, domain));

/**
 * Checks if the url should be downloaded.
 * Please note: in case one of the black listed items is in the url it will be disqualified regardless
 * of the other parameters.
 * @param {String} url The url that will be checked.
 * @param {String} domain The expected domain of the url.
 * @param {Array[String]} allowedSuffix All of the allowed suffixes.
 * @param {Array[String]} blackList Black listed keywords.
 */
const checkUrl = (url, domain, allowedSuffix, blackList) =>
    (checkSuffix(url, allowedSuffix) || checkDomain(url, domain)) &&
    checkBlackList(url, blackList);

module.exports = {
    checkSuffix,
    checkBlackList,
    checkDomain,
    checkUrl
};
