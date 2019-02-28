<template>
    <div class="nav">
        <div class="container">
            <el-row :gutter="10">
        <el-col :span="6">
          <router-link to="/">
          <div class="logo">
            <img src="../img/logo@2x.png" alt="Logo">
          </div>
          </router-link>
        </el-col>
        <el-col class="text-right" :span="12">
          <form class="search">
            <el-input suffix-icon="el-icon-search"></el-input>
          </form>
        </el-col>
        <el-col :span="6">
          <div class="logo">

          </div>
        </el-col>
      </el-row>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style>
.logo {
    max-width: 10em;
    padding-top: 1em;
    padding-bottom: 1em;
  }

  .search {
    position: relative;
    top: 15px;
  }
</style>
