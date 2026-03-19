import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoList from "../components/TodoList.vue";

describe("TodoList", () => {
  const todos = [
    { id: 1, title: "First", done: false },
    { id: 2, title: "Second", done: true },
  ];

  it("renders without errors", () => {
    const wrapper = mount(TodoList, {
      props: { todos },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("renders correct number of items", () => {
    const wrapper = mount(TodoList, {
      props: { todos },
    });

    expect(wrapper.findAll("li")).toHaveLength(2);
  });

  it("passes toggle event upward", async () => {
    const wrapper = mount(TodoList, {
      props: { todos },
    });

    await wrapper.find("span").trigger("click");

    expect(wrapper.emitted("toggle")).toBeTruthy();
    expect(wrapper.emitted("toggle")[0]).toEqual([1]);
  });

  it("passes remove event upward", async () => {
    const wrapper = mount(TodoList, {
      props: { todos },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });
});
