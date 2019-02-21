<template>
    <div>
        <div class="container">
        <div class="row">
            <div class="col-8 vertical-nav">
                <router-link to="/admin/user">用户管理</router-link>
                <router-link to="/admin/thread">帖子管理</router-link>
                <router-link to="/admin/cat">分类管理</router-link>
            </div>
            <div class="col-16 setting-content">
                <router-view></router-view>
            </div>
        </div>

        </div>
    </div>
</template>
<script>
import '../../css/admin.css'
export default {
    
}
</script>
