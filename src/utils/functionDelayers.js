export const debounce = (funcToDebounce, delayInMs = 1000) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            funcToDebounce.apply(this, args);
        }, delayInMs);
    };
};

export const throttle = (funcToThrottle, delayInMs = 1000) => {
    let isThrottleActive = false;
    return (...args) => {
        if (isThrottleActive) {
            return;
        }
        funcToThrottle(...args);
        isThrottleActive = true;
        setTimeout(() => {
            isThrottleActive = false;
        }, delayInMs);
    };
};
