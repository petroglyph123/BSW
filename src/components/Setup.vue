<template>
  <table>
    <tr v-for="(v, i) in data" :key="i">
      <th>{{ v.id }}</th>
      <td>
        <input type="text" v-model="v.name" @input="v.changed = true" />
      </td>
      <td>
        <button @click="put(v)" :disabled="!v.changed">update</button>
        <button @click="del(v)">delete</button>
      </td>
    </tr>
    <tr>
      <th>new</th>
      <td>
        <input type="text" v-model="name" placeholder="name" />
      </td>
      <td>
        <button @click="post" :disabled="!name">add</button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import("../css/style.css");

const data = ref([]);
const name = ref("");
const get = () => db.get("rooms").then((res) => (data.value = res));
const post = () =>
  db
    .post("rooms", Object.assign(new DTO.Room(), { name: name.value }))
    .then(get);
const del = (o) => db.del("rooms", o).then(get);
const put = (o) => db.put("rooms", o).then(get);

// init
get();
</script>

<style scoped>
input, button {
  font-size: 1em;
}

input {
  border-radius: 5px 5px;
  border: 1px solid lightgray;
}

table {
  margin: auto auto;
}

th {
  text-align: right;
  padding-right: 0.5em;
  text-transform: capitalize;
}
</style>