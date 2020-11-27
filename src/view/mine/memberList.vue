<template>
  <div class="teamList">
    <van-nav-bar title="成员列表" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="team-box">
      <!-- <div class="team-assets">
        <div class="team-income">
          <div>
            <p>
              <span>团队累计充值(RMB)</span>
            </p>
            <p>2000.00</p>
          </div>
          <div>
            <p>
              <span>团队累计投资宠物(RMB)</span>
            </p>
            <p>20</p>
          </div>
        </div>
        <div class="team-income">
          <div>
            <p>
              <span>团队累计提现(RMB)</span>
            </p>
            <p>2000.00</p>
          </div>
          <div>
            <p>
              <span>团队累计投资矿机(U)</span>
            </p>
            <p>2</p>
          </div>
        </div>
      </div>-->
      <van-pull-refresh v-model="isMemberLoading" @refresh="onMemberRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="memberLoading" :finished="memberFinished" finished-text="没有更多数据了" @load="memberOnLoad" offset="50">
          <div class="member-info" v-for="(item, index) in groupLowerList" :key="index">
            <div>
              <img :src="item.avatar" alt="">
            </div>
            <div>
              <p>
                <span>{{ item.username }}</span>
                <span @click="SubordinateTeam(item.uid)" v-show="item.lowerCount !== 0">团队</span>
              </p>
              <p>
                <span>{{ item.phone }}</span>
              </p>
              <ul>
                <li>
                  <p>累计充值(RMB)</p>
                  <p>{{ Number(item.personalAccumulation).toFixed(2) }}</p>
                </li>
                <li>
                  <p>累计提现(RMB)</p>
                  <p>{{ Number(item.personalWithdrawal).toFixed(2) }}</p>
                </li>
                <li>
                  <p>投资宠物(RMB)</p>
                  <p>{{ Number(item.personalPet).toFixed(2) }}</p>
                </li>
                <li>
                  <p>投资矿机(HLC)</p>
                  <p>{{ Number(item.personalMine).toFixed(2) }}</p>
                </li>
              </ul>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { groupLower } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 5,
        page: 1
      },
      groupLowerList: [],
      memberLoading: false,
      memberFinished: false,
      isMemberLoading: false,
      leaderId: null
    }
  },
  created() {
    if (this.$route.query.uid) {
      this.leaderId = Number(this.$route.query.uid)
    }
    this.getGroupLower()
  },
  methods: {
    // 获取团队下级人员
    getGroupLower() {
      const data = {
        leaderId: this.leaderId,
        limit: this.queryInfo.limit,
        page: this.queryInfo.page
      }
      groupLower(data).then(v => {
        if (v.status === 200) {
          this.memberLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 5) {
              this.memberFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.groupLowerList = [...this.groupLowerList, ...v.data]
            } else {
              this.isMemberLoading = false
              this.groupLowerList = v.data
            }
          }
        }
      })
    },
    // 下属团队
    SubordinateTeam(uid) {
      this.queryInfo.page = 1
      this.leaderId = uid
      this.groupLowerList = []
      this.getGroupLower()
    },
    // 上拉加载
    memberOnLoad() {
      // 异步更新数据
      if (this.groupLowerList.length === 0) return
      this.memberLoading = true
      this.queryInfo.page++
      this.getGroupLower()
    },
    // 下拉刷新
    onMemberRefresh() {
      this.queryInfo.page = 1
      this.groupLowerList = []
      this.memberFinished = false
      this.getGroupLower()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    // 保留两位小数
    eturnFloat(value) {
      var priceValue = Math.round(parseFloat(value) * 100) / 100
      var xsd = priceValue.toString().split('.')
      if (xsd.length === 1) {
        priceValue = priceValue.toString() + '.00'
        return priceValue
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          priceValue = priceValue.toString() + '0'
        }
        return priceValue
      }
    }
  }
}
</script>
<style scoped lang="scss">
.team-box {
  padding: 20px;
  .team-assets {
    background: #fff;
    border-radius: 20px;
    padding: 30px 0;
    .team-income {
      display: flex;
      margin-bottom: 30px;
      > div {
        flex: 1;
        text-align: center;
        > p {
          margin: 0;
        }
        > p:nth-child(1) {
          font-size: 24px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 40px;
          > span:nth-child(1) {
            font-size: 30px;
            margin-right: 10px;
          }
        }
        > p:nth-child(2) {
          font-size: 30px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
        }
      }
    }
    .team-income:nth-child(2) {
      margin-bottom: 0;
    }
  }
  .member-info {
    display: flex;
    // height: 130px;
    background: #fff;
    border-radius: 20px;
    padding: 20px 20px;
    margin-top: 20px;
    > div:nth-child(1) {
      width: 120px;
      height: 120px;
      border-radius: 50% !important;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50% !important;
      }
    }
    > div:nth-child(2) {
      flex: 1;
      margin-left: 10px;
      > p {
        margin: 0;
      }
      > p:nth-child(1) {
        display: flex;
        > span:nth-child(1) {
          flex: 1;
          font-size: 32px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          margin-top: 10px;
        }
        > span:nth-child(2) {
          flex: 1;
          text-align: right;
          font-size: 28px;
          font-weight: 500;
          color: orange;
          margin-top: 10px;
        }
      }
      > p:nth-child(2) {
        font-size: 28px;
        font-weight: 500;
        color: rgb(97, 64, 247);
        margin-top: 10px;
      }
      > ul {
        display: flex;
        margin-top: 10px;
        > li {
          flex: 1;
          > p {
            margin: 0;
            line-height: 40px;
          }
          > p:nth-child(1) {
            font-size: 24px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
          > p:nth-child(2) {
            font-size: 28px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
        }
        > li:nth-child(2),
        > li:nth-child(3) {
          text-align: center;
        }
        > li:nth-child(4) {
          text-align: right;
        }
      }
    }
  }
}
</style>
<style>
.teamList .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.teamList .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.teamList .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.teamList .team-box .van-pull-refresh {
  overflow: inherit;
}
.teamList .team-box .van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.teamList .team-box .van-loading__text {
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
