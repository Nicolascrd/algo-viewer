import { parseRawStringArray } from "../../src/tools/parser";
import {test, expect} from "vitest"

test("parsing raw string array", () => {
  expect(parseRawStringArray("1, 2, 3, 4")).toStrictEqual([1, 2, 3, 4]);
});

test("parsing raw string array with negative numbers", () => {
  expect(parseRawStringArray("-1, 42, -3, 4")).toStrictEqual([-1, 42, -3, 4]);
});

