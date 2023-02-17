<template>
  <div>
    <div class="swiper-container"
         ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for="(carouselImg,index) in list"
             :key="carouselImg.id">
          <img :src="carouselImg.imgUrl">
        </div>
        <!-- <div class="swiper-slide">
                      <img src="./images/home/floor-1-b02.png">
                    </div>
                    <div class="swiper-slide">
                      <img src="./images/home/floor-1-b03.png">
                    </div> -->
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "CarouselIndex",
  props: ['list'],
  watch: {
    bannerList: {
      // deep: true,
      immediate: true,
      handler (newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>