import React, { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { once } from "ramda";

export function useBoolean(initial: boolean | (() => boolean)): [boolean, () => void, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(true), () => setState(false)];
}

export function useToggle(initial: boolean | (() => boolean)): [boolean, () => void] {
  const [state, setState] = useState(initial);
  return [state, () => setState(!state)];
}

export function usePromiseProcessing<T, ARG>(
  promiseFunc: (arg: ARG) => Promise<T>,
  config: {
    onSuccess?: (result: T) => void;
    onError?: (error: string) => void;
    onFinish?: () => void;
  } = {},
) {
  const [{ result, error, loading }, setPromiseInfo] = useState<{
    loading: boolean;
    error: string;
    result: T | null;
  }>({
    result: null,
    loading: false,
    error: "",
  });

  const start = (arg: ARG) => {
    setPromiseInfo({
      result: null,
      loading: true,
      error: "",
    });

    promiseFunc(arg)
      .then((data) => {
        setPromiseInfo({
          result: data,
          loading: false,
          error: "",
        });
        config.onSuccess && config.onSuccess(data);
      })
      .catch((error) => {
        setPromiseInfo({
          result: null,
          loading: false,
          error: error.errorMessage,
        });
        config.onError && config.onError(error.errorMessage);
      })
      .then(() => {
        config.onFinish && config.onFinish();
      });
  };

  return {
    result,
    loading,
    error,
    start,
  };
}

export const useOnce = (cb: (data?: any) => any, delay = 0) => {
  const [func] = useState(() => once(delay ? (data?: any) => setTimeout(() => cb(data), delay) : cb));
  return func;
};

export function useForceUpdate() {
  const [, updateState] = useState();
  return useCallback(() => updateState({}), []);
}

// eslint-disable-next-line max-params
export function useDebouncedInput<T>(
  value: string,
  onChange: (value: string, additionalData?: T) => void,
  debounceTime: number,
  charCountThreshold = 3,
) {
  const [inputValue, setInputValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof debounce>>();
  useEffect(() => {
    debounceRef.current = debounce(onChange, debounceTime);
    return () => debounceRef.current!.cancel();
  }, [debounceTime, onChange]);

  React.useEffect(() => setInputValue(value), [value]);

  return {
    inputValue,
    clear: () => {
      setInputValue("");
      debounceRef.current!("");
    },
    onInputChange: (value: string, additionalData?: T) => {
      setInputValue(value);
      if (value.length >= charCountThreshold || value.length === 0) debounceRef.current!(value, additionalData);
    },
  };
}

export const useSetDocumentTitle = (title: string, timeout = 0) => {
  useEffect(() => {
    if (timeout === 0) {
      document.title = title;
      return;
    }
    setTimeout(() => (document.title = title), timeout);
  }, [title]);
};

export const useEffectSkipFirst = (callback: React.EffectCallback, dependencies: any[]) => {
  const wasChanged = useRef(false);

  useEffect(function () {
    if (wasChanged.current) {
      callback();
      return;
    }
    wasChanged.current = true;
  }, dependencies);
};

export function usePrevious<T>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
