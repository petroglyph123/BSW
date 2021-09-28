<template>
<div class=container>
  <div>{{room.patient.rrs}}</div>
  <select class=room.patient.rrs v-model="room.patient.rrs">
    <option class=rrs :class="v.value" :value="v.value" v-for="(v, i) in options" :key="i">
      {{v.name}}
    </option>
  </select>
</div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const props = defineProps({ room: Object });
const options = ref([{name:'Very High', value:'VH'}, {name:'High', value:'H'},{name:'Medium', value:'M'},{name:'Low',value:'L'}])
</script>

<style scoped>
</style>