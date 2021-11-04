<template>
  <div class=container>
    <div>{{ name(room.patient.staffs[dept].id) }}</div>
    <select v-model="room.patient.staffs[dept].id" @change="change">
      <option :value="v.id" v-for="(v, i) in data" :key="i">
        <!-- {{ v.name.first }} {{ v.name.last }} -->
        {{ name(v.id) }}
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

const change = () => { 
  let id = props.room.patient.staffs[props.dept].id;
  let index = data.value.findIndex((e) => e.id === id);
  if (index === -1) return "";
  let staff = data.value[index];
  props.room.patient.staffs[props.dept].dept = staff.dept;
  props.room.patient.staffs[props.dept].name.first = staff.name.first;
  props.room.patient.staffs[props.dept].name.last = staff.name.last;
}

const name = (id) => {
  if (id == 'undefined') return '';
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

const sort = () => {
  let key = "first";
  if (props.dept == "DR" || props.dept == "H")
    return data.value.sort((l,r) => l.name.last.localeCompare(r.name.last));
  else
    return data.value.sort((l,r) => l.name.first.localeCompare(r.name.first));
}

const get = () =>
  db
    .get("staffs")
    .then((res) => res.filter((e) => e.dept === props.dept))
    .then((res) => (data.value = res))
    .then(sort)

get();
</script>

<style scoped>

</style>