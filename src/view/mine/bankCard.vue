<template>
  <div class="bankCard-content">
    <van-nav-bar title="银行卡" fixed :placeholder="true" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="bankCard-box">
      <template v-if="bankData">
        <div class="bankCard-title">
          <div>
            <h2>我的卡</h2>
          </div>
        </div>
        <div class="bankCard-info">
          <div class="bankCard-logo">
            <div>
              <img src="../../assets/image/mine/yhk.png" alt="" />
            </div>
            <div v-if="bankData">
              <h2>{{bankData.bankName}}</h2>
            </div>
          </div>
          <div v-if="bankData">
            <p>{{bankData.bankCode.substring(0,4)}}</p>
            <p>{{bankData.bankCode.substring(4,8)}}</p>
            <p>{{bankData.bankCode.substring(8,12)}}</p>
            <p>{{bankData.bankCode.substring(12,16)}}</p>
          </div>
        </div>
        <div class="prompt">
          <p>温馨提示</p>
          <p>
            <span>*</span>
            <span>每个账户只能绑定一张银行卡。</span>
          </p>
          <p>
            <span>*</span>
            <span>如需修改银行卡信息，请联系客服修改。</span>
          </p>
        </div>
      </template>
      <div class="add-btn" v-else>
        <van-button round type="info" block @click="addBankCard">绑定银行卡</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { bankInfo } from '../../api/index'
export default {
  data() {
    return {
      bankData: null
    }
  },
  created() {
    this.getBankInfo()
  },
  methods: {
    // 获取银行卡信息
    getBankInfo() {
      bankInfo().then(v => {
        if (v.status === 200) {
          this.bankData = v.data
        }
      })
    },
    // 添加银行卡
    addBankCard() {
      this.$router.push({
        path: '/addBankCard'
      })
    },
    // 返回
    onClickLeft() {
      this.$router.push({
        path: '/personalInformation'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.bankCard-content {
  min-height: calc(100vh);
  background: #fff;
  .bankCard-box {
    background: #fff;
    padding: 30px;
    .bankCard-title {
      display: flex;
      height: 80px;
      line-height: 80px;
      > div {
        flex: 1;
      }
      > div:nth-child(1) {
        h2 {
          margin: 0;
          font-size: 34px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
        }
      }
      > div:nth-child(2) {
        text-align: right;
        > span {
          padding: 8px 20px;
          border: 2px solid #4b6aeb;
          border-radius: 22px;
          font-size: 28px;
          font-weight: 500;
          color: rgba(75, 106, 235, 1);
        }
      }
    }
    .bankCard-info {
      margin: 20px 0 40px;
      padding: 20px 34px;
      height: 200px;
      background: url('../../assets/image/mine/bankCard-bg.png') no-repeat;
      background-size: 100% 100%;
      opacity: 1;
      border-radius: 20px;
      .bankCard-logo {
        display: flex;
        > div:nth-child(1) {
          width: 100px;
          img {
            width: 80px;
            height: 80px;
          }
        }
        > div:nth-child(2) {
          flex: 1;
          > h2 {
            margin: 0;
            font-size: 40px;
            font-weight: 400;
            line-height: 80px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      > div:nth-child(2) {
        display: flex;
        margin-top: 20px;
        > p {
          flex: 1;
          margin: 0;
          margin-top: 10px;
          text-align: center;
          font-size: 36px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .prompt {
      > p {
        font-size: 26px;
      }
      > p:nth-child(1) {
        color: red;
      }
      > p:nth-child(2),
      > p:nth-child(3) {
        > span {
          color: red;
        }
      }
    }
    .add-btn {
      padding: 30px;
      .van-button {
        margin-top: 80px;
        height: 80px;
        border: none;
        background: #4b6aeb;
      }
      .van-button__text {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 80px;
      }
    }
  }
}
</style>
<style>
.bankCard-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.bankCard-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.bankCard-content .van-nav-bar .van-icon {
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
</style>
