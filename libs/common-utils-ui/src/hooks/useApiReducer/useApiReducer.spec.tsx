import { act, renderHook } from '@testing-library/react';
import * as React from 'react';

import useApiReducer from './useApiReducer';

describe('useApiReducer', () => {
  it('should render successfully', async () => {
    const mockFunc = jest.fn(() => Promise.resolve({ data: {} }));
    const { result } = renderHook(() => useApiReducer(mockFunc));
    // const [state, apiDispatch, reset] = result.current;
    expect(result.current[0].isPending).toBeFalsy();

    act(() => {
      result.current[1]();
    });
    expect(result.current[0].isPending).toBeTruthy();

    act(() => {
      result.current[2]();
    });
    expect(result.current[0].isPending).toBeFalsy();
  });
});
