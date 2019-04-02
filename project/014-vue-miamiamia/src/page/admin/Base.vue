<template>
  <div class="container">
    <el-row>
      <el-col :gutter="0" :span="4">
        <el-menu :router="true"
          default-active="cart"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/admin/user">
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/brand">
            <span slot="title">品牌管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/cat">
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/product">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/order">
            <span slot="title">订单管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="well">
          因为管理页面的逻辑都很类似,所以用了Vue.mixin的特性
          能够让代码得到很好的复用
        </div>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
     methods: {
      handleOpen() {},
      handleClose() {},
    }
};
</script>

<style>
</style>
