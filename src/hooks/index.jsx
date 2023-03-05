import {useRef, useEffect, useState} from 'react';

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export const useDebounce = (value, delayInMs = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timeoutHandler = setTimeout(() => {
            setDebouncedValue(value);
        }, delayInMs);
        return () => {
            clearTimeout(timeoutHandler);
        };
    }, [value, delayInMs]);
    return debouncedValue;
};

export const useThrottle = (value, delayInMs = 1000) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());
    useEffect(() => {
        if (Date.now() >= lastExecuted.current + delayInMs) {
            lastExecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, delayInMs);

            return () => clearTimeout(timerId);
        }
    }, [value, delayInMs]);

    return throttledValue;
};
