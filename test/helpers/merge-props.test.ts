import { mergeProps } from "@helpers/merge-props";

describe("Helpers", () => {
  describe("mergeProps", () => {
    it("merging parameters", () => {
      const mainProps = {
        className: "a",
        style: {
          opacity: 0,
        },
      };

      const props = {
        className: "b",
        role: "button",
        style: {
          opacity: 1,
        },
      };

      expect(mergeProps(mainProps, props)).toEqual({
        className: "a b",
        role: "button",
        style: {
          opacity: 1,
        },
      });

      expect(mergeProps(mainProps, { role: "button" })).toEqual({
        className: "a",
        role: "button",
        style: {
          opacity: 0,
        },
      });
    });
  });
});
