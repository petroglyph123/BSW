<template>
  <div class="lock" @click.stop="click()">
    <div v-if="alert" :class="{ alert: alert }" :style="{'animation-duration': duration + 's'}">
      Screen Locked
      <br />
      <input maxlength="4" type="password" v-model="password" @input="unlock" @click.stop placeholder="????" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emits = defineEmits(["close"]);
const props = defineProps({ });

const alert = ref(false);
const password = ref("");
const promise = ref(null);
const duration = ref(30);

const click = (timeout=30) => {
  duration.value = timeout;
  alert.value = !alert.value;
  if (alert.value) {
    if (promise.value) clearTimeout(promise.value);
    promise.value = setTimeout(() => { alert.value = false; }, 1000 * timeout); }
};

const unlock = () => {
  let now = new Date();
  let mm = "00" + (now.getMonth() + 1);
  let dd = "00" + now.getDate();
  mm = mm.substr(mm.length - 2, 2);
  dd = dd.substr(dd.length - 2, 2);
  if (password.value == mm + dd) {
    password.value = "";
    emits("close");
    alert.value = false;
  }
};
click(2);
</script>

<style scoped>
div.lock {
  position: fixed;
  display: flex;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

div > div {
  font-size: 2em;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.25);
}

div > div.alert {
  animation: fade-out;
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

input {
  font-size: 1em;
  text-align: center;
  width: 2.5em;
  border-radius: 5px 5px;
}
</style>