import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";

import BubbleSort from "../../src/components/BubbleSort.vue";

test("mount array sorter", async () => {
  expect(BubbleSort).toBeTruthy();

  const wrapper = mount(BubbleSort);

  expect(wrapper.text()).toContain("Input Array :");

  wrapper.get("input").setValue("1, 9, 0");

  wrapper.get("#submit-button").trigger("click");

  expect(wrapper.vm.array).toStrictEqual([1, 9, 0]);
  expect(wrapper.vm.bubbleNeeded).toStrictEqual(2);

  const nextButton = wrapper.get("#next");

  nextButton.trigger("click");
  nextButton.trigger("click");
  nextButton.trigger("click");

  expect(wrapper.vm.reachedEnd).toBe(true);
});

test("test bubble sort", async () => {
  expect(BubbleSort).toBeTruthy();

  const wrapper = mount(BubbleSort);

  expect(wrapper.text()).toContain("Input Array :");

  const endButton = wrapper.get("#end");

  endButton.trigger("click");

  expect(wrapper.vm.reachedEnd).toBe(true);

  for (let i = 0; i < wrapper.vm.array.length - 1; i++) {
    expect(wrapper.vm.array[i] < wrapper.vm.array[i + 1]).toBe(true);
  }
});


