<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <recommend-index></recommend-index>
    <RankGoods></RankGoods>
    <LikeGuess></LikeGuess>
    <FloorIndex v-for="(floor,index) in floorList"
                :key="floor.id"
                :list='floor'>
    </FloorIndex>
    <!-- <FloorIndex></FloorIndex> -->
    <BrandsIndex></BrandsIndex>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
// import RecommendIndex from './Recommend/RecommendIndex.vue'
import RecommendIndex from '@/views/Home/Recommend/RecommendIndex.vue'
import RankGoods from '@/views/Home/RankGoods/RankGoods.vue'
import LikeGuess from '@/views/Home/LikeGuess/LikeGuess.vue'
import FloorIndex from '@/views/Home/FloorIndex/FloorIndex.vue'
import BrandsIndex from '@/views/Home/BrandsIndex/BrandsIndex.vue'

import { mapState } from 'vuex'
// import { count } from 'console'

export default {
  components: {
    ListContainer,
    RecommendIndex,
    RankGoods,
    LikeGuess,
    FloorIndex,
    BrandsIndex,
  },

  computed: {
    // mapstate之后 现在这个组件 能拿到vuex数据
    ...mapState({
      floorList: state => state.home.floorList
    })
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  }

}
</script>

<style lang="less" scoped>
</style>