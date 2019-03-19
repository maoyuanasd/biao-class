<template>
  <div>
    <button :disabled="count!=0" :class="className" @click="sendCode">
        <span v-if="count==0">发送验证码</span>
        <span v-else>{{count}}s</span>
    </button>
  </div>
</template>

<script>
import { send } from "../lib/captcha.js";
export default {
    props:['sendBy','receiver','className','countDown'],
  data() {
    return {
      count: 0,
      Timer: null
    };
  },
  methods: {
    sendCode() {
      this.count = this.countDown || 60;
      this.Timer = setInterval(() => {
        this.count--;
        if (this.count == 0) clearInterval(this.Timer);
      }, 1000);
      send(this.sendBy,this.receiver).then(r=>{
        this.$emit('send',r);
      })
    }
  }
};
</script>

<style>
</style>
