import {renderHook, act} from '@testing-library/react';
import {usePrevious, useDebounce, useThrottle} from '../index';

jest.useFakeTimers();

describe('hooks', () => {
    it('should verify usePrevious returns the value assigned before the newest assigned value', () => {
        const {result, rerender} = renderHook(({value = 'value'} = {}) =>
            usePrevious(value)
        );

        expect(result).toEqual({current: undefined});

        rerender({value: 'next value'});

        expect(result).toEqual({current: 'value'});
    });

    it('should verify useDebounce debounces input as expected', () => {
        const {result, rerender} = renderHook(({value = 'value'} = {}) =>
            useDebounce(value)
        );

        rerender({value: 'next value'});

        act(() => {
            jest.runAllTimers();
        });

        expect(result.current).toEqual('next value');
    });

    it('should verify useThrottle throttles input as expected', async () => {
        const {result, rerender} = renderHook(({value = 'value'} = {}) =>
            useThrottle(value)
        );

        rerender({value: 'next value 1'});
        rerender({value: 'next value 2'});

        act(() => {
            jest.runAllTimers();
        });

        rerender({value: 'next value 3'});

        expect(result.current).toEqual('next value 2');

        act(() => {
            jest.runAllTimers();
        });

        expect(result.current).toEqual('next value 3');
    });

    it('should verify useThrottle does not throttle input when no delay is present', async () => {
        const {result, rerender} = renderHook(({value = 'value'} = {}) =>
            useThrottle(value, 0)
        );

        rerender({value: 'next value 1'});
        rerender({value: 'next value 2'});

        act(() => {
            jest.runAllTimers();
        });

        rerender({value: 'next value 3'});
        expect(result.current).toEqual('next value 3');
    });
});
