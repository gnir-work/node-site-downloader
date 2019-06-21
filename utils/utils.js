const _ = require('lodash');

const checkSuffix = (url, allowedSuffix) =>
    _.some(allowedSuffix, suffix => _.endsWith(url, suffix));

const checkBlackList = (url, blackList) =>
    !_.some(blackList, item => _.includes(url, item));

const checkDomain = (url, domain) => Boolean(domain && _.includes(url, domain));

const checkUrl = (url, domain, allowedSuffix, blackList) =>
    (checkSuffix(url, allowedSuffix) || checkDomain(url, domain)) &&
    checkBlackList(url, blackList);

module.exports = {
    checkSuffix,
    checkBlackList,
    checkDomain,
    checkUrl
}