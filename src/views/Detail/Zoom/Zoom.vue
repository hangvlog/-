<template>
  <div class="spec-preview"
       ref="father">
    <img :src="skuObj.imgUrl">
    <div class="event"
         @mousemove="handle"></div>watch
    <div class="big">
      <img :src="skuObj.imgUrl"
           ref="big" />
    </div>
    <div class="mask"
         ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ['skuImageList'],
  data () {
    return {
      index: 0,
    }
  },
  methods: {
    handle (e) {
      let mask = this.$refs.mask
      let father = this.$refs.father
      let big = this.$refs.big

      // 调整蒙版的宽度位置
      let left = e.offsetX - mask.offsetWidth / 2
      if (left <= 0) left = 0;
      if (left > father.offsetWidth - mask.offsetWidth) left = father.offsetWidth - mask.offsetWidth
      mask.style.left = left + "px";

      // 调整蒙版的高度位置
      let top = e.offsetY - mask.offsetWidth / 2
      if (top <= 0) top = 0;
      if (top > father.offsetHeight - mask.offsetHeight) top = father.offsetHeight - mask.offsetHeight
      mask.style.top = top + "px";

      big.style.left = -2 * left + "px"
      big.style.top = -2 * top + "px"

    }
  },
  computed: {
    skuObj () {
      return this.skuImageList[this.index] || {};
    }
  },
  mounted () {
    // console.log()
    // 拿到兄弟组件传递过来的索引 为何全局事件总线是回调函数??
    this.$bus.$on('getIndex', index => this.index = index)
    // this.index = 

  }
}

</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>