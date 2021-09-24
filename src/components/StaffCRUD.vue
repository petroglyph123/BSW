<template>
<h3>{{title}}</h3>
  <table class="margin-auto">
    <tr v-for="(v, i) in data" :key="i">
      <th>{{ v.id }}</th>
      <td>
        <input type="text" v-model="v.name.first" placeholder="first" @input="v.name.dirty=true" />
        <input type="text" v-model="v.name.last" placeholder="last" @input="v.name.dirty=true" />
      </td>
      <td>
        <button @click="put(v)" :disabled=!v.name.dirty>update</button>
        <button @click="del(v)">delete</button>
      </td>
    </tr>
    <tr>
      <th></th>
      <td>
        <input type="text" v-model="new_staff.name.first" placeholder="first" />
        <input type="text" v-model="new_staff.name.last" placeholder="last" />
      </td>
      <td><button @click="post" :disabled="!new_staff.name.first || !new_staff.name.last">add</button></td>
    </tr>
  </table>
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";

import ('../css/style.css')

const props = defineProps({ title: String, dept: String });

const new_staff = ref(new DTO.Staff());
new_staff.value.dept = props.dept;

const data = ref([]);

const get = () =>
  db
    .get("staffs")
    .then((res) => res.filter((e) => e.dept === props.dept))
    .then((res) => (data.value = res))
    .then(res => data.value.forEach(e => e.name.dirty = false))
const put = (o) => db.put("staffs", o).then(get);
const del = (o) => db.del('staffs', o).then(get);
const post = () => db.post('staffs', new_staff.value).then(get)

get();

</script>

<style scoped>
input {
  font-size: 1em;
  border:1px solid lightgray;
  border-radius: 3px 3px;
}
button {
  font-size: 1em;
}
</style>