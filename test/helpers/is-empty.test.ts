import { isEmpty } from "@helpers/is-empty";

describe("Helpers", () => {
  describe("isEmpty", () => {
    it("checking the array", () => {
      const arr: unknown[] = [];

      expect(isEmpty(arr)).toBeTruthy();
    });

    it("checking the object", () => {
      const obj = {};

      expect(isEmpty(obj)).toBeTruthy();
    });

    it("checking the string", () => {
      const str = "";

      expect(isEmpty(str)).toBeTruthy();
    });
  });
});
