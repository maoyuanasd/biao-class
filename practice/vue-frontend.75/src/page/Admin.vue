<template>
    <div class="row">
        <div class="sidebar col">
        <router-link active-class="active" to="/admin/post">文章管理</router-link>
        <router-link active-class="active" to="/admin/cat">分类管理</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
}
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

</style>
