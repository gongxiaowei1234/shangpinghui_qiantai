<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- <div class="sort" v-show="this.$route.path=='/home'" > -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储鼠标移动时的索引
      currentIndex: -1,
      //三级分类显示
      show: true,
    };
  },
  created() {},
  methods: {
    //鼠标移动时修改currentIndex值
    // ES6
    // changeIndex(index) {
    //   //index : 一级分类索引值
    //   this.currentIndex = index;
    //   console.log(this.currentIndex);
    // },
    //ES5写法
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
    }, 50),
    //一级分类鼠标离开
    leaveIndex() {
      if (this.$route.path != "/home") {
        this.currentIndex = -1;
        this.show = false;
      }
    },
    //进行<a></a>标签路由跳转
    //最好方法： 编程时导航 + 事件委派
    goSearch(event) {
      let element = event.target;
      //节点有dataset属性，可以获取节点的自定义属性和属性值
      // console.log(element);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;

      //判断是否是a标签
      if (categoryname) {
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //判断是哪一个a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判断 如何路由跳转时，有params参数，也传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          //动态给location配置对象添加query属性
          location.query = query;
          //路由跳转
          this.$router.push(location);
          // console.log(location);
        } else {
          location.query = query;
          //路由跳转
          this.$router.push(location);
          // console.log(location);
        }
        
      }
    },
    //鼠标进入展示商品分类
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
  //组件挂载完毕，可以向服务发送请求
  mounted() {
    /*  两个方法都是传值给vuex的mutation改变state
    dispatch：异步操作，数据提交至 actions ，可用于向后台提交数据
    commit： 同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里 
    */
    // console.log("挂载完毕");
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style lang="less">
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
        .cur {
          background: skyblue !important;
        }
      }
    }
    //过渡动画开始状态
    .sort-enter {
      height: 0px;
      transform: rotate(0deg);
    }
    //过渡动画结束状态
    .sort-enter-to {
      height: 470px;
      transform: rotate(360deg);
    }
    //定义动画时间、速率
    .sort-enter-active {
      transiton: all 0.5s linear;
    }
  }
}
</style>