import _ from "lodash";

export const checkSuffix = (url, allowedSuffix) =>
    _.some(allowedSuffix, suffix => _.endsWith(url, suffix));

export const checkBlackList = (url, blackList) =>
    !_.some(blackList, item => _.includes(url, item));

export const checkDomain = (url, domain) => _.includes(url, domain);

export const checkUrl = (url, domain, allowedSuffix, blackList) =>
    (checkSuffix(url, allowedSuffix) || checkDomain(url, domain)) &&
    checkBlackList(url, blackList);
