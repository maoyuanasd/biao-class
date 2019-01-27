<template>
  <div id="app">
    <nav>
    <router-link to="/">首页</router-link>
    <router-link to="/admin/post">管理页</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import './css/global.css'
export default {
  name: 'app',
  
}
</script>

<style>
nav a{
  margin: .5em
}
</style>
