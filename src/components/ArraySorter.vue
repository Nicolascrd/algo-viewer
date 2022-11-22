<template>
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
    <ArrayVisualizer name="Array Vi" :arr="array"> </ArrayVisualizer>
  </div>
  <div class="buttons">
    <button
      @click="next"
      :disabled="reachedEnd"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      Next
    </button>
    <button
      @click="end"
      :disabled="reachedEnd"
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
    >
      End
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from "vue";
import ArrayVisualizer from "./ArrayVisualizer.vue";
import { parseRawStringArray } from "./../tools/parser";
const testArray = reactive([9, 7, 3, 2, -2, -9]);
let indexInsertSort = ref(0);
let maxLoopNeeded = ref(testArray.length - 1);
let arrayRawInput = "";

const array = ref([] as Array<number>);

onMounted(() => {
  array.value = testArray;
});

const submit = function () {
  array.value = parseRawStringArray(arrayRawInput);
  maxLoopNeeded.value = array.value.length - 1;
};

const next = function () {
  for (let i = 0; i < array.value.length - 1; i++) {
    if (array.value[i] > array.value[i + 1]) {
      [array.value[i], array.value[i + 1]] = [
        array.value[i + 1],
        array.value[i],
      ];
    }
  }
  indexInsertSort.value++;
};

const end = function () {
  while (indexInsertSort.value < maxLoopNeeded.value) {
    next();
  }
};

const reachedEnd = computed(() => {
  return indexInsertSort.value == maxLoopNeeded.value;
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
  margin: auto;
  margin-top: 50px;
  width: 200px;
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
