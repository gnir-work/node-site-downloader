const _ = require("lodash");

/**
 * A resource manager in order to save the state of which resource we have already downloaded.
 */
class ResourceManager {
    constructor() {
        this.resources = [];
    }

    /**
     * Checks if the manager already contains this resource.
     * @param {String} resource The resource to check
     */
    containsResource(resource) {
        return _.includes(this.resources, resource);
    }

    /**
     * Add a resource to the manager.
     * @param {String} resource The resource to add
     */
    addResource(resource) {
        if (!this.containsResource(resource)) {
            this.resources.push(resource);
        }
    }
}

const manager = new ResourceManager();
module.exports = manager;
