<template>
  <!-- svg arrow from https://fffuel.co/pppointed/ -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs"
    :viewBox="'0 0 600 ' + svgHeight"
  >
    <g v-for="arrow in arrows">
      <g
        stroke-width="3"
        stroke="hsl(230, 55%, 40%)"
        fill="none"
        stroke-linecap="square"
      >
        <polyline
          :points="points(arrow)"
          marker-end="url(#SvgjsMarker1158)"
        ></polyline>
      </g>
      <defs>
        <marker
          markerWidth="4"
          markerHeight="4"
          refX="2"
          refY="2"
          viewBox="0 0 4 4"
          orient="auto"
          id="SvgjsMarker1158"
        >
          <polygon
            points="0,4 1.3333333333333333,2 0,0 4,2"
            fill="hsl(230, 55%, 40%)"
          ></polygon>
        </marker>
      </defs>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { IArrow } from "./../tools/interfaces";
const props = defineProps({
  arrows: {
    type: Array<IArrow>,
    required: true,
  },
});

const svgHeight = computed(() => {
  return 15 + Math.max(...props.arrows.map((value) => value.height));
});

const points = function (arr: IArrow) {
  let x1 = arr.start;
  let x2 = arr.end +5;
  let y1 = 5;
  let y2 = 5 + arr.height;

  return `${x1},${y1} ${x1},${y2} ${x2},${y2} ${x2},${y1 + 2}`; // + 2 is space for the arrow
};
</script>

<style scoped></style>
