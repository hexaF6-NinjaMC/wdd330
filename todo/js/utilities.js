export function qsFn(selector) {
    let selectedElement = document.querySelector(selector);
    if (selectedElement) {
        return selectedElement;
    } else {
        return null;
    }
}

export function onTouchFn(elementSelector, callbackFn) {
    if ("ontouchstart" in document.documentElement) {
        // Mobile browsers
        qsFn(elementSelector).addEventListener("touchend", callbackFn);
    } else {
        // Desktop browsers
        qsFn(elementSelector).addEventListener("click", callbackFn);
    }
}