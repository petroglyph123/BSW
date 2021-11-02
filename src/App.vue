<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import AnalogClock from './components/AnalogClock.vue'
</script>

<template>
<AnalogClock />
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/setup">Setup</router-link> |
    <router-link to="/staffs">Staffs</router-link> |
    <!-- <router-link to="/glyphs">Glyphs</router-link> | -->
    <router-link to="/version">Version</router-link>  |
    <!-- <router-link to="/glyph-generator">Glyph Generator</router-link> | -->
    <!-- <router-link to="/x">X</router-link>  | -->
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

#app, .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

#nav {
  padding: 0px;
  margin-bottom: 2em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
