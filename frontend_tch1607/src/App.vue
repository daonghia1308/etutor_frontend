<template>
  <div id="app" >
    <router-view name="navbar"/>
    <router-view />
  </div>
</template>

<script>
import PageHeader from "./components/layouts/Header.vue";
import navbar from "./components/layouts/navbar.vue";
export default {
  name: "App",
  components: {
    PageHeader,
    navbar
  }
};
</script>

<style>
/* html, body {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 10
} */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  overflow: auto;
  height: 100%;
}
</style>
