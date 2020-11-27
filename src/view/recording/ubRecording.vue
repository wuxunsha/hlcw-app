<template>
  <div class="withdrawalsRecord">
    <van-nav-bar title="HLC记录" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="withdrawalsRecord-box">
      <van-pull-refresh v-model="isMineRecordLoading" @refresh="onMineRecordRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="mineRecordLoading" :finished="mineRecordFinished" finished-text="没有更多数据了" @load="mineRecordOnLoad" offset="50">
          <ul>
            <li v-for="item in currencyList" :key="item.id">
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
import { mineRecord } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 10,
        page: 1
      },
      currencyList: [],
      mineRecordLoading: false,
      mineRecordFinished: false,
      isMineRecordLoading: false
    }
  },
  created() {
    this.getMineRecordList()
  },
  methods: {
    // 获取HLC记录
    getMineRecordList() {
      mineRecord(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.mineRecordLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.mineRecordFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.currencyList = [...this.currencyList, ...v.data]
            } else {
              this.isMineRecordLoading = false
              this.currencyList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    mineRecordOnLoad() {
      // 异步更新数据
      if (this.currencyList.length === 0) return
      this.mineRecordLoading = true
      this.queryInfo.page++
      this.getMineRecordList()
    },
    // 下拉刷新
    onMineRecordRefresh() {
      this.queryInfo.page = 1
      this.currencyList = []
      this.mineRecordFinished = false
      this.getMineRecordList()
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
