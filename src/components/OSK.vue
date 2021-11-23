<template>
<div id=container>
    <button @click="osk">keyboard</button>
</div>
  
</template>

<script setup>
import {ref} from 'vue'

const osk = () => {
    fetch("http://localhost:3002/osk");
}

</script>

<style scoped>

#container {
    position: fixed;
    top:0px;
    right:0px;
}

</style>