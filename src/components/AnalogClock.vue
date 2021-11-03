<template>
  <div class="clock">
    <div id="clockContainer">
      <div id="hour"></div>
      <div id="minute"></div>
      <div id="second"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";

const now = ref(new moment());

setInterval(() => {
  now.value = new moment();

  let d = new Date(); //object of date()
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let hr_rotation = 30 * hr + min / 2; //converting current time
  let min_rotation = 6 * min;
  let sec_rotation = 6 * sec;

  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);
</script>

<style scoped>
#clockContainer {
  position: relative;
  margin: auto;
  height: 5vw;
  /*to make the height and width responsive*/
  width: 5vw;
  background: url(../assets/clock.jpg) no-repeat;
  /*setting our background image*/
  background-size: 100%;
}

#hour,
#minute,
#second {
  position: absolute;
  background: black;
  border-radius: 10px;
  transform-origin: bottom;
}

#hour {
  width: 1.8%;
  height: 25%;
  top: 25%;
  left: 48.85%;
  opacity: 0.8;
}

#minute {
  width: 1.6%;
  height: 30%;
  top: 19%;
  left: 48.9%;
  opacity: 0.8;
}

#second {
  width: 1%;
  height: 40%;
  top: 9%;
  left: 49.25%;
  opacity: 0.8;
}

.clock {
    position:fixed;
    /* top:5px; */
    left:5px;
    bottom:5px;
    z-index: -1;
}
</style>