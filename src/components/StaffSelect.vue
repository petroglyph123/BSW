<template>
  <select class="no-arrow no-border" v-model="room.patient.staffs[dept].id">
    <option :value="v.id" v-for="(v, i) in data" :key="i">
      {{ name(v) }}
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import("../css/style.css");

const props = defineProps({ room: Object, dept: String });

const data = ref([]);

const name = (staff) => {
  switch (staff.dept) {
    case "dr":
    case "h":
      return staff.name.last;
      break;
    default:
      return staff.name.first;
      break;
  }
};

const get = () =>
  db
    .get("staffs")
    .then((res) => res.filter((e) => e.dept === props.dept))
    .then((res) => (data.value = res));

get();
</script>

<style scoped>
* {
  font-size: 1em;
}
select {
  outline: none;
}
</style>