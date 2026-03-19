import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "../components/TodoItem.vue";

describe("TodoItem", () => {
  const todo = {
    id: 1,
    title: "Test todo",
    done: false,
  };

  it("renders without errors", () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("renders todo title from props", () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    expect(wrapper.text()).toContain("Test todo");
  });

  it("emits toggle with todo id", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    await wrapper.get("span").trigger("click");

    expect(wrapper.emitted("toggle")).toBeTruthy();
    expect(wrapper.emitted("toggle")[0]).toEqual([1]);
  });

  it("emits remove with todo id", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo },
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.emitted("remove")).toBeTruthy();
    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });
});
