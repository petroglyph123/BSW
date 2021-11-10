<template>
  <div>
    <div class="section" @load="console.log('load')">
      <input type="button" value="save" @click="save" />
      <input type="button" value="refresh" @click="refresh" />
      <input type="button" value="reset (del all)" @click="reset" />
    </div>
    <canvas id="canvas" height="100"></canvas>
    <div v-for="(item, index) in icons" :key="index" class=container>
      <img :src="item.src" class="large" />
      <img :src="item.src" class="medium" />
      <img :src="item.src" class="small" />
      <br />
      {{ item.type }} {{ item.text }} {{ item.bg }}j {{ index }}
      {{ item.length }} {{ item.width }} {{item.name}}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import * as draw from "../lib/iconMaker";
import("../css/style.css");

import { defined_icons3 as defined_icons } from "../assets/icons";

const icons = ref(defined_icons);

const paint = (icon, index) => {
  // let canvas = document.getElementById(`canvas`);
  // let ctx = canvas.getContext("2d");
  // ctx.font = `100 30px Helvetica`;
  // let length = icon.length = Math.floor(ctx.measureText(icon.text).width);
  // icon.width = length > 100 ? length + 10 : 100;
  draw(icon, index);
};

const refresh = () => icons.value.forEach((e) => draw.draw("canvas", e) );

setTimeout(() => { refresh(); }, 1);

const save = () => {
  for (let i = 0; i < icons.value.length; i++) {
    let icon = icons.value[i];
    let item = Object.assign({ id: null }, icon);
    db.post("glyphs", item);
  }
};

const reset = () => {
  db.get('glyphs').then(res => res.forEach(g => db.del('glyphs', g)));
}

// init();
</script>

<style scoped>
canvas {
  border-radius: 5px 5px;
  border: 1px solid lightgray;
  box-shadow: 5px 5px 5px gray;
  /* height: 32px; */
}
img {
  border-radius: 5px 5px;
  margin-left: 1em;
  box-shadow: 5px 5px 5px gray;
}
img.large {
  height: 100px;
}
img.medium {
  height: 64px;
}
img.small {
  height: 32px;
}
.container {
  padding:.25em 1em;
}
img {
  transition-duration: .25s;
}
img:hover {
  transform: scale(1.25);
}
canvas {
  display: none;
}
</style>