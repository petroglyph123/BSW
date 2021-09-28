<template>
  <div>
    <div>{{ name(room.patient.staffs[dept].id) }}</div>
    <select class="no-arrow no-border" v-model="room.patient.staffs[dept].id">
      <option :value="v.id" v-for="(v, i) in data" :key="i">
        {{ v.name.first }} {{ v.name.last }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import("../css/style.css");

const props = defineProps({ room: Object, dept: String });

const data = ref([]);

const name = (id) => {
  let index = data.value.findIndex((e) => e.id === id);
  if (index === -1) return "";
  let staff = data.value[index];
  switch (staff.dept) {
    case "DR":
    case "H":
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
td:hover > div > select {
  display: inline-block;
}
select {
  display: none;
  text-align: center;
}
td:hover > div > div {
  display: none;
}
</style>