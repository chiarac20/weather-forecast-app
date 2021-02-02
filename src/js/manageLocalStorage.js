function storeObj(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

function getStoredObj(key) {
    const stored = localStorage.getItem(key);
    return stored && JSON.parse(stored);
}

export default {
    storeObj, getStoredObj
}