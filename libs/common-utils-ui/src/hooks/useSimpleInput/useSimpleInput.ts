import { useState, useCallback, ChangeEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
type OnInputChange = (e: ChangeEvent<HTMLInputElement>) => void;
export interface UseSimpleInput {
  value: string;
  onChange: OnInputChange;
  reset: () => void;
  bind: { onChange: OnInputChange; value: string };
  clear: () => void;
  setValue: (value: string) => void;
}

export function useSimpleInput(initialValue = ''): UseSimpleInput {
  const [value, setValue] = useState(initialValue);
  const onChange: OnInputChange = useCallback(
    (e) => setValue(e.target.value),
    []
  );
  const clear = useCallback(() => setValue(''), []);
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return { onChange, value, bind: { value, onChange }, clear, reset, setValue };
}

export default useSimpleInput;
