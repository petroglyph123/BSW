<template>
  <div class=lock v-if=show @click.stop="click">
      <div v-if=alert :class="{alert:alert}">
          Screen Locked
      </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({show:Boolean})

const alert = ref(false)

const click = () => {
    alert.value = !alert.value
    if (alert.value) {
        setTimeout(() => {
            alert.value = false;
        }, 5000);
    }
}

</script>

<style scoped>
div.lock {
    position: fixed;
    display: flex;
    left:0px;
    top:0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

div > div {
    font-size: 2em;
    font-weight: 900;
    color:rgba(0,0,0,.25)
}

div > div.alert {
    animation: fade-out 5s;
}

@keyframes fade-out {
    from {opacity: 1;}
    to {opacity: 0;}
}


</style>