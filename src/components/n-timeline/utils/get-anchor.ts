export function getAnchor() {
    return document.URL.split("#").length > 1 ? document.URL.split("#")[1] : null;
}