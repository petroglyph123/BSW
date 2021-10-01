<template>
  <div class=container @click="show = true">
    <img :src="v.src" v-for="(v, i) in selected()" :key="i" />
  </div>
  <GlyphSelect :room=room :glyph=glyph v-if=show @close="show=false" />
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

import GlyphSelect from './GlyphSelect.vue'

const props = defineProps({ room: Object, glyph: String });

const data = ref([]);
const show = ref(false);

const selected = () => {
  let glyphs = props.room.patient.glyphs[props.glyph];
  let filtered = data.value.filter((e) => glyphs.some((x) => x === e.id));
  return filtered;
};

const get = () => {
  db.get("glyphs")
    .then((e) => e.filter((e) => e.type === props.glyph))
    .then((e) => e.sort((l, r) => l.text.localeCompare(r.text)))
    .then((e) => (data.value = e));
};
get();

</script>

<style scoped>
img {
  height: 100%;
  border:0px solid transparent;
  transition-duration: .2s;
  border-radius: 3px 3px;
  height: 46px;
}
.container {
  display: flex;
  border:0px solid transparent;
  /* size of glyphs */
  min-height:46px;
  margin: 0px 0px;
  padding:0px 0px;
  flex-wrap: wrap;
}
img:hover {
  transform: scale(2);
}
</style>