const resourceManager = require("./resource_manager");

beforeEach(() => {
    return (resourceManager.resources = []);
});

test.each`
    resources                         | expected               | message
    ${["test.js"]}                    | ${["test.js"]}         | ${"Add one resource"}
    ${["test.js", "a.js"]}            | ${["test.js", "a.js"]} | ${"Add several resources"}
    ${["test.js", "a.js", "test.js"]} | ${["test.js", "a.js"]} | ${"Add several resources when some of them are duplicates"}
`("Check checkSuffix when $message", ({ resources, suffix, expected }) => {
    for (const resource of resources) {
        resourceManager.addResource(resource);
    }
    expect(resourceManager.resources).toEqual(expected);
});
