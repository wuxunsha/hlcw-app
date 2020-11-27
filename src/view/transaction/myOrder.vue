<template>
  <div class="transaction-content">
    <van-nav-bar
      title="我的挂单"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="transaction-box">
      <div class="tab">
        <div
          v-for="item in tabList"
          :key="item.value"
          @click="tabTarget(item.value)"
          :class="item.value === active ? 'active' : ''"
        >
          <p>{{ item.label }}</p>
        </div>
      </div>
      <div class="tab1">
        <van-pull-refresh
          v-model="isTransactionRecordLoading"
          @refresh="onTransactionRecordRefresh"
          style="touch-action: pan-y;"
          class="van-pull-refresh"
        >
          <van-list
            v-model="transactionRecordLoading"
            :finished="transactionRecordFinished"
            finished-text="没有更多数据了"
            @load="transactionRecordOnLoad"
            offset="50"
          >
            <ul>
              <li
                class="transaction-info"
                v-for="(item, index) in transactionRecordList"
                :key="index"
              >
                <div>
                  <p>
                    <span>订单号:</span>
                    <span>{{ item.tradingId }}</span>
                  </p>
                  <p>{{ getDate(item.updateTime) }}</p>
                </div>
                <div>
                  <p>
                    <span>数量(HLC)</span>
                    <span>{{ Number(item.payNum).toFixed(2) }}</span>
                  </p>
                  <p>
                    <span>价格(RMB)</span>
                    <span>{{ Number(item.payPrice).toFixed(2) }}</span>
                  </p>
                  <p v-if="active === '2'">
                    <span>实际到账金额(RMB)</span>
                    <span >{{(Number(item.payPrice) - Number(item.payPrice) * (Number(costInformation.tradingFee) / 100)).toFixed(2)}}</span>
                  </p>
                </div>
                <div class="cancel-btn">
                  <van-button
                    round
                    type="info"
                    color="linear-gradient(to right, #ff6034, #ee0a24)"
                    size="normal"
                    @click="cancel(item.id)"
                    >取 消</van-button
                  >
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import {
  tradingCenterByAccount,
  cancelOrder,
  feeOrUserInfo
} from '../../api/index'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      active: '1',
      tabList: [
        {
          value: '1',
          label: '买入'
        },
        {
          value: '2',
          label: '卖出'
        }
      ],
      queryInfo: {
        pageCurrent: 1,
        size: 5,
        status: '0'
      },
      transactionRecordList: [],
      transactionRecordLoading: false,
      transactionRecordFinished: false,
      isTransactionRecordLoading: false,
      costInformation: {}
    }
  },
  created() {
    this.getTradingCenterByAccount()
    this.getFeeOrUserInfo()
  },
  methods: {
    // 获取交易记录
    getTradingCenterByAccount() {
      const data = {
        pageCurrent: this.queryInfo.pageCurrent,
        size: this.queryInfo.size,
        status: this.queryInfo.status,
        type: this.active
      }
      tradingCenterByAccount(data).then(v => {
        if (v.status === 200) {
          this.transactionRecordLoading = false
          if (v.status === 200) {
            if (v.data.records.length === 0 || v.data.records.length < 5) {
              this.transactionRecordFinished = true
            }
            if (this.queryInfo.pageCurrent > 1) {
              this.transactionRecordList = [
                ...this.transactionRecordList,
                ...v.data.records
              ]
            } else {
              this.isTransactionRecordLoading = false
              this.transactionRecordList = v.data.records
            }
          }
        }
      })
    },
    // 切换
    tabTarget(i) {
      window.scrollTo(0, 0)
      this.queryInfo.pageCurrent = 1
      this.active = i
      this.transactionRecordFinished = false
      this.transactionRecordList = []
      this.getTradingCenterByAccount()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    // 上拉加载
    transactionRecordOnLoad() {
      // 异步更新数据
      if (this.transactionRecordList.length === 0) return
      this.transactionRecordLoading = true
      this.queryInfo.pageCurrent++
      this.getTradingCenterByAccount()
    },
    // 下拉刷新
    onTransactionRecordRefresh() {
      this.queryInfo.pageCurrent = 1
      this.transactionRecordList = []
      this.transactionRecordFinished = false
      this.getTradingCenterByAccount()
    },
    // 取消订单
    cancel(id) {
      Dialog.confirm({
        message: '是否确定取消订单!',
        width: '300',
        lockScroll: true
      })
        .then(() => {
          cancelOrder({ id: id }).then(v => {
            if (v.status === 200) {
              this.$toast.success('取消发布成功')
              this.getTradingCenterByAccount()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 时间戳转换
    getDate(timeStamp) {
      const dt = new Date(timeStamp)
      const year = dt.getFullYear()
      const month = (dt.getMonth() + 1 + '').padStart(2, '0')
      const date = (dt.getDate() + '').padStart(2, '0')

      const hours = (dt.getHours() + '').padStart(2, '0')
      const minutes = (dt.getMinutes() + '').padStart(2, '0')
      const second = (dt.getSeconds() + '').padStart(2, '0')
      let resStr =
        year +
        '-' +
        month +
        '-' +
        date +
        ' ' +
        hours +
        ':' +
        minutes +
        ':' +
        second
      return resStr
    },
    // 获取交易手续费
    getFeeOrUserInfo() {
      feeOrUserInfo().then(v => {
        if (v.status === 200) {
          this.costInformation = v.data
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.transaction-content {
  .transaction-box {
    .tab {
      position: fixed;
      top: 80px;
      z-index: 99;
      display: flex;
      margin-bottom: 20px;
      background: #fff;
      // padding: 0 30px;
      width: 100%;
      > div {
        flex: 1;
        text-align: center;
        padding: 10px 0;
        > p {
          margin: 0;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          padding: 10px 0;
        }
      }
      .active {
        border-bottom: 4px solid #415be1;
        > p {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 500;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
    .tab1 {
      margin-top: 100px;
      padding: 0 30px;
      .transaction-info {
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        margin-bottom: 20px;
        > div:nth-child(1) {
          display: flex;
          > p {
            margin: 0;
            line-height: 40px;
          }
          > p:nth-child(1) {
            width: 50%;
            word-break: break-all;
            > span {
              font-size: 30px;
              color: rgba(75, 106, 235, 1);
            }
            > span:nth-child(1) {
              font-weight: bold;
            }
            > span:nth-child(2) {
              font-weight: 500;
              margin-left: 10px;
            }
          }
          > p:nth-child(2) {
            width: 50%;
            text-align: right;
            font-size: 28px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
        }
        > div:nth-child(2) {
          display: flex;
          margin-top: 20px;
          > p {
            word-break: break-all;
            > span {
              margin: 0;
              line-height: 50px;
              display: block;
            }
            > span:nth-child(1) {
              font-size: 26px;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
            }
            > span:nth-child(2) {
              font-size: 30px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }
          }
          > p:nth-child(1) {
            width: 25%;
            margin-right: 20px;
          }
          > p:nth-child(2) {
            width: 30%;
            text-align: center;
            margin-right: 20px;
          }
          > p:last-child {
            flex: 1;
            text-align: right;
          }
        }
        .cancel-btn {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<style>
.transaction-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.transaction-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.transaction-content .van-nav-bar .van-icon {
  color: #fff !important;
  font-size: 36px;
}
.transaction-content
  .transaction-box
  .tab1
  .transaction-info
  .cancel-btn
  .van-button {
  width: 300px;
  border: none;
}
.transaction-content
  .transaction-box
  .tab1
  .transaction-info
  .cancel-btn
  .van-button__text {
  font-size: 28px;
  font-weight: 600;
}
.transaction-content .transaction-box .tab1 .van-pull-refresh {
  overflow: inherit;
}
.transaction-content .transaction-box .tab1 .van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.transaction-content .transaction-box .tab1 .van-loading__text {
  font-size: 24px;
}
.van-dialog__message {
  padding: 60px 0;
  font-size: 36px;
}
.van-dialog__footer {
  padding: 20px 0;
}
.van-button__text {
  font-size: 32px;
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
