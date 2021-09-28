<template>
<div class=container>
  <div>{{room.patient.ao}}</div>
  <select v-model="room.patient.ao" class="ao no-arrow no-border">
    <option :value="v" v-for="(v, i) in ['', 'A', 'O']" :key="i">
      {{ v }}
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