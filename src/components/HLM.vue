<template>
  <div class=container>
    <div> {{ room.patient.hlm }} </div>
    <select v-model="room.patient.hlm">
      <option :value="i + 1" v-for="(v, i) in Array(8).fill()" :key="i">
        {{ i + 1 }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const props = defineProps({ room: Object });
</script>

<style scoped>
</style>