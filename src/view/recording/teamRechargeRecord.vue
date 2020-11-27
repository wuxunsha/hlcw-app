<template>
  <div class="teamRechargeRecord">
    <van-nav-bar
      title="团队充值记录"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="teamRechargeRecord-box">
      <van-pull-refresh
        v-model="isRechargeLoading"
        @refresh="onRechargeRefresh"
        style="touch-action: pan-y;"
        class="van-pull-refresh"
      >
        <van-list
          v-model="rechargeLoading"
          :finished="rechargeFinished"
          finished-text="没有更多数据了"
          @load="rechargeOnLoad"
          offset="50"
        >
          <ul>
            <li v-for="(item, index) in rechargeList" :key="index">
              <div>
                <p>
                  <span>用户名：</span>
                  <span>{{item.username}}</span>
                </p>
              </div>
              <div>
                <p>
                  {{
                    item.rechargeType === '1'
                      ? '支付宝'
                      : item.rechargeType === '2'
                      ? '微信'
                      : item.rechargeType === '3'
                      ? '银行卡'
                      : ''
                  }}
                </p>
                <p class="blue">{{ Number(item.price).toFixed(2) }}</p>
              </div>
              <div>
                <p :class="item.paid === 0 ? 'orange' : 'green'">
                  {{
                    item.paid === 0 ? '未到账' : item.paid === 1 ? '已到账' : ''
                  }}
                </p>
                <p>{{ item.createTime }}</p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { groupRecharge } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 10,
        page: 1
      },
      rechargeList: [],
      rechargeLoading: false,
      rechargeFinished: false,
      isRechargeLoading: false
    }
  },
  created() {
    this.getRechargeList()
  },
  methods: {
    // 获取充值记录
    getRechargeList() {
      groupRecharge(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.rechargeLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.rechargeFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.rechargeList = [...this.rechargeList, ...v.data]
            } else {
              this.isRechargeLoading = false
              this.rechargeList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    rechargeOnLoad() {
      // 异步更新数据
      if (this.rechargeList.length === 0) return
      this.rechargeLoading = true
      this.queryInfo.page++
      this.getRechargeList()
    },
    // 下拉刷新
    onRechargeRefresh() {
      this.queryInfo.page = 1
      this.rechargeList = []
      this.rechargeFinished = false
      this.getRechargeList()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.teamRechargeRecord {
  background: #fff;
  min-height: calc(100vh);
  .teamRechargeRecord-box {
    margin-top: 20px;
    ul {
      > li {
        padding: 30px;
        border-bottom: 2px solid #ebedf0;
        > div:nth-child(1) {
          > p {
            margin: 0;
            line-height: 40px;
            font-size: 36px;
            > span:nth-child(1) {
              color: #353535;
            }
            > span:nth-child(2) {
              color: red;
            }
          }
        }
        > div:nth-child(2) {
          display: flex;
          margin-top: 20px;
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
          .blue {
            color: #415be1;
          }
        }
        > div:nth-child(3) {
          display: flex;
          margin-top: 20px;
          > p {
            flex: 1;
            margin: 0;
            line-height: 40px;
            font-size: 30px;
          }
          > p {
            color: #c8cdd3;
          }
          > p:nth-child(2) {
            text-align: right;
          }
          .orange {
            color: #ffa500;
          }
          .green {
            color: #228b22;
          }
        }
      }
    }
  }
}
</style>
<style>
.teamRechargeRecord .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.teamRechargeRecord .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.teamRechargeRecord .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
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
.teamRechargeRecord .teamRechargeRecord-box .van-pull-refresh {
  overflow: inherit;
}
.teamRechargeRecord .teamRechargeRecord-box .van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.teamRechargeRecord .teamRechargeRecord-box .van-loading__text {
  font-size: 24px;
}
</style>
