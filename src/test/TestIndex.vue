<template>
  <div class="main">
    <h1>组件生命周期测试</h1>
    <h2 style="color:aquamarine">{{msg}}</h2>
    <h2 style="color:skyblue">{{bigMsg}}</h2>
    <button @click="msg++">点我修改msg的值</button>
    <ul>
      <li v-for="(item,index) in testList"
          :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      msg: 1,
    }
  },
  computed: {
    bigMsg () {
      console.log('computed执行');
      return this.msg * 10
    },
    ...mapState({
      testList: (state) => state.test.testList
    })

  },
  beforeCreate () {
    console.log('1生命周期beforeCreate，无法拿到vm身上的属性和方法', this.msg);
  },
  created () {
    console.log('2生命周期created，可以拿到vm身上的属性和方法', this.msg);
  },
  beforeMount () {
    console.log('3生命周期beforeMount');
  },
  mounted () {
    console.log('4生命周期mounted');
  },
  beforeUpdate () {
    console.log('.1 生命周期beforeUpdate修改前msg的值为:' + this.msg);
  },
  updated () {
    console.log('.2 生命周期updated修改后msg的值为' + this.msg);
  },
}
</script>
