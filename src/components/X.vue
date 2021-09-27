<template>
  <select v-model="i" @change="go(i)">
    <option
      :value="i"
      v-for="(v, i) in icons"
      :key="i"
      :style="{ 'background-color': v.bg, color: v.fg }"
    >
    {{v.id}} {{ v.type }} {{ v.text }}
    </option>
  </select>
  <br />
  <br />
  <canvas id="canvas" height="100"></canvas>
  <br />
  <table>
    <tr>
      <td>
        <select v-model="glyph.type">
          <option
            :value="v"
            v-for="(v, i) in ['ANC', 'BARRIER', 'DC', 'EDU']"
            :key="i"
          >
            {{ v }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <input type="text" v-model="glyph.text" />
      </td>
    </tr>
    <tr>
      <td>
        <select v-model="glyph.fg">
          <option :value="v.fg" v-for="(v, i) in icons" :key="i">
            {{ v.fg }}
          </option>
        </select>
      </td>
    </tr>
    <tr>
      <td>
        <select v-model="glyph.bg">
          <option
            :value="v.bg"
            v-for="(v, i) in icons"
            :key="i"
            :style="{ 'background-color': v.bg, color: v.fg }"
          >
            {{ v.bg }}
          </option>
        </select>
      </td>
    </tr>
  </table>
  {{ glyph.id }}
  {{ glyph.type }}
  {{ glyph.text }}
  {{ glyph.width }}
  {{ glyph.length }}
  {{ glyph.bg }}
  {{ glyph.fg }}
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as draw from "../lib/IconMaker";
import * as DTO from "../lib/DTO";
import("../css/style.css");

import { defined_icons } from "../assets/icons";

const icons = ref(defined_icons);
const i = ref(0);
const glyph = ref(new DTO.Glyph());

const sync_id = (data) => {
  console.log(data);
  console.log(icons.value)
  icons.value.forEach((icon) => {
    icon.id = data.findIndex(
      (d) =>
        d.type === icon.type &&
        d.text === icon.text
    );
    if (icon.id === -1) icon.id = null;
    else icon.id = data[icon.id].id;
    console.log(icon.id);
  });
};

db.get("glyphs").then(sync_id);

watch(glyph.value, (o, n) => draw.draw("canvas", glyph.value));

const go = (i) => {
  Object.assign(glyph.value, icons.value[i]);
  // console.log(i, glyph.value);
  // draw.draw("canvas", icons.value[i])
  draw.draw("canvas", glyph.value);
  // console.log(glyph.value);
};
</script>

<style scoped>
canvas {
  border: 1px solid gray;
  border-radius: 5px 5px;
  box-shadow: 10px 10px 15px gray;
}
table {
  margin: auto auto;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>