class Container
{
    constructor() {
        this.container = {};
    }

    set(key, service) {
        if(key && service && !(key in this.container)) this.container[key] = service;
        return this.container[key];
    }

    get(key) {
        return this.container[key];
    }
}

export default new Container;