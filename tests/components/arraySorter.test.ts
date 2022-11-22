import { expect, test } from "vitest";
import { mount } from '@vue/test-utils'

import ArraySorter from "../../src/components/ArraySorter.vue";

test("mount array sorter", async () => {
    expect(ArraySorter).toBeTruthy()

    const wrapper = mount(ArraySorter)

    expect(wrapper.text()).toContain("Input Array :")

    wrapper.get('input').setValue("1, 9, 0")

    wrapper.get('#submit-button').trigger("click")

    expect(wrapper.vm.array).toStrictEqual([1, 9, 0])
    expect(wrapper.vm.maxLoopNeeded).toStrictEqual(2)

});
