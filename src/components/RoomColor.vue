<template>
  <div class=container>
    <div>{{ room.name }}</div>
    <select v-model="room.color" :class="room.color" >
      <option v-for="(v, i) in colors" :key="i" :value="v" class="room-color" :class="v" >
        {{ room.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const colors = ref(["white", "yellow", "orange", "red"]);
const props = defineProps({ room: Object });
</script>

<style scoped>
</style>