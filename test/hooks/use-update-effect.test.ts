import { renderHook } from "@testing-library/react-hooks/dom";
import { useUpdateEffect } from "@hooks/use-update-effect";

describe("Hooks", () => {
  describe("useUpdateEffect", () => {
    it("run effect on update", () => {
      const fn = jest.fn();
      const { rerender } = renderHook(() => useUpdateEffect(fn));

      expect(fn).not.toHaveBeenCalled();

      rerender();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it("run function on unmount", () => {
      const unmountFn = jest.fn();
      const fn = jest.fn().mockReturnValue(unmountFn);
      const { rerender, unmount } = renderHook(() => useUpdateEffect(fn));

      rerender();
      unmount();

      expect(unmountFn).toHaveBeenCalledTimes(1);
    });
  });
});
