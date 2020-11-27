<template>
  <div class="mine-content">
    <div class="user-box">
      <div class="user-info">
        <div class="user-content">
          <div @click.stop="uploadHeadImg">
            <img :src="
                userAvatar
                  ? userAvatar
                  : require('../../assets/image/mine/avatar.png')
              " alt="">
            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput">
          </div>
          <div>
            <div>
              <p>{{ userInfo.username }}</p>
              <p>{{ userInfo.levelName }}</p>
            </div>
            <div>
              <!-- <span>{{ userInfo.phone }}</span> -->
            </div>
          </div>
          <div>
            <p @click="personalInformation">个人信息</p>
          </div>
        </div>
        <div class="account-info">
          <div>
            <p>{{ Number(userInfo.totalCash).toFixed(2) }}</p>
            <p>合约金额</p>
          </div>
          <div>
            <p>{{ Number(userInfo.nowMoney).toFixed(2) }}</p>
            <p>可用余额</p>
          </div>
          <div>
            <p>{{ Number(userInfo.dayMoneyRevenue).toFixed(2) }}</p>
            <p>今日收益</p>
          </div>
          <div>
            <p>{{ Number(userInfo.totalMoneyRevenue).toFixed(2) }}</p>
            <p>累计收益</p>
          </div>
        </div>
        <div class="account-info">
          <div>
            <p>{{ Number(userInfo.totalMine).toFixed(2) }}</p>
            <p>HLC节点</p>
          </div>
          <div>
            <p>{{ Number(userInfo.brokeragePrice).toFixed(2) }}</p>
            <p>HLC余额</p>
          </div>
          <div>
            <p>{{ Number(userInfo.dayMineRevenue).toFixed(2) }}</p>
            <p>HLC今日产出</p>
          </div>
          <div>
            <p>{{ Number(userInfo.totalMineRevenue).toFixed(2) }}</p>
            <p>HLC累计产出</p>
          </div>
        </div>
      </div>
    </div>
    <div class="icon-nav">
      <div class="nav-bar">
        <div @click="myMachine">
          <img src="../../assets/image/mine/mine-mining-machine.png" alt="">
          <p>我的矿机</p>
        </div>
        <div @click="myPet">
          <img src="../../assets/image/mine/mine-pet.png" alt="">
          <p>我的宠物</p>
        </div>
        <div @click="team" v-if="userInfo.spreadUid === 0">
          <img src="../../assets/image/mine/mine-team.png" alt="">
          <p>我的团队</p>
        </div>
        <div @click="memberDetail" v-else>
          <img src="../../assets/image/mine/mine-team.png" alt="">
          <p>团队成员</p>
        </div>
        <div @click="recharge">
          <img src="../../assets/image/mine/recharge.png" alt="">
          <p>我要充值</p>
        </div>
      </div>
      <div class="features-bar">
        <div @click="rmbRecording">
          <img src="../../assets/image/mine/mine-rmb.png" alt="">
          <p>RMB记录</p>
        </div>
        <div @click="ubRecording">
          <img src="../../assets/image/mine/mine-ptc.png" alt="">
          <p>HLC记录</p>
        </div>
        <div @click="withdrawalsRecord">
          <img src="../../assets/image/mine/mine-txjl.png" alt="">
          <p>提现记录</p>
        </div>
        <div @click="withdraw">
          <img src="../../assets/image/mine/mine-fqtx.png" alt="">
          <p>发起提现</p>
        </div>
        <div @click="rechargeRecord">
          <img src="../../assets/image/mine/mine-txjl.png" alt="">
          <p>充值记录</p>
        </div>
        <div @click="transactionRecord">
          <img src="../../assets/image/mine/transaction.png" alt="">
          <p>交易记录</p>
        </div>
        <div @click="helpCenter">
          <img src="../../assets/image/mine/mine-bzzx.png" alt="">
          <p>帮助中心</p>
        </div>
        <div @click="setUp">
          <img src="../../assets/image/mine/mine-xtsz.png" alt="">
          <p>系统设置</p>
        </div>
      </div>
    </div>
    <myFooter :footerNavActive="activeType"></myFooter>
  </div>
</template>

<script>
import { userinfo, editUser } from '../../api/index'
import myFooter from '../../components/footer/footer.vue'
export default {
  data() {
    return {
      activeType: 'mine',
      // 用户头像
      userAvatar: '',
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      userinfo().then(v => {
        if (v.status === 200) {
          this.userInfo = v.data
          this.userAvatar = v.data.avatar
        }
      })
    },
    // 我的矿机
    myMachine() {
      this.$router.push({
        path: '/myMachine'
      })
    },
    // 我的宠物
    myPet() {
      this.$router.push({
        path: '/myPet'
      })
    },
    // 我的团队
    team() {
      this.$router.push({
        path: '/mineTeam',
        query: {
          uid: this.userInfo.uid
        }
      })
    },
    // 团队成员
    memberDetail() {
      this.$router.push({
        path: '/memberList',
        query: {
          uid: this.userInfo.uid
        }
      })
    },
    // 充值
    recharge() {
      this.$router.push({
        path: '/recharge'
      })
    },
    // RMB记录
    rmbRecording() {
      this.$router.push({
        path: '/rmbRecording'
      })
    },
    // HLC记录
    ubRecording() {
      this.$router.push({
        path: '/ubRecording'
      })
    },
    // 提现记录
    withdrawalsRecord() {
      this.$router.push({
        path: '/withdrawalsRecord'
      })
    },
    // 提现
    withdraw() {
      this.$router.push({
        path: '/withdraw'
      })
    },
    // 个人信息
    personalInformation() {
      this.$router.push({
        path: '/personalInformation'
      })
    },
    // 充值记录
    rechargeRecord() {
      this.$router.push({
        path: '/rechargeRecord'
      })
    },
    // 交易记录
    transactionRecord() {
      this.$router.push({
        path: '/transactionRecord'
      })
    },
    // 帮助中心
    helpCenter() {
      this.$router.push({
        path: '/helpCenter'
      })
    },
    // 系统设置
    setUp() {
      this.$router.push({
        path: '/systemSettings'
      })
    },
    // 打开图片上传
    uploadHeadImg() {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 修改头像显示
    handleFile(e) {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
        overlay: true
      })
      let $target = e.target || e.srcElement
      let files = $target.files[0]
      let file = new FormData()
      file.append('file', files)
      this.axios({
        headers: {
          Authorization: 'Bearer ' + this.$store.state.userInfo.token
        },
        method: 'post',
        url: 'https://api.hlcw.vip/api/upload',
        data: file
      }).then(v => {
        if (v.data.status === 200) {
          this.userAvatar = v.data.data.url[0]
          this.editUserInfo(v.data.data.url[0])
        }
      })
    },
    // 修改用户信息
    editUserInfo(imgUrl) {
      editUser({ avatar: imgUrl }).then(v => {
        if (v.status === 200) {
          this.$toast.clear()
          this.$toast.success('修改成功')
        }
      })
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
  },
  components: {
    myFooter
  }
}
</script>
<style scoped lang="scss">
.mine-content {
  .user-box {
    width: 100%;
    min-height: 470px;
    background: url('../../assets/image/mine/mine-bg.png') no-repeat;
    background-size: 100% !important;
    .user-info {
      padding: 60px 40px 40px;
      .user-content {
        display: flex;
        height: 130px;
        > div:nth-child(1) {
          width: 130px;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .hiddenInput {
            display: none;
          }
        }
        > div:nth-child(2) {
          flex: 1;
          margin: 10px 20px 0;
          > div:nth-child(1) {
            display: flex;
            > p:nth-child(1) {
              flex: 1;
              margin: 0;
              font-size: 36px;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 72px;
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
          > div:nth-child(2) {
            > span {
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        > div:nth-child(3) {
          width: 140px;
          line-height: 50px;
          > p {
            height: 50px;
            width: 100%;
            background: rgba(251, 149, 19, 1);
            border-radius: 25px;
            text-align: center;
            color: rgba(255, 255, 255, 1);
            font-size: 24px;
            margin-top: 40px;
          }
        }
      }
      .account-info {
        display: flex;
        margin: 30px 0 30px;
        > div {
          width: 25%;
          > p {
            margin: 0;
            text-align: center;
            line-height: 50px;
          }
          > p:nth-child(1) {
            font-size: 30px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            word-break: break-word;
          }
          > p:nth-child(2) {
            font-size: 24px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            opacity: 0.53;
          }
        }
        > div:nth-child(1),
        > div:nth-child(2),
        > div:nth-child(3) {
          border-right: 2px solid rgba(255, 255, 255, 1);
        }
      }
      .account-info-bottom {
        display: flex;
        margin: 30px 0 30px;
        > div {
          width: 33.33%;
          > p {
            margin: 0;
            text-align: center;
            line-height: 50px;
          }
          > p:nth-child(1) {
            font-size: 30px;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            word-break: break-word;
          }
          > p:nth-child(2) {
            font-size: 24px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            opacity: 0.53;
          }
        }
        > div:nth-child(1),
        > div:nth-child(2) {
          border-right: 2px solid rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .icon-nav {
    padding: 30px;
    .nav-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      padding: 24px 26px;
      border-radius: 20px;
      box-shadow: 0px 6px 12px rgba(109, 109, 109, 0.1);
      > div {
        flex: 1;
        text-align: center;
        img {
          width: 56px;
          height: 56px;
          margin-bottom: 10px;
        }
        > p {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
      > div:nth-child(3) {
        img {
          width: 70px;
          height: 56px;
        }
      }
    }
    .features-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      padding: 24px 26px;
      border-radius: 20px;
      box-shadow: 0px 6px 12px rgba(109, 109, 109, 0.1);
      margin-top: 30px;
      > div {
        width: 25%;
        text-align: center;
        margin-bottom: 30px;
        img {
          width: 56px;
          height: 56px;
          margin-bottom: 10px;
        }
        > p {
          margin: 0;
          font-size: 24px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
}
</style>
<style>
.mine-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.mine-content .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.mine-content [class*='van-hairline']::after {
  content: none;
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
