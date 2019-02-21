<template>
    <div>
       <Dropdown :list="userList" displayBy="name" searchBy="name" :onSelect="a"/>
       <Dropdown api="user/read" displayBy="name" searchBy="name" :onSelect="a"/>
    </div>
</template>

<script>
import Dropdown from '../components/Dropdown'
export default {
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
        }
    },
components:{Dropdown},
methods: {
    a(it){
        console.log(it)
    }
},
}
</script>

<style>

</style>
