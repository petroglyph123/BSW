<template>
  <div class="container">
    <div>{{ name() }}</div>
    <select v-model="id" @change="change">
      <option :value="v.id" v-for="(v, i) in staffs" :key="i">
        {{ v.name.first }} {{v.name.last}} #{{ v.pager }} 
        <!-- [{{ v.id }}] -->
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import("../css/style.css");

const props = defineProps({ dept: String });
const id = ref(-1);
const staffs = ref([]);
const staff = ref({});

const post = () => {
  db.post('configs', {id:props.dept, staff : new DTO.Staff()});
  get_staff();
}

const get_staff = () =>
  db
    .get("configs")
    .then((res) => res.filter((e) => e.id === props.dept))
    .then((res) => { if (res.length === 0) post(); return staff.value =  res[0] } )
    .then((res) => (id.value = staff.value?.staff?.id))
get_staff();

const sort = () => {
  return staffs.value.sort((l,r) => l.name.first.localeCompare(r.name.first));
  }


const get_staffs = () =>
  db
    .get("staffs")
    .then((res) => res.filter((e) => e.dept === props.dept))
    .then((res) => (staffs.value = res))
    .then(sort)
get_staffs();

const change = () => {
  staff.value = staffs.value.filter(e => e.id === id.value)[0];
  let object = Object.assign({ id: props.dept }, { staff: staff.value});
  db.put("configs", object);
};

const name = () => {
  if (id.value == -1) return "";
  let index = staffs.value.findIndex((e) => e.id === id.value);
  if (index === -1) return "";
  staff.value = staffs.value[index];
  return staff.value.name.first + " #" + staff.value.pager;
};
</script>

<style scoped>
</style>