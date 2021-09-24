<template>

<StaffCRUD title="Surgeons" dept="dr" />
<StaffCRUD title="Hopitalist" dept="h" />
<StaffCRUD title="Nurses" dept="rn" />
  
</template>

<script setup>
import { ref, watch } from "vue";
import * as db from "../lib/db";
import * as DTO from "../lib/DTO";
import StaffCRUD from './StaffCRUD.vue'

</script>

<style scoped>

</style>