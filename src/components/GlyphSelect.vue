<template>
  <div class="back-drop" @click="emits('close')" @dblclick.stop>
    <div @click.stop class="not-selected" @dblclick.stop>
      <h2 style="color: green">Click Glyph to select</h2>
      <div v-for="(v, i) in data" :key="i" @click="toggle(v, this)" style="display: inline-block" >
        <transition name="fade">
          <img :src="v.src" v-show="!v.selected" />
        </transition>
      </div>
    </div>
    <div class="selected" @click.stop @dblclick.stop>
      <h2 style="color: red">Click Glyph to de-select</h2>
      <div v-for="(v, i) in data" :key="i" @click="toggle(v, this)" style="display: inline-block" >
        <transition name="fade">
          <img :src="v.src" v-if="v.selected" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const props = defineProps({ room: Object, glyph: String });
const emits = defineEmits(["close"]);
const data = ref([]);

const glyphs = computed({ get: () => props.room.patient.glyphs[props.glyph] });

const filter = (list) => {
  list.forEach((e) => {
    e.selected = glyphs.value.some((g) => g === e.id);
  });
  return list;
};

const get = () => {
  db.get("glyphs")
    .then((e) => e.filter((e) => e.type === props.glyph))
    .then((e) => e.sort((l, r) => l.text.localeCompare(r.text)))
    .then(filter)
    .then((e) => (data.value = e));
};

const toggle = (glyph, element) => {
  glyph.selected = !glyph.selected;
  let index = glyphs.value.findIndex((g) => g === glyph.id);
  index == -1 ? glyphs.value.push(glyph.id) : glyphs.value.splice(index, 1);
};

get();
</script>

<style scoped>
.back-drop {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 1000;
}
div.not-selected,
div.selected {
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px 5px;
  margin: 2% auto auto auto;
  max-width: 90%;
  border-radius: 5px 5px;
  padding-bottom: 1em;
}

img {
  border-radius: 5px 5px;
  margin: 0.5em 0.5em;
  box-shadow: 10px 10px 10px gray;
  transition-duration: 0.25s;
}
img:hover {
  box-shadow: 5px 5px 10px gray;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100%);
}
.selected .fade-enter-from, .selected .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-100%);
}
</style>