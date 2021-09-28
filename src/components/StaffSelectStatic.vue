<template>
    <select class="no-arrow no-border" v-model="config[dept]">
      <option :value="v.id" v-for="(v, i) in data" :key="i">
        {{ v.name.first }} {{ v.pager }} [{{v.id}}]
      </option>
    </select>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import("../css/style.css");

const props = defineProps({ label: String, config: Object, dept: String });

const data = ref([]);

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