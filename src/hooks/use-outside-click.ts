import React, { useEffect } from "react";
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: (event: Event) => void,
  excludeSelectors: string[] = [] // 👈 NEW: optional selectors to ignore
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const target = event.target as HTMLElement;

      // If click is inside ref → do nothing
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      // If click matches any exclude selector → do nothing
      if (excludeSelectors.some((selector) => target.closest(selector))) {
        return;
      }

      // Otherwise → treat as outside click
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback, excludeSelectors]);
};
