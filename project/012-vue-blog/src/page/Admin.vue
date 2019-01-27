<template>
  <div>
<div class="sidebar">
  <router-link active-class="active" to="/admin/post">帖子管理</router-link>
  <router-link active-class="active" to="/admin/cat">分类管理</router-link>
</div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style>

.sidebar{
    width: 30%;
    display:inline-block;
}
.sidebar>*{
    display: block;
}
.main {
  width: 70%;
}
.main > * {
  margin-bottom: 1em;
}
.active{
    border: 2px solid 
}
</style>
