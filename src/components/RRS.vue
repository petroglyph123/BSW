<template>
<div>
  <div>{{room.patient.rrs}}</div>
  <select class="rrs no-border no-arrow" :class=room.patient.rrs v-model="room.patient.rrs">
    <option class=rrs :class=v :value="v" v-for="(v, i) in ['VH','H','M','L']" :key="i">
      {{v}}
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
td:hover > div > select {
  display: inline-block ;
}
select {
  display: none;
  text-align: center;
}
td:hover > div > div {
  display: none;
}
</style>