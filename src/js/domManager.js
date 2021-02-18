export function byId(id) {
    return document.getElementById(id);
}

export function byClass(className) {
    return [...document.querySelectorAll(`.${className}`)];
}