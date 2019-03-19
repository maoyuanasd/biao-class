<template>
  <div>
    <GlobalNav/>
    <div>
   <router-view></router-view>
    </div>
    <GlobalFooter/>
  </div>
</template>

<script>
import GlobalNav from './component/GlobalNav'
import GlobalFooter from './component/GlobalFooter'
export default {
  components:{GlobalNav,GlobalFooter}
}
</script>

<style>
</style>
