export type MergeSpread<T extends ReadonlyArray<unknown>> = T extends [infer L, ...infer R]
  ? Pick<L, Exclude<keyof L, keyof MergeSpread<R>>> & MergeSpread<R> extends infer O
    ? { [K in keyof O]: O[K] }
    : never
  : never;

export const mergeProps = <T extends ReadonlyArray<React.HTMLAttributes<HTMLElement>>>(
  ...props: T
): MergeSpread<T> => {
  if (props.length === 1) {
    return props[0] as MergeSpread<T>;
  }

  return props.reduce((result, { className, style, ...restProps }) => {
    result = { ...result, ...restProps };

    if (style) {
      result.style = { ...result?.style, ...style };
    }

    if (className) {
      result.className = result.className ? `${result.className} ${className}` : className;
    }

    return result;
  }, {}) as MergeSpread<T>;
};
