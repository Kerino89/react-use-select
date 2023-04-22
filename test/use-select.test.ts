import { renderHook } from "@testing-library/react-hooks";
import { useSelect, UseSelectProps, UseSelect } from "../src";

describe("useSelect", () => {
  const initialProps: UseSelectProps = { value: { value: 1, label: "1" } };

  const hook = () => {
    return renderHook<UseSelectProps, UseSelect>((props) => useSelect(props), { initialProps });
  };

  it("return initialProps", () => {
    const { result } = hook();

    expect(result.current.state.selected).toEqual([initialProps.value]);
  });

  it("return new value", () => {
    const newValue = { value: 2, label: "2" };
    const { result, rerender } = hook();

    rerender({ value: newValue });
    expect(result.current.state.selected).toEqual([newValue]);
  });

  it("sets selected when setting value null", () => {
    const { result, rerender } = hook();

    rerender({ value: null });
    expect(result.current.state.selected).toEqual([]);
  });

  it("sets selected when setting value undefined", () => {
    const { result, rerender } = hook();

    rerender({ value: undefined });
    expect(result.current.state.selected).toEqual([]);
  });
});
