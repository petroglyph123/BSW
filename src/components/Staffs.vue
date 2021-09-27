<template>

<StaffCRUD title="Surgeons" dept="DR" />
<StaffCRUD title="Hopitalist" dept="H" />
<StaffCRUD title="Nurses" dept="RN" />
  
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import StaffCRUD from './StaffCRUD.vue'

</script>

<style scoped>

</style>