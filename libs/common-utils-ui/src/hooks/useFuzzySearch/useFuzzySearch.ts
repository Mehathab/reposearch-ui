import { useCallback } from 'react';
import Fuse from 'fuse.js';
import useSimpleInput, {
  UseSimpleInput,
} from '../useSimpleInput/useSimpleInput';

export interface UseFuzzySearch<T> extends Partial<UseSimpleInput> {
  results: Fuse.FuseResult<T>[];
  searchTerm: UseSimpleInput['value'];
  setSearchTerm: UseSimpleInput['setValue'];
}
const DEFAULT_MIN_CHAR_LENGTH = 3;
export function useFuzzySearch<T>(
  dataArray: T[],
  options: Fuse.IFuseOptions<T>
): UseFuzzySearch<T> {
  // defining fuse
  const fuse = useCallback(() => {
    const defaultOptions: Fuse.IFuseOptions<T> = {
      isCaseSensitive: false,
      includeScore: false,
      includeMatches: false,
      minMatchCharLength: DEFAULT_MIN_CHAR_LENGTH,
      shouldSort: true,
      findAllMatches: false,
      keys: [],
      threshold: 0.3,
      location: 0,
      distance: 100,
    };
    const fuzzyOptions = { ...defaultOptions, ...options };
    return new Fuse<T>(dataArray, fuzzyOptions);
  }, [dataArray, options]);
  // useInput
  const {
    value: searchTerm,
    setValue: setSearchTerm,
    bind,
    onChange,
    clear,
  } = useSimpleInput('');
  // search for fuse match
  const getFuseResults = useCallback(
    () => fuse().search(searchTerm),
    [fuse, searchTerm]
  );
  // fuse wrapper on default search
  const getDefaultResults = useCallback(
    () =>
      dataArray?.map?.((item, index) => ({
        item,
        matches: [],
        score: 1,
        refIndex: index,
      })),
    [dataArray]
  );

  const results =
    searchTerm.length >= (options.minMatchCharLength ?? DEFAULT_MIN_CHAR_LENGTH)
      ? getFuseResults()
      : getDefaultResults();

  return {
    results,
    setSearchTerm,
    bind,
    clear,
    onChange,
    searchTerm,
  };
}

export default useFuzzySearch;
