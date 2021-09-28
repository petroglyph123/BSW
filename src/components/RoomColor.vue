<template>
  <select class="no-border no-arrow room-color" v-model="room.color" :class="room.color" >
    <option v-for="(v, i) in colors" :key="i" :value="v" class="room-color" :class="v">
      {{ room.name }}
    </option>
  </select>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const colors = ref(["white", "yellow", "orange", "red"]);
const props = defineProps({ room: Object });
</script>

<style scoped>
* {
  font-size: 1em;
}
select {
  text-align: center;
  height: 100%;
  width: 100%;
  outline: none;
}
/* select:hover {
  transform: scale(2.0);
} */
</style>