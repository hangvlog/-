<template>
  <div class="swiper-container"
       ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="(skuImage,index) in skuImageList"
           :key="skuImage.id"
           @click="changeActive(index)">
        <img :src="skuImage.imgUrl"
             :class="index == nowIndex?'active':''">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

import Swiper from 'swiper'
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data () {
    return {
      nowIndex: 0
    }
  },
  watch: {
    skuImageList (newValue, oldValue) {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.mySwiper, {
          loop: true,
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          slidesPerView: 3
        })
      })

    }
  },
  methods: {
    changeActive (index) {
      // console.log(index);
      // console.log(this.nowIndex)
      this.nowIndex = index
      // 通知兄弟组件
      this.$bus.$emit('getIndex', this.nowIndex)
    }
  }
}
</script>

<style lang="less" scoped>
// active {
//   background-color: #000;
// }
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>