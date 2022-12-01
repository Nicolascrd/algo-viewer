<template>
  <h2>{{ name ? name : "Array Visualizer" }}</h2>
  <div>
    <div class="array-container" id="array-cont">
      <div
        v-for="(el, ind) in arr"
        class="array-el"
        :class="{
          'highlighted-array-el': el.highlighted,
        }"
        :id="arrayElID + String(ind)"
      >
        <div class="indice">{{ ind }}</div>
        <div class="internal-data">{{ el.value }}</div>
      </div>
    </div>
    <div class="svg-container" v-if="arrows.length">
      <ArrowsArray :arrows="arrows"></ArrowsArray>
    </div>
    <div class="comments-container" v-if="comments">
      <div v-for="com in comments">
        {{ com }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import ArrowsArray from "./ArrowsArray.vue";
import { IArrow, IArrayElement } from "./../tools/interfaces";

const arrayElID = "array-el-";
const standardHeight = 15;

interface IPosition {
  left: number;
  right: number;
  bottom: number;
}

const props = defineProps({
  arr: {
    type: Array<IArrayElement>,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  arrowPositions: {
    // display movement of the numbers
    // format : [[0, 2], [1, 3]] --> two arrows from 0 to 2 and from 1 to 3
    type: Array<Array<number>>,
    required: false,
  },
  highlightedSquares: {
    // contains indexes
    // display numbers currently compared, for example
    type: Array<number>,
    required: false,
  },
  comments: {
    // comment to display below the visualization
    type: Array<string>,
    required: false,
  },
});

let boxPositions = ref([] as Array<IPosition>);
const arrows = ref([] as Array<IArrow>);

watch(
  // when rendering the parent component of this visualizer, the value of left, right and so on are set, which triggers this each time
  [() => props.arrowPositions, () => props.arr],
  async () => {
    await nextTick(); // next tick needed because arrow positions depend on square positions which need dom render to be available
    updateBoxPositions();
    updateArrows();
  }
);

const updateBoxPositions = function () {
  if (props.arrowPositions == undefined) {
    return;
  }
  let leftShift = document
    .getElementById("array-cont")
    ?.getBoundingClientRect().left;
  if (leftShift == undefined) {
    return;
  }
  let bp = [] as Array<IPosition>;
  for (let i = 0; i < props.arr.length; i++) {
    let rect = document
      .getElementById(arrayElID + String(i))
      ?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    bp.push({
      left: rect.left - leftShift,
      right: rect.right - leftShift,
      bottom: rect.bottom,
    });
  }
  boxPositions.value = bp;
};

const updateArrows = function () {
  const res: Array<IArrow> = [];
  if (props.arrowPositions == undefined) {
    return;
  }
  props.arrowPositions.forEach((element, index) => {
    if (element.length != 2) {
      console.error(
        `Arrow position array should be of length 2 but has length ${element.length} at position ${index}`
      );
      return;
    }
    let arrPos = generateArrowPosition(standardHeight * (index + 1), element); // index + 1 because we want height > 0 for all arrows
    if (arrPos.height) {
      res.push(arrPos);
    }
  });

  arrows.value = res;
};

const generateArrowPosition = function (height: number, arr: Array<number>) {
  if (arr.length != 2) {
    console.error(
      "Array to generate arrow position should be of length 2 but has length " +
        arr.length
    );
  }
  let startRec = boxPositions.value[arr[0]];
  if (!startRec) {
    console.log(
      "Cannot get position of square with id: " + arrayElID + String(arr[0]) // can happen as we need one mount to know position of the boxes and draw arrows
    );
    return {} as IArrow;
  }
  let start = (startRec.left + startRec.right) / 2;
  let endRec = boxPositions.value[arr[1]];
  if (!endRec) {
    console.log(
      "Cannot get position of square with id: " + arrayElID + String(arr[1]) // can happen as we need one mount to know position of the boxes and draw arrows
    );
    return {} as IArrow;
  }

  let end = 0;
  if (arr[1] > arr[0]) {
    // from left to right
    end = endRec.right;
  } else {
    end = endRec.left;
  }
  return {
    start: start,
    end: end,
    height: height,
  } as IArrow;
};
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
  margin: 0 10px;
  box-sizing: border-box;
}

.highlighted-array-el {
  border: 1px dotted darkred;
}

.indice {
  position: absolute;
  left: 2px;
  top: 1px;
}
.internal-data {
  margin: auto;
  text-align: center;
}
.comments-container {
  margin: 10px 0 5px 10px;
}
</style>
