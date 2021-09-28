<template>
  <table cellpadding="0" cellspacing="0">
    <tr>
      <th
        v-for="(v, i) in [
          'Room',
          'Patient',
          'AO',
          'ADM',
          'DISC',
          'ELOS',
          'RRS',
          'HLM',
          'Surgeon',
          'Hospitalist',
          'RN',
          'ANC',
          'BARRIER',
          'DC',
          'EDU',
        ]"
        :key="i"
      >
        {{ v }}
      </th>
    </tr>
    <tr v-for="(v, i) in data" :key="i" @dblclick="crud = v">
      <td class="room-color" :class="v.color">
        <RoomColor :room="v" @change="put(v)" />
      </td>
      <td class="gender name" :class="v.patient.gender">
        {{ v.patient.name.first }} {{ v.patient.name.last[0] }}
      </td>
      <td class="ao" :class="v.patient.ao"><AO :room="v" /></td>
      <td>{{ v.patient.adm.date.format("dd M-D") }}</td>
      <td>{{ v.patient.disc.date.format("dd M-D") }}</td>
      <td>{{ v.patient.disc.date.diff(v.patient.adm.date, "days") }}d</td>
      <td class="rrs" :class="v.patient.rrs"><RRS :room="v" /></td>
      <td class="hlm"><HLM :room="v" /></td>
      <td><StaffSelect :room="v" dept="DR" /></td>
      <td><StaffSelect :room="v" dept="H" /></td>
      <td><StaffSelect :room="v" dept="RN" /></td>
      <td><GlyphView :room="v" glyph="ANC" /></td>
      <td><GlyphView :room="v" glyph="BARRIER" /></td>
      <td><GlyphView :room="v" glyph="DC" /></td>
      <td><GlyphView :room="v" glyph="EDU" /></td>
    </tr>
  </table>
  <Patient v-if="crud" :room="crud" @close="crud = null" />
  <table class="bottom">
    <tr>
      <th>Charge Nurse</th>
      <td><StaffSelectStatic :config="config" dept="CN" /></td>
    </tr>
    <tr>
      <th>Unit Secretary</th>
      <td><StaffSelectStatic :config="config" dept="US" /></td>
    </tr>
    <tr>
      <th>Case Manger</th>
      <td><StaffSelectStatic :config="config" dept="CM" /></td>
    </tr>
    <tr>
      <th>Respiratory Therapist</th>
      <td><StaffSelectStatic :config="config" dept="RT" /></td>
    </tr>
    <tr>
      <th>Social Worker</th>
      <td><StaffSelectStatic :config="config" dept="SW" /></td>
    </tr>
    <tr>
      <th>Pharmacist</th>
      <td><StaffSelectStatic :config="config" dept="RX" /></td>
    </tr>
    <tr>
      <th>Night-Call Hospitalist</th>
      <td><StaffSelectStatic :config="config" dept="NCH" /></td>
    </tr>
  </table>
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
import StaffSelectStatic from "./StaffSelectStatic.vue";
import AnalogClock from "./AnalogClock.vue";
import GlyphView from "./GlyphView.vue";

import("../css/style.css");

const crud = ref(null);
const glyph = ref(null);
const data = ref([]);
const config = ref({});

db.get("configs").then((e) => {
  config.value = e[0];
  watch(config.value, (o, n) => db.put("configs", config.value));
});

const watcher = () => data.value.forEach((e) => watch(e, (o, n) => put(n)));
const get = () =>
  db
    .get("rooms")
    .then((res) => res.map((e) => new DTO.Room(e)))
    .then((res) => (data.value = res))
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
  padding: 0px 0px;
  margin: 0xp 0px;
}
th {
  padding-left: 0.2em;
  padding-right: 0.2em;
  text-align: center;
}
 td:hover select {
  transition-duration: 0.2s;
  transform: scale(1.5);
  border: 1px solid lightgray;
  border-radius: 5px 5px;
} 
table.bottom {
  position: absolute;
  left: 0px;
  bottom: 2em;
}
table.bottom th {
  text-align: right;
  padding-right: 0.5em;
  border: 1px solid lightgray;
}
table.bottom td {
  text-align: left;
}
</style>