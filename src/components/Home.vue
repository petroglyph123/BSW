<template>
  <table cellpadding="0" cellspacing="0">
    <tr> <th v-for="(v, i) in ['Room','Patient','AO','ADM','DISC','ELOS','RRS','HLM','Surgeon','Hospitalist','RN','ANC','BARRIER','DC','EDU']" :key="i" > {{ v }} </th> </tr>
    <tr v-for="(v, i) in data" :key="i" @dblclick="crud = v">
      <td class="room-color" :class=v.color ><RoomColor :room="v" @change="put(v)" /></td>
      <td class="gender name" :class="v.patient.gender"> {{ v.patient.name.first }} {{ v.patient.name.last[0] }} </td>
      <td class=ao :class=v.patient.ao><AO :room=v /></td>
      <td>{{ v.patient.adm.date.format("dd M-D") }}</td>
      <td>{{ v.patient.disc.date.format("dd M-D") }}</td>
      <td>{{ v.patient.disc.date.diff(v.patient.adm.date, "days") }}d</td>
      <td class=rrs :class=v.patient.rrs><RRS :room=v /></td>
      <td class=hlm><HLM :room=v /></td>
      <td><StaffSelect :room=v dept='dr' /></td>
      <td><StaffSelect :room=v dept='h' /></td>
      <td><StaffSelect :room=v dept='rn' /></td>
      <td><GlyphView :room=v glyph='anc' /></td>
      <td><GlyphView :room=v glyph='barrier' /></td>
      <td><GlyphView :room=v glyph='dc' /></td>
      <td><GlyphView :room=v glyph='edu' /></td>
    </tr>
  </table>
  <Patient v-if="crud" :room="crud" @close="crud = null" />
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import RoomColor from "./RoomColor.vue";
import Patient from "./Patient.vue";
import RRS from "./RRS.vue";
import HLM from "./HLM.vue";
import AO from "./AO.vue";
import StaffSelect from "./StaffSelect.vue";
import AnalogClock from "./AnalogClock.vue";
import GlyphView from "./GlyphView.vue";

import("../css/style.css");

const crud = ref(null);
const glyph = ref(null)
const data = ref([]);
const watcher = () => data.value.forEach((e) => watch(e, (o, n) => put(n)));
const get = () => db
    .get("rooms")
    .then((res) => res.map((e) => new DTO.Room(e)))
    .then((res) => data.value = res)
    .then(watcher);
const put = (o) => db.put("rooms", o).then(get);

// init
get();
</script>

<style scoped>
table {
  margin: auto auto;
  border-collapse: collapse;
  text-align: left;
  border-spacing: 0px 0px;
}
td {
  border: 1px solid lightgray;
  text-align: center;
  padding:0px 0px;
  margin:0xp 0px;
}
th {
  padding-left:.2em;
  padding-right: .2em;
  text-align: center;
}
td:hover select {
  transition-duration: .2s;
  transform: scale(1.5);
  border:1px solid lightgray;
  border-radius: 5px 5px;
}
</style>