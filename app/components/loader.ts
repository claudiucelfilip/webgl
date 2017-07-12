export class Loader {
    private static promises: Array<any> = [];
    constructor() {}

    static add(promise) {
        Loader.promises.push(promise);
    }

    static load() {
        return Promise.all(Loader.promises);
    }
}

export function load(promise) {
    return function(target: any, key: string) {
        Loader.add(promise);
        promise.then((result) => {
            target[key] = result;
            console.log(target);
        });
    }
}