import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "../components/TodoInput.vue";

describe("TodoInput", () => {
  it("renders without errors", () => {
    const wrapper = mount(TodoInput, {
      props: {
        modelValue: "",
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it("renders passed modelValue", () => {
    const wrapper = mount(TodoInput, {
      props: {
        modelValue: "initial",
      },
    });

    const input = wrapper.get("input");
    expect(input.element.value).toBe("initial");
  });

  it("emits update:modelValue on input", async () => {
    const wrapper = mount(TodoInput, {
      props: {
        modelValue: "initial",
      },
    });

    const input = wrapper.get("input");
    await input.setValue("New title");

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    expect(wrapper.emitted("update:modelValue")[0]).toEqual(["New title"]);
  });

  it("emits submit on button click", async () => {
    const wrapper = mount(TodoInput, {
      props: {
        modelValue: "",
      },
    });

    await wrapper.get("button").trigger("click");

    expect(wrapper.emitted("submit")).toBeTruthy();
  });
});
