<template>
  <div class="withdrawalsRecord">
    <van-nav-bar title="签到记录" fixed :placeholder="true" left-arrow @click-left="onClickLeft" right-text="签到规则" @click-right="onClickRight" />
    <div class="withdrawalsRecord-box">
      <van-pull-refresh v-model="isSignInLoading" @refresh="onSignInRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="signInLoading" :finished="signInFinished" finished-text="没有更多数据了" @load="signInOnLoad" offset="50">
          <ul>
            <li v-for="(item, index) in signList" :key="index">
              <div>
                <p>{{item.addTime}}</p>
                <p class="green">+ {{Number(item.number).toFixed(2)}}</p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { signList } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 5,
        page: 1
      },
      signList: [],
      signInLoading: false,
      signInFinished: false,
      isSignInLoading: false
    }
  },
  created() {
    this.getSignList()
  },
  methods: {
    // 获取签到记录
    getSignList() {
      signList(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.signInLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.signInFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.signList = [...this.signList, ...v.data]
            } else {
              this.isSignInLoading = false
              this.signList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    signInOnLoad() {
      // 异步更新数据
      if (this.signList.length === 0) return
      this.signInLoading = true
      this.queryInfo.page++
      this.getSignList()
    },
    // 下拉刷新
    onSignInRefresh() {
      this.queryInfo.page = 1
      this.signList = []
      this.signInFinished = false
      this.getSignList()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    // 签到规则
    onClickRight() {
      this.$router.push({
        path: '/signInRule'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.withdrawalsRecord {
  background: #fff;
  min-height: calc(100vh);
  .withdrawalsRecord-box {
    margin-top: 20px;
    ul {
      > li {
        padding: 30px;
        border-bottom: 2px solid #ebedf0;
        > div:nth-child(1) {
          display: flex;
          > p {
            flex: 1;
            margin: 0;
            line-height: 40px;
            font-size: 32px;
            color: #353535;
          }
          > p:nth-child(1) {
            font-weight: bold;
          }
          > p:nth-child(2) {
            text-align: right;
          }
          .green {
            color: #339933;
          }
          .red {
            color: #ff0000;
          }
        }
        > div:nth-child(2) {
          margin-top: 20px;
          > p {
            margin: 0;
            line-height: 40px;
            font-size: 30px;
            color: #c8cdd3;
          }
        }
      }
    }
  }
}
</style>
<style>
.withdrawalsRecord .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.withdrawalsRecord .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.withdrawalsRecord .van-nav-bar .van-icon {
  color: #fff!important;
  font-size: 36px;
}
.withdrawalsRecord .van-nav-bar__text {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
}
.van-pull-refresh {
  overflow: inherit;
}
.van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.van-loading__text {
  font-size: 24px;
}
.van-toast {
  width: 38% !important;
}
.van-toast__icon {
  font-size: 48px;
}
.van-toast__text {
  font-size: 28px;
  line-height: 40px;
}
</style>
