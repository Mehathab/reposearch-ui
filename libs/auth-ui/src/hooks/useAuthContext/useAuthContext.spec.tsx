import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useAuthContext from './useAuthContext';

describe('useAuthContext', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useAuthContext());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
