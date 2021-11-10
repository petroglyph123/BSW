<template>
  <div class=image-container>
    <div v-for="(v, i) in glyphs" :key="i" :src="v.src" @click="go(v)" class=tight>
    <img :src="v.src" @click="go(v)" />
    <br>
    {{v.name}}
    </div>
  </div>
  <br />
  <canvas id="canvas" height="100"></canvas>
  <br />
  <div class="flex">
    <div>
      <select v-model="glyph.type">
        <option :value="v" v-for="(v, i) in ['ANC', 'BARRIER', 'DC', 'EDU']" :key="i" > {{ v }} </option>
      </select>
    </div>
    <div>
      <input type="text" v-model="glyph.text" />
    </div>
    <div>
      <select v-model="glyph.fg">
        <option :value="v" v-for="(v, i) in new Set(glyphs.map((e) => e.fg))" :key="i" > {{ v }} </option> </select>
    </div>
    <div>
      <select v-model="glyph.bg">
        <option :value="v.bg" v-for="(v, i) in glyphs" :key="i" :style="{ 'background-color': v.bg, color: v.fg }" > {{ v.bg }} </option>
      </select>
    </div>
    <div>
      <button @click="put" :disabled="!glyph.id">
        update [{{ glyph.id }}]
      </button>
      <button @click="post" :disabled="!glyph.type || !glyph.text">
        insert
      </button>
      <button @click="del" :disabled="!glyph.id">delete[{{ glyph.id }}]</button>
    </div>
  </div>
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

const glyphs = ref([]);
const i = ref(0);
const glyph = ref(new DTO.Glyph());

const comp = (l, r) =>
  l.type.localeCompare(r.type) || l.text.localeCompare(r.text);

const get = () => db.get("glyphs").then((e) => (glyphs.value = e.sort(comp)));

get();

watch(glyph.value, (o, n) => draw.draw("canvas", glyph.value));

const go = (g) => {
  Object.assign(glyph.value, g);
  draw.draw("canvas", glyph.value);
};

const post = () =>
  db.post("glyphs", Object.assign({}, glyph.value, { id: null })).then(get);
const put = () => db.put("glyphs", glyph.value).then(get);
const del = () => db.del("glyphs", glyph.value).then(get);
</script>

<style scoped>
canvas {
  border: 1px solid gray;
  border-radius: 5px 5px;
  box-shadow: 10px 10px 15px gray;
}
img {
  height: 64px;
  box-shadow: 10px 10px 10px gray;
  border-radius: 5px 5px;
  margin: 0.5em 0.5em;
  transition-duration: 0.2s;
}
img:hover {
  box-shadow: 5px 5px 10px gray;
}
div.flex {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  flex-flow: column;
  justify-content: center;
  gap: 0.25em 1em;
}

div.image-container {
  width:80%;
  margin:auto auto;
}
div.tight {
  display: inline-block;
  margin:.5em .5em;
}
</style>