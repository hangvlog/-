<template>
  <div>
    <HeaderIndex></HeaderIndex>
    <!-- 路由展示的位置 -->
    <router-view></router-view>
    <!-- 这个￥route是那个对象身上的 全局组件具有￥route属性可以与路由组件进行胡数据交互 数据流动 路由组件-》全局组件 -->
    <FooterIndex v-show="$route.meta.isShown"></FooterIndex>
  </div>
</template>

<script>
import HeaderIndex from '@/components/Header/HeaderIndex.vue'
import FooterIndex from '@/components/Footer/FooterIndex.vue'
export default {
  components: {
    HeaderIndex,
    FooterIndex,
  },
  mounted () {
    // 通知vuex获取数据
    // console.log('header index');
    this.$store.dispatch('categoryList')
  },
}
</script>
<style lang="less" scoped>
</style>