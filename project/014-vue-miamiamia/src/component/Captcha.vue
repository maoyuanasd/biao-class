<template>
    <!-- <div > -->
        <button :class="className"  @click="sendCode" :disabled="count!=0">
            <span v-if="count==0">发送验证码</span>
            <span v-else>{{count}}s</span>
        </button>
    <!-- </div> -->
</template>

<script>
import {send} from '../lib/captcha.js'
export default {
    props:['sendBy','receiver','countDown','className'],
data() {
    return {
      count:0,
      timer:null  
    }
},
methods: {
    sendCode(){
        if(!this.receiver){
            if(this.sendBy=='phone')
            alert('请输入手机')
            else
            alert('请输入邮箱')
            return
        }

          this.count = this.countDown || 60;
      this.timer = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      send(this.sendBy,this.receiver).then(r=>{
          this.$emit('send',r)
      })
    }
},
}
</script>

<style>
/* dd{
    width: 600px;
} */
</style>
