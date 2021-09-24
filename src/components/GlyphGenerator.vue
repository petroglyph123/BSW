<template>
  <div>
    <div class="section" @load="console.log('load')">
      <input type="button" value="save" @click="save" />
      <input type="button" value="refresh" @click="refresh" />
    </div>
    <canvas id="canvas" height="100"></canvas>
    <div v-for="(item, index) in icons" :key="index" class=container>
      <img :src="item.src" class="large" />
      <img :src="item.src" class="medium" />
      <img :src="item.src" class="small" />
      <br />
      {{ item.type }} {{ item.text }} {{ item.bg }}j {{ index }}
      {{ item.length }} {{ item.width }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

import { defined_icons } from "../assets/icons";

const icons = ref(defined_icons);

// const props = defineProps({ room: Object });

const draw = (icon, index) => {
  let a = (2 * Math.PI) / 6;

  const canvas = document.getElementById(`canvas`);
  const ctx = canvas.getContext("2d");

  canvas.width = icon.width;
  ctx.clearRect(0, 0, icon.width, 100);

  ctx.fillStyle = icon.bg;
  ctx.beginPath();
  if (icon.type === "ANC") {
    ctx.rect(icon.width / 2 - 50, 0, 100, 100);
  } else if (icon.type === "DC") {
    ctx.moveTo(icon.width / 2, 0);
    ctx.lineTo(icon.width / 2 + 50, 100);
    ctx.lineTo(icon.width / 2 - 50, 100);
    ctx.lineTo(icon.width / 2, 0);
  } else if (icon.type === "BARRIER") {
    ctx.arc(icon.width / 2, 50, 50, 0, 2 * Math.PI);
  } else if (icon.type === "EDU") {
    for (var n = 0; n < 6; n++) {
      ctx.lineTo(
        icon.width / 2 + (100 / 2) * Math.cos(a * n),
        50 + 50 * Math.sin(a * n)
      );
    }
  }
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.font = `900 30px Helvetica`;
  ctx.fillStyle = icon.fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(icon.text, icon.width / 2, 50);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.strokeText(icon.text, icon.width / 2, 50);
  ctx.closePath();
  icon.src = canvas.toDataURL("image/png");
};

const paint = (icon, index) => {
  let canvas = document.getElementById(`canvas`);
  let ctx = canvas.getContext("2d");
  ctx.font = `900 30px Helvetica`;
  let length = icon.length = Math.floor(ctx.measureText(icon.text).width);
  icon.width = length > 100 ? length + 10 : 100;
  draw(icon, index);
};

const refresh = () => icons.value.forEach(paint);

setTimeout(() => { refresh(); }, 1);

const save = () => {
  for (let i = 0; i < icons.value.length; i++) {
    let icon = icons.value[i];
    let item = Object.assign({ id: null }, icon, { type: icon.type.toLowerCase(), });
    db.post("glyphs", item);
  }
};

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