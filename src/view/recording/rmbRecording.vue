<template>
  <div class="withdrawalsRecord">
    <van-nav-bar title="RMB记录" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="withdrawalsRecord-box">
      <van-pull-refresh v-model="isRmbRecordingLoading" @refresh="onRmbRecordingRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="rmbRecordingLoading" :finished="rmbRecordingFinished" finished-text="没有更多数据了" @load="rmbRecordingOnLoad" offset="50">
          <ul>
            <li v-for="item in balanceList" :key="item.id">
              <div>
                <p>{{item.title}}</p>
                <p :class="item.pm === 0 ? 'red' : 'green'">{{item.pm === 0 ? '- ' + Number(item.number).toFixed(2) : '+ ' + Number(item.number).toFixed(2)}}</p>
              </div>
              <div>
                <p>{{item.createTime}}</p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { balanceRecord } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 10,
        page: 1
      },
      balanceList: [],
      rmbRecordingLoading: false,
      rmbRecordingFinished: false,
      isRmbRecordingLoading: false
    }
  },
  created() {
    this.getBalanceRecordList()
  },
  methods: {
    // 获取记录列表
    getBalanceRecordList() {
      balanceRecord(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.rmbRecordingLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.rmbRecordingFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.balanceList = [...this.balanceList, ...v.data]
            } else {
              this.isRmbRecordingLoading = false
              this.balanceList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    rmbRecordingOnLoad() {
      // 异步更新数据
      if (this.balanceList.length === 0) return
      this.rmbRecordingLoading = true
      this.queryInfo.page++
      this.getBalanceRecordList()
    },
    // 下拉刷新
    onRmbRecordingRefresh() {
      this.queryInfo.page = 1
      this.balanceList = []
      this.rmbRecordingFinished = false
      this.getBalanceRecordList()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
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
  color: #fff;
  font-size: 36px;
}
.withdrawalsRecord .withdrawalsRecord-box .van-pull-refresh {
  overflow: inherit;
}
.withdrawalsRecord .withdrawalsRecord-box .van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.withdrawalsRecord .withdrawalsRecord-box .van-loading__text {
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
