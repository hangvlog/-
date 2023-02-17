<template>
  <div>
    <!-- 事件委派 -->
    <div class="type-nav"
         @mouseleave="leaveIndex">
      <div class="container">
        <div @mouseenter="showShoppingList"
             @mouseleave="hideShoppingList">
          <h2 class="all">全部商品分类</h2>
          <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
          </nav>
          <transition name="sort">
            <div class="sort"
                 v-show="isShown">
              <div class="all-sort-list2"
                   @click="goSearch">
                <div class="item"
                     v-for="c1 in categoryList"
                     :key="c1.categoryId">
                  <h3 @mouseenter="changeIndex(c1.categoryId)"
                      :class="{cur:c1.categoryId == currentIndex}">
                    <a :data-categoryName="c1.categoryName"
                       :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                  </h3>
                  <!-- 二级。三级 -->
                  <div class="item-list clearfix"
                       :style="{display:c1.categoryId == currentIndex ? 'block':'none'}">
                    <div class="subitem"
                         v-for="c2 in c1.categoryChild"
                         :key="c2.categoryId">
                      <dl class="fore">
                        <dt>
                          <a :data-categoryName="c2.categoryName"
                             :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                        </dt>
                        <dd>
                          <em v-for="c3 in c2.categoryChild"
                              :key="c3.categoryId">
                            <a :data-categoryName="c3.categoryName"
                               :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'node_modules/_vuex@3.6.2@vuex/types'
import { mapState } from 'vuex'
// import _ from 'lodash'
import throttle from 'lodash/throttle'
// console.log(throttle);
export default {
  data () {
    return {
      currentIndex: -1,
      isShown: true,
    }
  },
  name: "TypeNav",
  // 挂载完成执行
  mounted () {
    // 通知vuex获取数据
    // this.$store.dispatch('categoryList');
    if (this.$route.path != '/home')
      this.isShown = false
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    // 节流功能未知
    changeIndex: throttle(function (newIndex) {
      this.currentIndex = newIndex;
      // console.log(this.currentIndex);
    }, 50),
    leaveIndex () {
      this.currentIndex = -1;
    },
    goSearch (e) {
      // console.log(e.target)
      let tmp = e.target.dataset;
      let { categoryname, category1id, category2id, category3id } = tmp;
      // console.log(categoryName, category1id, category2id, category3id);
      if (categoryname) {
        // 判断几级路由
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // console.log(location);
        if (this.$route.params)
          location.params = this.$route.params
        location.query = query
        this.$router.push(location)
        // if ()
      }
    },
    showShoppingList () {
      if (this.$route.path != '/home')
        this.isShown = true;
    },
    hideShoppingList () {
      if (this.$route.path != '/home') {
        // 用途未知，感觉不需要，逻辑上需要
        this.currentIndex = -1;
        this.isShown = false;
      }

    }
  }
}
</script>

<style lang="less" scoped>
.cur {
  background-color: skyblue;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      // overflow: hidden;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }

    .sort-enter {
      height: 0;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.3s ease;
    }
  }
}
</style>