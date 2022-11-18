<template>
  <div class="array-vi">
    <ArrayVisualizer :arr="testArray"> </ArrayVisualizer>
  </div>
</template>

<script setup lang="ts">
import ArrayVisualizer from "./components/ArrayVisualizer.vue";
const testArray = [1, 2, 3, 4, 8];
</script>

<style scoped>
.array-vi {
  width: 400px;
}
</style>
