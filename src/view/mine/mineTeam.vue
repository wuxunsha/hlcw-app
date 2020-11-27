<template>
  <div class="team-content">
    <van-nav-bar title="我的团队" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="team-box">
      <div class="team-assets">
        <div class="team-income">
          <div @click="teamRechargeRecord">
            <p>
              <span class="iconfont iconchongzhi cyan">&nbsp;&nbsp;团队累计充值(RMB)</span>
            </p>
            <p>{{Number(myTeamList.groupAccumulation).toFixed(2)}}</p>
          </div>
          <div @click="teamWithdrawalRecord">
            <p>
              <span class="iconfont icontixian red">&nbsp;&nbsp;团队累计提现(RMB)</span>
            </p>
            <p>{{Number(myTeamList.groupWithdrawal).toFixed(2)}}</p>
          </div>
        </div>
        <div class="team-income">
          <div>
            <p>
              <span class="iconfont iconchongwu green">&nbsp;&nbsp;团队投资宠物(RMB)</span>
            </p>
            <p>{{Number(myTeamList.groupPet).toFixed(2)}}</p>
          </div>
          <div>
            <p>
              <span class="iconfont iconcaiwutouzi blue">&nbsp;&nbsp;团队投资矿机(HLC)</span>
            </p>
            <p>{{Number(myTeamList.groupMine).toFixed(2)}}</p>
          </div>
        </div>
      </div>
      <div class="member-info">
        <div>
          <div>
            <img :src="
                userInfo.avatar
                  ? userInfo.avatar
                  : require('../../assets/image/mine/avatar.png')
              " alt="" />
          </div>
          <div>
            <p>{{ userInfo.username }}</p>
            <p>{{ userInfo.levelName }}</p>
          </div>
        </div>
        <div>
          <van-cell-group>
            <van-cell title="累计充值" center>
              <template #right-icon>
                <span>{{Number(myTeamList.personalAccumulation).toFixed(2)}}RMB</span>
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="累计提现" center>
              <template #right-icon>
                <span>{{Number(myTeamList.personalWithdrawal).toFixed(2)}}RMB</span>
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="投资宠物" center>
              <template #right-icon>
                <span>{{Number(myTeamList.personalPet).toFixed(2)}}RMB</span>
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="投资矿机" center>
              <template #right-icon>
                <span>{{Number(myTeamList.personalMine).toFixed(2)}} HLC</span>
              </template>
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="团队人数" center @click="memberDetail">
              <template #right-icon>
                <span>{{myTeamList.groupCount}}人</span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myTeam, userinfo } from '../../api/index'
export default {
  data() {
    return {
      userInfo: {},
      myTeamList: {}
    }
  },
  created() {
    this.getUserInfo()
    this.getMyTeam()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      userinfo().then(v => {
        if (v.status === 200) {
          this.userInfo = v.data
        }
      })
    },
    // 获取团队信息
    getMyTeam() {
      myTeam({ leaderId: Number(this.$route.query.uid) }).then(v => {
        if (v.status === 200) {
          this.myTeamList = v.data
        }
      })
    },
    // 查看成员
    memberDetail() {
      this.$router.push({
        path: '/memberList',
        query: {
          uid: this.myTeamList.uid
        }
      })
    },
    // 团队充值记录
    teamRechargeRecord() {
      this.$router.push({
        path: '/teamRechargeRecord'
      })
    },
    // 团队提现记录
    teamWithdrawalRecord() {
      this.$router.push({
        path: '/teamWithdrawalRecord'
      })
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
.team-content {
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
            .cyan {
              color: #47e5f5;
            }
            .blue {
              color: #31abf7;
            }
            .red {
              color: #ff716f;
            }
            .green {
              color: #f7a95f;
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
      .team-income:nth-child(4) {
        margin-bottom: 0;
      }
    }
    .member-info {
      background: #fff;
      border-radius: 20px;
      padding: 30px;
      margin-top: 20px;
      > div:nth-child(1) {
        display: flex;
        border-bottom: 2px solid #ebedf0;
        padding: 20px 0;
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
          display: flex;
          flex: 1;
          margin-left: 20px;
          margin-top: 10px;
          > p:nth-child(1) {
            flex: 1;
            font-size: 36px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 72px;
            margin: 0;
          }
          > p:nth-child(2) {
            width: 160px;
            margin: 0;
            background: url('../../assets/image/mine/member-bg.png') no-repeat;
            background-size: 100%;
            text-align: center;
            line-height: 72px;
            font-size: 28px;
            font-family: MFWenYan_Noncommercial;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>
<style>
.team-content .team-box .van-cell {
  height: 80px;
  padding: 10px 0;
  /* border-bottom: 2px solid #f5f5f9; */
}
.team-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.team-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.team-content .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.team-content .van-hairline--top-bottom::after {
  border-width: 0;
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
.team-content .member-info > div:nth-child(2) .van-cell {
  font-size: 28px;
}
</style>
