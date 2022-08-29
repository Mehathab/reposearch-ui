import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useSimpleInput from './useSimpleInput';

describe('useSimpleInput', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useSimpleInput());

    expect(result.current.value).toBe('');
  });
  it('should initiate with param value', () => {
    const initialValue = 'abcd';
    const { result } = renderHook(() => useSimpleInput(initialValue));

    expect(result.current.value).toBe(initialValue);
  });
  it('should set value through setValue', () => {
    const { result } = renderHook(() => useSimpleInput());

    expect(result.current.value).toBe('');

    act(() => {
      result.current.setValue('abc');
    });
    expect(result.current.value).toBe('abc');
  });
  it('should set value through onChange', () => {
    const { result } = renderHook(() => useSimpleInput());

    expect(result.current.value).toBe('');

    act(() => {
      result.current.onChange({
        target: { value: 'xyz' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('xyz');
  });
  it('should setValue to initialValue on reset', () => {
    const initialValue = 'abcd';
    const { result } = renderHook(() => useSimpleInput(initialValue));

    expect(result.current.value).toBe(initialValue);

    act(() => {
      result.current.setValue('XYZ');
    });
    expect(result.current.value).toBe('XYZ');
    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(initialValue);
  });
  it('should setValue to "" on clear', () => {
    const initialValue = 'abcd';
    const { result } = renderHook(() => useSimpleInput(initialValue));

    expect(result.current.value).toBe(initialValue);

    act(() => {
      result.current.clear();
    });

    expect(result.current.value).toBe('');
  });
});
