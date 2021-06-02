import { useEffect, useRef } from "react";

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isFirstMounted = useRef(true);

  useEffect(() => {
    if (!isFirstMounted.current) {
      return effect();
    } else {
      isFirstMounted.current = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
