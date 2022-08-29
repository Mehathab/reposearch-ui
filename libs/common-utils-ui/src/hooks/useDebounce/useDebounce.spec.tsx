import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('should render successfully', async () => {
    const { result } = renderHook(() => useDebounce('xxx', 1000));

    expect(result.current).toBe('xxx');
  });
  it('should delay on value change', async () => {
    let initialValue = 'xxx';
    const delay = 1000;
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, delay)
    );

    expect(result.current).toBe('xxx');
    initialValue = 'yyy';
    rerender();
    await act(() => new Promise((resolve) => setTimeout(resolve, delay)));
    expect(result.current).toBe('yyy');
  });

  it('should delay on both delay and value change', async () => {
    let initialValue = 'xxx';
    let delay = 1000;
    const { result, rerender } = renderHook(() =>
      useDebounce(initialValue, delay)
    );

    expect(result.current).toBe('xxx');
    initialValue = 'yyy';
    delay = 1000;
    rerender();
    await act(() => new Promise((resolve) => setTimeout(resolve, delay)));
    expect(result.current).toBe('yyy');
  });
});
