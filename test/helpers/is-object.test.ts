import { isObject } from "@helpers/is-object";

describe("Helpers", () => {
  describe("isObject", () => {
    it("checking the array", () => {
      expect(isObject([])).toBeFalsy();
    });

    it("checking the object", () => {
      expect(isObject({})).toBeTruthy();
    });

    it("checking the null", () => {
      expect(isObject(null)).toBeFalsy();
    });
  });
});
