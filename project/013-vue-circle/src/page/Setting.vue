<template>
    <div>
        <div class="container">
        <h1>设置</h1>
        <div class="row">
            <div class="col-8 vertical-nav">
                <router-link to="/setting/me">基础设置</router-link>
                <router-link to="/setting/security">安全设置</router-link>
            </div>
            <div class="col-16 setting-content">
                <router-view></router-view>
            </div>
        </div>

        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
