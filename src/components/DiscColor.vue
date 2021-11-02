<template>
  <div class=container>
    <div> {{room.patient.name.first || room.patient.name.last ? room.patient.disc.date.format("M-D") : '' }}
    </div>
    <select v-model="room.patient.disc.color" :class="room.patient.disc.color"  v-if="room.patient.name.first || room.patient.name.last">
      <option v-for="(v, i) in colors" :key="i" :value="v" class="room-color" :class="v" >
        {{ room.patient.disc.date.format("M-D") }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const colors = ref(["white", "red"]);
const props = defineProps({ room: Object });
</script>

<style scoped>
</style>