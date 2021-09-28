<template>

<StaffCRUD title="Surgeons" dept="DR" />
<StaffCRUD title="Hopitalists" dept="H" />
<StaffCRUD title="Nurses" dept="RN" />
<hr>
<StaffCRUD title="Charge Nurses" dept="CN" :pager=true />
<StaffCRUD title="Unit Secretaries" dept="US" :pager=true />
<StaffCRUD title="Case Managers" dept="CM" :pager=true />
<StaffCRUD title="Respiratory Therapists" dept="RT" :pager=true />
<StaffCRUD title="Social Workers" dept="SW" :pager=true />
<StaffCRUD title="Pharmacists" dept="RX" :pager=true />
<StaffCRUD title="Night-Call Hospitalists" dept="NCH" :pager=true />
  
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import StaffCRUD from './StaffCRUD.vue'

</script>

<style scoped>

</style>