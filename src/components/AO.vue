<template>
  <select v-model="room.patient.ao" class="ao no-arrow no-border">
    <option :value="v" v-for="(v, i) in ['', 'A', 'O']" :key="i">
      {{ v }}
    </option>
  </select>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const props = defineProps({ room: Object });
</script>

<style scoped>
select {
    text-align: center;
    width:100%;
    height:100%;
    outline: none;
}
</style>