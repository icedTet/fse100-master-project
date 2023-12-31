import { useEffect, useLayoutEffect, useState } from "react";
import { EventEmitter } from "events";

class Dispatcher extends EventEmitter {
  dispatch = (key: string, value: any) => {
    this.emit(key, value);
  };
  static instance: Dispatcher;
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new Dispatcher();
    }
    return this.instance;
  };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = globalThis?.localStorage?.getItem(key);
      // Parse stored json or if none return initialValue
      console.log({ item });
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        Dispatcher.getInstance().dispatch(key, valueToStore);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  useEffect(() => {
    const listener = (value: T) => setStoredValue(value);
    Dispatcher.getInstance().on(key, listener);
    return () => {
      Dispatcher.getInstance().off(key, listener);
    };
  }, [key]);
  return [storedValue, setValue] as const;
}

export const useMedia = <T>(
  queries: string[],
  values: T[],
  defaultValue: T
) => {
  // Array containing a media query list for each query
  if (typeof window === "undefined") {
    return defaultValue;
  }
  const mediaQueryLists = queries.map((q) => window.matchMedia(q));
  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return values?.[index] || defaultValue;
  };
  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);
  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return value;
};
export function useDarkMode() {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  const [enabledState, setEnabledState] = useLocalStorage<boolean | null>(
    "darkMode",
    null
  );
  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode();
  useLayoutEffect(() => {
    console.log("prefersDarkMode", { prefersDarkMode, enabledState });
    setEnabledState((prev) => prev ?? prefersDarkMode);
  }, []);
  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled = enabledState ?? prefersDarkMode;
  // Fire off effect that add/removes dark mode class
  // Return enabled state and setter
  console.log("enabled", { enabled });
  return [enabled, setEnabledState] as [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
}
// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
function usePrefersDarkMode() {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}
