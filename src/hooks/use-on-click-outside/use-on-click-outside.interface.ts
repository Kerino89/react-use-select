import type { RefObject } from "react";

export interface Options {
  disabled?: boolean;
  ignoreRef?: RefObject<HTMLElement>;
  eventTypes?: Array<EventType>;
}

export type EventType = "touchstart" | "mousedown";
export type AnyEvent = MouseEvent | TouchEvent;
export type Handler = (event: AnyEvent) => void;
