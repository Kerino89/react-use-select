import { isEqual } from "@helpers/is-equal";

describe("Helpers: isEqual", () => {
  it("comparisons of identical objects", () => {
    const a = { a: 1, b: { a: 5, b: new Date(2021) } };
    const b = { b: { b: new Date(2021), a: 5 }, a: 1 };

    expect(isEqual(a, b)).toBeTruthy();
  });

  it("comparisons of different objects", () => {
    const a = { a: 1, b: { a: "test", b: new Date() } };
    const b = { a: 1, b: { a: "test", b: new Date(2021) } };

    expect(isEqual(a, b)).toBeFalsy();
  });

  it("comparisons of identical array", () => {
    const a = ["a", { a: 5, b: new Date(2021) }];
    const b = ["a", { a: 5, b: new Date(2021) }];

    expect(isEqual(a, b)).toBeTruthy();
  });

  it("comparisons of different array", () => {
    const a = ["a", { a: "test", b: new Date(2021) }];
    const b = ["a", { a: "test", b: new Date() }];

    expect(isEqual(a, b)).toBeFalsy();
  });

  it("string comparisons", () => {
    const a = "test";
    const b = "run";

    expect(isEqual(a, b)).toBeFalsy();
  });
});
