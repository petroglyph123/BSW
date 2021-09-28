<template>
<div class=container>
  <div>{{room.patient.ao}}</div>
  <select v-model="room.patient.ao">
    <option :value="v.value" v-for="(v, i) in options" :key="i">
      {{ v.name }}
    </option>
  </select>
</div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import("../css/style.css");

const props = defineProps({ room: Object });

const options = ref([{name:'', value:''},{name:'Admin', value:'A'},{name:'Observation', value:'O'}])

</script>

<style scoped>
</style>