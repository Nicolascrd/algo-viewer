<template>
  <div class="buttons">
    <button
      @click="next"
      id="next"
      :disabled="reachedEnd"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      Next
    </button>
    <button
      @click="end"
      id="end"
      :disabled="reachedEnd"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      End
    </button>
    <button
      @click="reset"
      id="reset"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      Reset
    </button>
  </div>
  <div class="input-arr">
    <span class="input-title">Input Array :</span>

    <input
      type="text"
      id="first_name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="9, 7, 3, 2, -2, -9"
      required
      v-model="arrayRawInput"
    />

    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 ml-6 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="submit"
      id="submit-button"
    >
      Submit
    </button>
  </div>
  <div class="array-vi">
    <ArrayVisualizer
      name="Bubble Sort"
      :arr="highlightedArray"
      :arrowPositions="arrowPosition.length == 0 ? [] : [arrowPosition]"
      :highlightedSquares="[indexInsertSort, indexInsertSort + 1]"
      :comments="['Bubble Number: ' + bubbleNumber + ' / ' + bubbleNeeded]"
    >
    </ArrayVisualizer>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import ArrayVisualizer from "./ArrayVisualizer.vue";
import { parseRawStringArray } from "../tools/parser";
import { IArrayElement } from "../tools/interfaces";
const testArray = "[9, 7, 3, 2, -2, -9]";
let indexInsertSort = ref(0);
let bubbleNumber = ref(0);
let bubbleNeeded = ref(0);
let arrayRawInput = "";

const array = ref([] as Array<number>);

onMounted(() => {
  array.value = JSON.parse(testArray); // copy;
  bubbleNeeded.value = array.value.length - 1;
});

const submit = function () {
  array.value = parseRawStringArray(arrayRawInput);
  bubbleNeeded.value = array.value.length - 1;
  indexInsertSort.value = 0;
  bubbleNumber.value = 0;
};

const next = function () {
  if (bubbleNumber.value > bubbleNeeded.value) {
    return;
  }
  if (
    array.value[indexInsertSort.value] > array.value[indexInsertSort.value + 1]
  ) {
    [
      array.value[indexInsertSort.value],
      array.value[indexInsertSort.value + 1],
    ] = [
      array.value[indexInsertSort.value + 1],
      array.value[indexInsertSort.value],
    ];
  }
  indexInsertSort.value++;
  if (indexInsertSort.value >= array.value.length - 1 - bubbleNumber.value) {
    indexInsertSort.value = 0;
    bubbleNumber.value += 1;
  }
};

const end = function () {
  while (bubbleNumber.value < bubbleNeeded.value) {
    next();
  }
};

const reset = function () {
  array.value = JSON.parse(testArray);
  bubbleNeeded.value = array.value.length - 1;
  bubbleNumber.value = 0;
  indexInsertSort.value = 0;
};

const reachedEnd = computed(() => {
  return bubbleNeeded.value == bubbleNumber.value;
});

const arrowPosition = computed(() => {
  if (
    array.value[indexInsertSort.value] > array.value[indexInsertSort.value + 1]
  ) {
    return [indexInsertSort.value, indexInsertSort.value + 1];
  }
  return [];
});

const highlightedArray = computed(() => {
  const res = [] as Array<IArrayElement>;
  for (let i = 0; i < array.value.length; i++) {
    res.push({
      value: array.value[i],
      highlighted:
        bubbleNumber.value < bubbleNeeded.value &&
        (i === indexInsertSort.value || i === indexInsertSort.value + 1),
    });
  }
  return res;
});
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.input-arr {
  width: 600px;
  margin: auto;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.array-vi {
  width: 600px;
  margin: auto;
  margin-top: 20px;
  border: 2px solid darkgrey;
}

.buttons {
  position: fixed;
  left: calc(50% - 150px); /* 50% - width / 2 */
  margin: auto;
  top: 500px;
  width: 300px;
  display: flex;
  justify-content: space-between;
}

button:disabled {
  cursor: not-allowed;
}

.input-title {
  width: 100px;
}
</style>
