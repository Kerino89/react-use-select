import { isObject, isEmpty } from "@helpers/type-guards";

describe("Helpers: type-guards", () => {
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

  describe("isEmpty", () => {
    it("checking the array", () => {
      expect(isEmpty([])).toBeTruthy();
    });

    it("checking the object", () => {
      expect(isEmpty({})).toBeTruthy();
    });

    it("checking the string", () => {
      expect(isEmpty("")).toBeTruthy();
    });
  });
});
