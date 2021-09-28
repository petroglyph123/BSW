<template>
  <div>
    <div>{{name(config[dept])}}</div>
    <select class="no-arrow no-border" v-model="config[dept]">
      <option :value="v.id" v-for="(v, i) in data" :key="i">
        {{ v.name.first }} {{ v.pager }} [{{ v.id }}]
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import("../css/style.css");

const props = defineProps({ label: String, config: Object, dept: String })

const data = ref([]);

const name = () => {
  console.log(props.config);
  let index = data.value.findIndex(e => e.id === props.config[props.dept])
  if (index === -1) return '';
  return data.value[index].name.first + ' #' + data.value[index].pager;
}

const get = () =>
  db
    .get("staffs")
    .then((res) => res.filter((e) => e.dept === props.dept))
    .then((res) => (data.value = res));

get();
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