import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useFuzzySearch from './useFuzzySearch';

describe('useFuzzySearch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useFuzzySearch());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
