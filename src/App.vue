<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width:100vw;
  min-height:100vh;
  position: relative;
}

img{
  width:100%;
  height:100%;
}

 .icon {
  width: 25px; 
  height: 25px;
  /* vertical-align: -0.3em; */
  fill: currentColor;
  overflow: hidden;
  margin-right:8px;
 }
</style>
