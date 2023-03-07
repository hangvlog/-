<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list"
            v-for="(cartInfo,index) in cartInfoList"
            :key="cartInfo.id">
          <!-- <ul class="cart-list"> -->
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   v-model="cartInfo.isChecked">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods1.png">
            <div class="item-msg">{{ cartInfo.skuName||"小米10 至尊纪念版 双模5G 骁龙865 120W快充 8GB+128GB 透明版 游戏手机" }}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfo.cartPrice||"0"}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)"
               class="mins"
               @click="handle(-1,cartInfo.skuId)">-</a>
            <input autocomplete="off"
                   type="number"
                   :value="cartInfo.skuNum"
                   minnum="1"
                   class="itxt"
                   @change="handle($event.target.value * 1 - cartInfo.skuNum,cartInfo.skuId)">
            <a href="javascript:void(0)"
               class="plus"
               @click="handle(1,cartInfo.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum*(cartInfo.cartPrice || 0) }}</span>
          </li>
          <li class="cart-list-con7">
            <!-- <a class="sindelet"
               href="javascript:void(0)"
               @click="deleteCartById(cartInfo.skuId)">删除</a> -->
            <a class="sindelet"
               href="#none">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               v-model="isCheckedAll">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <!-- <i class="summoney">{{totalPrice }}</i> -->
          <i class="summoney">{{totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn"
                       to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  data () {
    return {
      // cartInfoList: [],
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getCartList')
    },
    // addGoods () {
    //   this.$store.dispatch('addGoods')
    //   this.getData()
    // }
    handle (changeValue, skuId) {
      // console.log(changeValue)
      try {
        this.$store.dispatch('addOrUpdateToShopCart', { skuId: skuId, skuNum: changeValue })
        this.getData()
      } catch (e) {
        alert(e.message)
      }
    },
    //   async deleteCartById: throttle(function (skuId) {
    //     try {
    //       await this.$store.dispatch('deleteCartById', skuId);
    //       this.getData()
    //     } catch (e) {
    //       alert(e.message)
    //     }
    //   }, 20)
    // },
    // async deleteCartById: throttle(function (skuId) {
    //   // console.log(changeValue)
    //   try {
    //     await this.$store.dispatch('deleteCartById', { skuId: skuId })
    //     this.getData()
    //   } catch (e) {
    //     alert(e.message)
    //   }
    // }, 20),
    // deleteCartById: throttle(async function (skuId) {
    //   try {
    //     await this.$store.dispatch('deleteCartById', { skuId: skuId })
    //     this.getData()
    //   } catch (e) {
    //     alert(e.message)
    //   }
    // }),

    // mounted () {
    //   this.getData();
    //   // console.log(this.cartInfoList);
    // },
  },
  computed: {
    //数据没拿到的原因是computed计算拿到的数据在mounted之前 -> vuex获取的数据也在mounted之前？？？
    //出现问题数据拿不到，原因式vue组件的生命周期，其先computed后mounted，computed刚好在mounted之前执行
    ...mapGetters({
      cartList: 'cartList' || [],
    }),
    //两次执行，第一次是挂载前应该为【】
    //第二次是mounted之后数据更新为最新的
    cartInfoList () {
      // console.log('getter被调用了，得到了cartInfoList。此时的cartList是' + this.cartList);
      return this.cartList.cartInfoList || [];
    },
    // ...mapGetters({
    //   cartInfoList: 'cartInfoList' || []
    // })
    totalPrice () {
      let sum = 0//比我好多了
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum
      })
      return sum
    },
    isCheckedAll () {
      return this.cartInfoList.every((item) => item.isChecked == 1)
    },
  },

  mounted () {
    this.getData();
    // console.log(this.cartInfoList);
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>