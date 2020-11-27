<template>
  <div class="withdrawalsRecord">
    <van-nav-bar title="提现记录" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="withdrawalsRecord-box">
      <van-pull-refresh v-model="isExtractLoading" @refresh="onExtractRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="extractLoading" :finished="extractFinished" finished-text="没有更多数据了" @load="extractOnLoad" offset="50">
          <ul>
            <li v-for="(item, index) in extractList" :key="index">
              <div>
                <p>{{item.bankAddress}}({{item.bankCode.substr(-4)}})</p>
                <p>{{Number(item.extractPrice).toFixed(2)}}</p>
              </div>
              <div>
                <p :class="item.status === -1 ? 'red' : item.status === 0 ? 'orange' : item.status === 1 ? 'green' : ''">{{item.status === -1 ? '未通过' : item.status === 0 ? "审核中" : item.status === 1 ? '已提现' : ''}}
                  {{item.status === -1 ? '(' + item.failMsg + ')' : ''}}</p>
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
import { extract } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 10,
        page: 1
      },
      extractList: [],
      extractLoading: false,
      extractFinished: false,
      isExtractLoading: false
    }
  },
  created() {
    this.getExtractList()
  },
  methods: {
    // 获取提现记录
    getExtractList() {
      extract(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.extractLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.extractFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.extractList = [...this.extractList, ...v.data]
            } else {
              this.isExtractLoading = false
              this.extractList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    extractOnLoad() {
      // 异步更新数据
      if (this.extractList.length === 0) return
      this.extractLoading = true
      this.queryInfo.page++
      this.getExtractList()
    },
    // 下拉刷新
    onExtractRefresh() {
      this.queryInfo.page = 1
      this.extractList = []
      this.extractFinished = false
      this.getExtractList()
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
            margin: 0;
            line-height: 40px;
            font-size: 32px;
            color: #353535;
          }
          > p:nth-child(1) {
            flex: 1;
            font-weight: bold;
          }
          > p:nth-child(2) {
            flex: .6;
            text-align: right;
          }
        }
        > div:nth-child(2) {
          display: flex;
          margin-top: 20px;
          > p {
            flex: 1;
            margin: 0;
            line-height: 40px;
            font-size: 30px;
            color: #c8cdd3;
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
          .orange {
            color: #ffa500;
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
