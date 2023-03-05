import {debounce, throttle} from '../functionDelayers';

jest.useFakeTimers();

describe('function limiters', () => {
    it('should only call a function once when debounced within the delay period', () => {
        const func = jest.fn();
        const debouncedFunc = debounce(func);

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        expect(func).toHaveBeenCalledTimes(0);

        jest.runAllTimers();

        expect(func).toHaveBeenCalledTimes(1);
    });

    it('should only call a function once when throttled within the delay period', () => {
        const func = jest.fn();
        const debouncedFunc = throttle(func);

        debouncedFunc();
        debouncedFunc();
        debouncedFunc();

        expect(func).toHaveBeenCalledTimes(1);

        jest.runAllTimers();

        expect(func).toHaveBeenCalledTimes(1);

        debouncedFunc();

        jest.runAllTimers();

        expect(func).toHaveBeenCalledTimes(2);
    });
});
