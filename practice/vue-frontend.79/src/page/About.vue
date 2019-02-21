<template>
  <div>
    <Dropdown :list="userList" displayBy="username" :onSelect="a" searchBy="username"/>
    <Dropdown api="user/read" displayBy="username" :onSelect="a" searchBy="username"/>
  </div>
</template>
<script>
import Dropdown from "../components/Dropdown";
export default {
  components: { Dropdown },
  data() {
    return {
      userList: [
        {
          id: 1,
          username: "whh",
          name: "王花花"
        },
        {
          id: 2,
          username: "lsd",
          name: "李拴蛋"
        },
        {
          id: 3,
          username: "zks",
          name: "赵可爽"
        },
        {
          id: 4,
          username: "wmm",
          name: "王萌萌"
        }
      ]
    };
  },
  methods: {
      a(it){
          console.log(it)
      }
  },
};
</script>
<style>
</style>
