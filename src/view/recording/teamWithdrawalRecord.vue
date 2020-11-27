<template>
  <div class="teamWithdrawalRecord">
    <van-nav-bar title="团队提现记录" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="teamWithdrawalRecord-box">
      <van-pull-refresh v-model="isgroupExtractLoading" @refresh="ongroupExtractRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="groupExtractLoading" :finished="groupExtractFinished" finished-text="没有更多数据了" @load="groupExtractOnLoad" offset="50">
          <ul>
            <li v-for="(item, index) in groupExtractList" :key="index">
              <div>
                <p>
                  <span>用户名：</span>
                  <span>{{item.username}}</span>
                </p>
              </div>
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
import { groupExtract } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 10,
        page: 1
      },
      groupExtractList: [],
      groupExtractLoading: false,
      groupExtractFinished: false,
      isgroupExtractLoading: false
    }
  },
  created() {
    this.getgroupExtractList()
  },
  methods: {
    // 获取提现记录
    getgroupExtractList() {
      groupExtract(this.queryInfo).then(v => {
        if (v.status === 200) {
          this.groupExtractLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.groupExtractFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.groupExtractList = [...this.groupExtractList, ...v.data]
            } else {
              this.isgroupExtractLoading = false
              this.groupExtractList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    groupExtractOnLoad() {
      // 异步更新数据
      if (this.groupExtractList.length === 0) return
      this.groupExtractLoading = true
      this.queryInfo.page++
      this.getgroupExtractList()
    },
    // 下拉刷新
    ongroupExtractRefresh() {
      this.queryInfo.page = 1
      this.groupExtractList = []
      this.groupExtractFinished = false
      this.getgroupExtractList()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.teamWithdrawalRecord {
  background: #fff;
  min-height: calc(100vh);
  .teamWithdrawalRecord-box {
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
        > div:nth-child(3) {
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
.teamWithdrawalRecord .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.teamWithdrawalRecord .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.teamWithdrawalRecord .van-nav-bar .van-icon {
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
