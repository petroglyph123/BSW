<template>
  <table cellpadding="0" cellspacing="0">
    <tr>
      <th v-for="(v, i) in [ 'Room', 'Patient', 'AO', 'ADM', 'DISC', 'ELOS', 'RRS', 'HLM', 'Surgeon', 'Hospitalist', 'RN', 'Ancillary', 'Barrier', 'DC', 'EDU', ]" :key="i" @click=sort(v,true) :class="{sorted: v==sort_by.name, desc:sort_by.asc == -1}" > {{ v }} </th>
    </tr>
    <tr v-for="(v, i) in data" :key="i" @dblclick="crud = v">
      <td class="room-color" :class="v.color"> <RoomColor :room="v" @change="put(v)" /> </td>
      <td class="gender name" :class="v.patient.gender"> {{ v.patient.name.first[0] }} {{ v.patient.name.last }} </td>
      <td class="ao" :class="v.patient.ao"><AO :room="v" /></td>
      <td>{{ v.patient.name.first || v.patient.name.last ? v.patient.adm.date.format("MM/DD") : '' }}</td>
      <td class="room-color" :class="v.patient.disc.color"><DiscColor :room="v" @change="put(v)"></DiscColor></td>
      <td>{{ v.patient.name.first || v.patient.name.last ? v.patient.disc.date.diff(v.patient.adm.date, "days")+'d' : '' }}</td>
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
  <div class=bottom>
  <table class="bottom">
    <tr>
      <th>Charge Nurse</th>
      <th>Unit Secretary</th>
      <th>Case Manger</th>
      <th>Respiratory Therapist</th>
      <th>Social Worker</th>
      <th>Pharmacist</th>
      <th>Night-Call Hospitalist</th>
    </tr>
    <tr>
      <td><StaffSelectStatic dept="CN" /></td>
      <td><StaffSelectStatic dept="US" /></td>
      <td><StaffSelectStatic dept="CM" /></td>
      <td><StaffSelectStatic dept="RT" /></td>
      <td><StaffSelectStatic dept="SW" /></td>
      <td><StaffSelectStatic dept="RX" /></td>
      <td><StaffSelectStatic dept="NCH" /></td>
    </tr>
  </table>
  </div>
  <!-- <button id=f11 class=f11 @click="toggle_fullscreen">full screen</button> -->
  <!-- <button id=lock class=lock @click="toggle_screenlock" :class="{locked: lock}">screen {{lock ? "locked" : "unlocked"}}</button> -->
  <div class=f11>FullScreen => F11</div>
  <ScreenLock v-if=lock @close="lock=false" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
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
import ScreenLock from "./ScreenLock.vue";
import DiscColor from "./DiscColor.vue";
import moment from "moment";

import("../css/style.css");

const crud = ref(null);
const glyph = ref(null);
const data = ref([]);
const lock = ref(false);
const sort_by = ref({name: "", asc:1})

const watcher = () => data.value.forEach((e) => watch(e, (o, n) => put(n)));
const get = () =>
  db
    .get("rooms")
    .then((res) => res.map((e) => new DTO.Room(e)))
    .then((res) => (data.value = res))
    .then(res => { sort(sort_by.value.name,false); return res;})
    .then(watcher);
const put = (o) => db.put("rooms", o).then(get);

// init
get();

console.log('document.fullscreenEnabled', document.fullscreenEnabled);
// document.documentElement.requestFullscreen();

const toggle_fullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen({ navigationUI: "show" }).then(() => { console.log('fullscreen')}).catch(err => {
      alert(`An error occurred while trying to switch into full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

const toggle_screenlock = () => {
  lock.value = !lock.value;
}

const sort_time = (l, r, key) => {
  let ll = l.patient[key].date;
  let rr = r.patient[key].date;
  if (!l.patient.name.first && !l.patient.name.last)
    ll = new moment('2000-01-01')
  if (!r.patient.name.first && !r.patient.name.last)
    rr = new moment('2000-01-01')
  return ll.diff(rr,'seconds') * sort_by.value.asc ;
}

const sort = (v,flip=true) => {
  if (flip) 
  { 
    if (sort_by.value.name == v) 
      sort_by.value.asc *= -1; 
    else 
      sort_by.value.asc = 1;
  }
  sort_by.value.name = v;
  switch (v) { 
    case 'Room':
      data.value.sort((l,r) => l.name.localeCompare(r.name) * sort_by.value.asc )
    break;
    case 'Patient':
      data.value.sort((l,r) => l.patient.name.first.localeCompare(r.patient.name.first) * sort_by.value.asc )
      break;
    case 'AO':
      data.value.sort((l,r) => l.patient.ao.localeCompare(r.patient.ao) * sort_by.value.asc )
      break;
    case 'ADM':
      // data.value.sort((l,r) => l.patient.adm.date.diff(r.patient.adm.date,'seconds') * sort_by.value.asc )
      data.value.sort((l,r) => sort_time(l,r,'adm'));
      break;
    case 'DISC':
      // data.value.sort((l,r) => l.patient.disc.date.diff(r.patient.disc.date,'seconds') * sort_by.value.asc )
      data.value.sort((l,r) => sort_time(l,r,'disc'));
      break;
    case 'ELOS':
      data.value.sort((l,r) => (l.patient.elos - r.patient.elos) * sort_by.value.asc )
      break;
    case 'RRS':
      data.value.sort((l,r) => l.patient.rrs.localeCompare(r.patient.rrs) * sort_by.value.asc )
      break;
    case 'HLM':
      data.value.sort((l,r) => (l.patient.hlm - r.patient.hlm) * sort_by.value.asc )
      break;
    case 'Surgeon':
      data.value.sort((l,r) => l.patient.staffs['DR']?.name?.last?.localeCompare(r.patient.staffs['DR']?.name?.last) * sort_by.value.asc )
      break;
    case 'Hospitalist':
      data.value.sort((l,r) => l.patient.staffs['H']?.name?.last?.localeCompare(r.patient.staffs['H']?.name?.last) * sort_by.value.asc )
      break;
    case 'RN':
      data.value.sort((l,r) => l.patient.staffs['RN']?.name?.first?.localeCompare(r.patient.staffs['RN']?.name?.first) * sort_by.value.asc )
      break;
  }
}

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
  font-weight: 900;
}
th {
  padding-left: 0.2em;
  padding-right: 0.2em;
  text-align: center;
}
div.bottom {
  position: fixed;
  display: flex;
  bottom:.5em;
  align-content: center;
  align-items: center;
  width: 100%;
}

table.bottom {
  margin:auto auto;
}
table.bottom th {
  padding: 0.35em 0.35em;
  border: 1px solid lightgray;
}
table.bottom td {
  padding: 0.35em 0.35em;
}
button.f11 {
  position:fixed;
  bottom:1em;
  right:1em;
}
button.lock {
  position: fixed;
  bottom:3em;
  right:1em;
  /* z-index:1000; */
  color:green;
}
button.lock.locked {
  color:red;
  font-weight: 900;
}

th.sorted {
  background-color:black;
  color:white;
  transition-duration: .5s;
  border-radius: 5px 5px;
  font-style: italic;
}
th.sorted.desc {
  transform: scale(1,-1);
  transition-duration: .5s;
}
.f11 {
  position:fixed;
  bottom:2px;
  right:2px;
  font-size: .74em;
}
tr:nth-child(even)
{
  background-color:rgba(10,128, 250, .1);
}
</style>