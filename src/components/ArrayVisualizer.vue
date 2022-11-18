<template>
  <h2>Array Visualizer</h2>
  <div class="array-container">
    <div v-for="(el, ind) in arr" class="array-el">
      <div class="indice">{{ind}}</div>
      <div class="internal-data">{{el}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps({
  arr: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.array-container {
  display: flex;
}
.array-el {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border: 1px solid black;
    margin: 10px;
}
.indice{
    position: absolute;
    left:0;
    top: 0;
}
.internal-data{
    margin:auto;
    text-align:center;    
}
</style>
