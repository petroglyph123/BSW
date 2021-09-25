<template> 
<select v-model="i" @change="go(i)">
<option :value="i" v-for="(v,i) in Array(length).fill()"  :key=i>{{i}}</option>
</select>
    <br>
    <br>
    <canvas id="canvas" height="100"></canvas>
    <br>
    {{icons[i].text}}
    {{icons[i].width}}
    {{icons[i].length}}
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import * as draw from "../lib/IconMaker";
import("../css/style.css");

import { defined_icons } from "../assets/icons";

const icons = ref(defined_icons);
const length = ref(icons.value.length)
const i = ref(0);

const go = (i) => {
  console.log(i, icons.value[i]);
  draw.draw("canvas", icons.value[i])
  console.log(icons.value[i].src)
}

</script>

<style scoped>
canvas {
  border:1px solid gray;
  border-radius: 5px 5px;
  box-shadow: 10px 10px 15px gray;
}
</style>