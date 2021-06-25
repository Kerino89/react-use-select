import { useEffect, useRef } from "react";

import type { RefObject } from "react";
import type { Handler, AnyEvent, Options, EventType } from "./use-on-click-outside.interface";

const defaultEventTypes: Array<EventType> = ["mousedown", "touchstart"];

export const useOnClickOutside = <R extends HTMLElement = HTMLElement>(
  ref: RefObject<R>,
  handler: Handler,
  { disabled, eventTypes = defaultEventTypes }: Options = {},
): void => {
  const savedHandler = useRef<Handler>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (disabled || !handler) {
      return void 0;
    }

    const eventListener = (event: AnyEvent) => {
      const el = ref?.current;

      if (!el || !savedHandler.current || el.contains(event.target as Node)) {
        return void 0;
      }

      savedHandler.current(event);
    };

    eventTypes.forEach((type) => {
      document.addEventListener(type, eventListener);
    });

    return () => {
      eventTypes.forEach((type) => {
        document.removeEventListener(type, eventListener);
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, !handler, disabled, JSON.stringify(eventTypes)]);
};
