const utils = require("./utils");

test.each`
    url          | suffix                    | expected | message
    ${"test.js"} | ${[".js"]}                | ${true}  | ${"Only suffix matches the url"}
    ${"test.js"} | ${[".js", ".css"]}        | ${true}  | ${"Only one of suffixes matches the url"}
    ${"test.js"} | ${[".js", ".css", ".js"]} | ${true}  | ${"Several suffixes match the url"}
    ${"test.js"} | ${[]}                     | ${false} | ${"No suffixes passed"}
    ${"test.js"} | ${[".random"]}            | ${false} | ${"only suffix doesn't match the url"}
    ${"test.js"} | ${[".something", ".j"]}   | ${false} | ${"All of the suffixes don't match the url, some of them match partly"}
`("Check checkSuffix when $message", ({ url, suffix, expected }) => {
    expect(utils.checkSuffix(url, suffix)).toBe(expected);
});

test.each`
    url                     | blacklist                | expected | message
    ${"https://github.com"} | ${["github"]}            | ${false} | ${"Only black list matches url"}
    ${"https://github.com"} | ${["github", "random"]}  | ${false} | ${"One of the black lists matches url"}
    ${"https://github.com"} | ${[]}                    | ${true}  | ${"No black list passed"}
    ${"https://github.com"} | ${["random"]}            | ${true}  | ${"Only black list doesn't match the url"}
    ${"https://github.com"} | ${["random", "message"]} | ${true}  | ${"None of the black list matches url"}
`("Check checkBlackList when $message", ({ url, blacklist, expected }) => {
    expect(utils.checkBlackList(url, blacklist)).toBe(expected);
});

test.each`
    url                     | domain       | expected | message
    ${"https://github.com"} | ${"github"}  | ${true}  | ${"Domain matches the url"}
    ${"https://github.com"} | ${"random"}  | ${false} | ${"Domain doesn't match the url"}
    ${"https://github.com"} | ${""}        | ${false} | ${"Domain is an empty string"}
    ${"https://github.com"} | ${null}      | ${false} | ${"Domain is null"}
    ${"https://github.com"} | ${undefined} | ${false} | ${"Domain is undefined"}
`("Check checkDomain when $message", ({ url, domain, expected }) => {
    expect(utils.checkDomain(url, domain)).toBe(expected);
});

test.each`
    url                                 | domain      | suffix      | blacklist     | expected | message
    ${"https://jest.com/docs/index.js"} | ${"jest"}   | ${[".js"]}  | ${["github"]} | ${true}  | ${"Domain and suffix match the url"}
    ${"https://jest.com/docs"}          | ${"jest"}   | ${[]}       | ${["github"]} | ${true}  | ${"Only domain matches the url"}
    ${"https://jest.com/docs/index.js"} | ${"random"} | ${[".js"]}  | ${["github"]} | ${true}  | ${"Only suffix matches the url"}
    ${"https://jest.com/docs/index.js"} | ${"jest"}   | ${[".js"]}  | ${["jest"]}   | ${false} | ${"Both domain and suffix match url however it is in the blacklist"}
    ${"https://jest.com/docs/index.js"} | ${"random"} | ${[".js"]}  | ${["jest"]}   | ${false} | ${"Suffix matches url however it is in the blacklist"}
    ${"https://jest.com/docs/index.js"} | ${"jest"}   | ${[".css"]} | ${["jest"]}   | ${false} | ${"Domain matches url however it is in the blacklist"}
    ${"https://jest.com/docs/index.js"} | ${"random"} | ${[".css"]} | ${["jest"]}   | ${false} | ${"Both domain and suffix don't match url and it is in the blacklist"}
`(
    "Check checkUrl when $message",
    ({ url, domain, suffix, blacklist, expected }) => {
        expect(utils.checkUrl(url, domain, suffix, blacklist)).toBe(expected);
    }
);
