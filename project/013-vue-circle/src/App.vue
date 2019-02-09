<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import './css/global.css'
import Nav from './components/Nav'
export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>

</style>
