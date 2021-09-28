<template>
  <div class="back-drop" @click="emits('close')">
    <div class="content" @click.stop>
      <h2 class=room-color :class=room.color>{{room.name}}</h2>
      <table>
        <tr>
          <th>gender</th>
          <td>
            <select v-model="room.patient.gender" :class="room.patient.gender">
              <option value="male" class="male">male</option>
              <option value="female" class="female">female</option>
            </select>
          </td>
        </tr>
        <tr>
          <th rowspan="2">name</th>
          <td>
            <input type="text" :class="room.patient.gender" v-model="room.patient.name.first" placeholder="first" />
          </td>
        </tr>
        <tr>
          <td>
            <input type="text" :class="room.patient.gender" v-model="room.patient.name.last" placeholder="last" />
          </td>
        </tr>
        <tr>
          <th>DOB</th>
          <td>
            <input type="date" v-model="room.patient.dob.text" />
          </td>
        </tr>
        <tr>
          <th>adm</th>
          <td>
            <input type="datetime-local" v-model="room.patient.adm.text" />
          </td>
        </tr>
        <tr>
          <th>disc</th>
          <td>
            <input type="datetime-local" v-model="room.patient.disc.text" />
          </td>
        </tr>
      </table>
    <button @click=discharge>Discharge</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import("../css/style.css");

const props = defineProps({ room: Object });
const emits = defineEmits(["close"]);
const discharge = () => {
  props.room.discharge();
}

</script>

<style scoped>
h1, h2, h3, h4 {
  border-radius: 3px 3px;
  border:1px solid lightgray;
}
input,select {
  font-size: 1em;
  border:1px solid lightgray;
  margin:.125em;
}

table {
  margin: auto auto;
}

th {
  text-align: right;
  padding-right: 0.5em;
  text-transform: capitalize;
}

td {
  text-align: left;
}

button {
  margin-top: 1em;
}
.back-drop {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
}
.content {
  z-index: 1;
  margin:5%  auto auto auto;
  position: relative;
  background-color:white;
  padding:.0em 1em 1em;
  border-radius: 5px 5px;
  box-shadow: 10px 10px 10px gray;

}
</style>