import { describe, it, expect } from "vitest";
import { getActiveCount, filterTodos } from "../utils/todo";

describe("todo utils", () => {
  it("returns correct active count", () => {
    const list = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: true },
      { id: 3, title: "C", done: false },
    ];

    const result = getActiveCount(list);

    expect(result).toBe(2);
  });

  it("filters active todos", () => {
    const list = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: true },
    ];

    const result = filterTodos(list, "active");

    expect(result).toEqual([{ id: 1, title: "A", done: false }]);
  });

  it("filters done todos", () => {
    const list = [
      { id: 1, title: "A", done: false },
      { id: 2, title: "B", done: true },
    ];

    const result = filterTodos(list, "done");

    expect(result).toEqual([{ id: 2, title: "B", done: true }]);
  });
});
