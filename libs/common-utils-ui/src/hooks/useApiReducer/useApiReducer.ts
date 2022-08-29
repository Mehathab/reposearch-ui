import { AxiosResponse } from 'axios';
import { useCallback, useReducer } from 'react';

export interface ApiReducerState {
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
  data: any;
  error: any;
}
const initialApiReducerState: ApiReducerState = {
  isError: false,
  isSuccess: false,
  isPending: false,
  data: null,
  error: null,
};
enum actionTypes {
  Pending = 0,
  Reset,
  Success,
  Error,
}
const apiReducer = (
  state: ApiReducerState,
  action: { type: actionTypes; payload?: any }
) => {
  switch (action?.type) {
    case actionTypes.Pending:
      return { ...initialApiReducerState, isPending: true };
    case actionTypes.Reset:
      return initialApiReducerState;
    case actionTypes.Success:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        data: action?.payload,
      };
    case actionTypes.Error:
      return {
        ...state,
        isPending: false,
        isError: true,
        error: action?.payload,
      };

    default:
      return state;
  }
};
export function useApiReducer<P = any, R = AxiosResponse>(
  promise: (...params: P[]) => Promise<R>
): [ApiReducerState, (...params: P[]) => void, () => void] {
  const [state, dispatch] = useReducer(apiReducer, initialApiReducerState);

  const dispatchAction =
    <R>(type: actionTypes) =>
    (payload?: R) =>
      dispatch({ type, payload });
  const reset = useCallback(() => dispatchAction(actionTypes.Reset)(), []);
  const dispatchPromise = useCallback(
    (...args: P[]): void => {
      //sets isPending=true when called
      dispatchAction(actionTypes.Pending)();

      promise(...args)
        .then((res) => dispatchAction(actionTypes.Success)(res))
        .catch((error) => dispatchAction(actionTypes.Error)(error));
    },
    [promise]
  );
  return [state, dispatchPromise, reset];
}

export default useApiReducer;
