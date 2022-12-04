<template>
  <div class="buttons">
    <button
      @click="next"
      id="next"
      :disabled="reachedEnd"
      class="bottom-button"
    >
      Next
    </button>
    <button @click="end" id="end" :disabled="reachedEnd" class="bottom-button">
      End
    </button>
    <button @click="reset" id="reset" class="bottom-button">Reset</button>
  </div>
  <div class="input-arr">
    <span class="input-title">Input Array :</span>

    <input
      type="text"
      class="input-array"
      placeholder="9, 7, 3, 2, -2, -9"
      required
      v-model="arrayRawInput"
    />

    <button
      type="submit"
      class="submit-button"
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

.bottom-button {
  color: rgb(31 41 55);
  font-weight: 700;
  padding: 0.5em 1em 0.5em 1em;
  background-color: rgb(209 213 219);
  border-radius: 0.25em;
  cursor: pointer;
}
.bottom-button:hover {
  background-color: rgb(156 163 175);
}

.input-array {
  color: rgb(17 24 39);
  font-size: 0.875em;
  line-height: 1.25em;
  padding: 0.625em;
  background-color: rgb(249 250 251);
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5em;
}

.input-array:focus {
  border-color: rgb(59 130 246);
}

.submit-button {
  color: rgb(255 255 255);
  font-weight: 500;
  font-size: 0.875em;
  line-height: 1.25em;
  text-align: center;
  padding: 0.625em 1.25em;
  background-color: rgb(29 78 216);
  margin-left: 1.5em;
  border-radius: 0.5em;
  cursor: pointer;
}

.submit-button:focus {
  border-color: rgb(147 197 253);
}
.submit-button:hover {
  background-color: rgb(30 64 175);
}
</style>
