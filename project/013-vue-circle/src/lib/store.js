function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function get(key) {
    let josn = localStorage.getItem(key);
    if (!josn)
        return null;
    return JSON.parse(josn);
}
export default {
    set,
    get
}