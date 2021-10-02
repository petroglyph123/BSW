<template>
  <div class="bg" @click.stop="show = !show; once = false;">
    <transition name=fade-once>
      <div class=once v-if=once>Screen Locked</div>
    </transition>
    <div class=prompt v-show=show @click.stop>
      <div class=title> Screen Locked </div>
      <input maxlength="4" type="password" v-model="password" @input="authenticate" placeholder="????" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const emits = defineEmits(["close"]);

const show = ref(false);
const password = ref("");
const once = ref(true);

const authenticate = () => {
  let now = new Date();
  let mm = "00" + (now.getMonth() + 1);
  let dd = "00" + now.getDate();
  mm = mm.substr(mm.length - 2, 2);
  dd = dd.substr(dd.length - 2, 2);
  if (password.value == mm + dd) {
    emits("close");
  }
};

setTimeout(() => {
  once.value = false;
}, 2000);

</script>

<style scoped>
* {
  transition-duration: .25s;
}

div.once {
  font-weight: 900;
  font-size: 8em;
  color:orange;
  text-shadow: 5px 5px 5px gray;;
}

.fade-once-enter-active, .fade-once-leave-active {
  transition: all 2s ease;
}

.fade-once-enter-from, .fade-once-leave-to {
  opacity: 0;
  transform: scale(0);
}

div.bg {
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

span.once {
  font-size: 5em;
  font-weight: 900;
  color:rgba(0, 0, 0, .5);
}

div.prompt {
  font-size: 1.5em;
  font-weight: 900;
  padding:1em 1em;
  background-color: rgba(128, 128, 128, .25);
  border-radius: 5px 5px;
  box-shadow: 10px 10px 10px gray;
  transition-duration: .5s;
}

div.prompt:hover {
  box-shadow: 5px 5px 10px gray;
}

input {
  margin-top: .5em;
  font-size: 1em;
  text-align: center;
  width: 2.5em;
  border-radius: 5px 5px;
  border:0px solid gray;
  outline: none;
  background-color: rgba(255, 255, 255, .9k5);
  box-shadow: 5px 5px 5px gray;
}

input:focus {
  box-shadow: 3px 3px 3px gray;
}
div.title {
  color:rgba(255, 100, 100, .9);
}
div.prompt:hover div.title {
  color:red;
}
</style>