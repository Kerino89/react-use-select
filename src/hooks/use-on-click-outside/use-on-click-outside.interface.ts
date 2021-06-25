export interface Options {
  disabled?: boolean;
  eventTypes?: Array<EventType>;
}

export type EventType = "touchstart" | "mousedown";
export type AnyEvent = MouseEvent | TouchEvent;
export type Handler = (event: AnyEvent) => void;
