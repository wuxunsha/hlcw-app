<template>
  <div class="withdraw">
    <van-nav-bar title="提现" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="prompt">
      <span>您的提币操作完成后对资产所有权将转移，请谨慎操作！</span>
    </div>
    <div class="withdraw-info">
      <div class="withdrawal-amount">
        <div>
          <p>可提现金额</p>
        </div>
        <h2>¥{{ Number(userInfo.nowMoney).toFixed(2) }} RMB</h2>
      </div>
      <div class="card-number">
        <div>
          <p>提现账号</p>
          <p v-if="bankCardNumber !== ''">{{bankCardNumber}}</p>
          <p v-else class="placeholder" @click="bindBankCard">请先绑定银行卡</p>
        </div>
      </div>
      <div class="amount">
        <p>提现金额</p>
        <div>
          <van-field v-model="amount" label="¥" placeholder="请输入提现金额" type="number" maxlength="10"/>
        </div>
        <div>
          <p>
            <span>手续费</span>
            <span>{{userInfo.extractFee}}%</span>
          </p>
          <p @click="extractAll">提取全部</p>
        </div>
        <p>
          <span>提现到账</span>
          <span>{{Number(amount - amount * (userInfo.extractFee / 100)).toFixed(2)}} RMB</span>
        </p>
        <div>
          <p>温馨提示</p>
          <ul>
            <li>每笔提现金额需≥100元,预计10分钟内到账</li>
            <li>每日只能发起一次提现申请</li>
            <li>请在8:00-21:59时间段内发起提现，超出时间发起提现会在第二天及时到账</li>
          </ul>
        </div>
        <div class="submit-bottom">
          <van-button round type="info" block @click="showPopup">确 认</van-button>
        </div>
      </div>
    </div>
    <!-- 租用弹窗 -->
    <van-popup v-model="popup" round closeable lock-scroll close-on-popstate class="popup">
      <h2>申请提现</h2>
      <div class="hire-quantity">
        <p>提现金额(RMB)</p>
        <p>{{Number(amount).toFixed(2)}}</p>
      </div>
      <div class="hire-quantity">
        <p>实际到账金额(RMB)</p>
        <p>{{Number(amount - amount * (userInfo.extractFee / 100)).toFixed(2)}}</p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input :value="password2" info="密码为 6 位数字" :focused="showKeyboard" @focus="showKeyboard = true" />
        </div>
      </div>
      <div class="btn">
        <div>
          <van-button round type="info" block size="large" class="cancel" @click="popup = false">取 消</van-button>
        </div>
        <div>
          <van-button round type="info" block size="large" @click="determine">确 定</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" safe-area-inset-bottom />
  </div>
</template>

<script>
import { bankInfo, withdraw, userinfo 
} from '../../api/index'
export default {
  data() {
    return {
      // 用户信息
      userInfo: {},
      bankCardNumber: '',
      amount: '',
      popup: false,
      password2: '',
      showKeyboard: false
    }
  },
  created() {
    this.getUserInfo()
    this.getBankInfo()
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
    // 获取银行卡信息
    getBankInfo() {
      bankInfo().then(v => {
        if (v.status === 200) {
          if (v.data) {
            this.bankCardNumber = v.data.bankCode
          } else {
            this.bankCardNumber = ''
          }
        }
      })
    },
    // 跳转绑定银行卡
    bindBankCard() {
      this.$router.push({
        path: '/addBankCard'
      })
    },
    // 提取全部
    extractAll() {
      this.amount = this.userInfo.nowMoney
    },
    showPopup() {
      if (this.bankCardNumber === '') {
        return this.$toast.fail('提现账号不能为空')
      } else if (this.amount === '') {
        return this.$toast.fail('请输入提现金额')
      } else if (Number(this.amount) < 100) {
        return this.$toast.fail('提现金额不能少于100')
      }
      this.popup = true
    },
    // 确定提现
    determine() {
      const data = {
        moeny: Number(this.amount),
        password2: this.password2
      }
      withdraw(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('申请提现成功')
          this.amount = ''
          setTimeout(() => {
            this.getUserInfo()
            this.popup = false
            this.password2 = ''
          }, 1000)
        }
      })
    },
    onInput(key) {
      this.password2 = (this.password2 + key).slice(0, 6)
    },
    onDelete() {
      this.password2 = this.password2.slice(0, this.password2.length - 1)
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.withdraw {
  min-height: calc(100vh);
  background: #fff;
  .prompt {
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
    background: #eff2fd;
    > span {
      font-size: 24px;
      font-weight: 500;
      color: rgba(75, 106, 235, 1);
    }
  }
  .withdraw-info {
    padding: 30px;
    .withdrawal-amount {
      height: 160px;
      border-radius: 20px;
      background: url('../../assets/image/mine/withdrawal-amount-bg.png')
        no-repeat;
      background-size: 100% 100%;
      padding: 25px;
      > div:nth-child(1) {
        display: flex;
        > p {
          margin: 0;
          flex: 1;
          font-size: 28px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 62px;
        }
        > p:nth-child(2) {
          text-align: right;
        }
      }
      h2 {
        margin: 0;
        font-size: 44px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 115px;
      }
    }
    .card-number {
      margin-top: 20px;
      > div:nth-child(1) {
        display: flex;
        border-bottom: 2px solid #ebedf0;
        > p {
          flex: 1;
          font-size: 28px;
          font-weight: 500;
          line-height: 30px;
        }
        > p:nth-child(1) {
          color: rgba(153, 153, 153, 1);
        }
        > p:nth-child(2) {
          text-align: right;
        }
        .placeholder {
          color: rgba(153, 153, 153, 1);
        }
      }
    }
    .amount {
      margin-top: 20px;
      > p:nth-child(1) {
        font-size: 28px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      > div:nth-child(3) {
        display: flex;
        > p {
          flex: 1;
          font-size: 28px;
          font-weight: 500;
        }
        > p:nth-child(1) {
          color: rgba(153, 153, 153, 1);
        }
        > p:nth-child(2) {
          text-align: right;
          color: rgba(75, 106, 235, 1);
        }
      }
      > p:nth-child(4) {
        font-size: 28px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      > div:nth-child(5) {
        > p:nth-child(1) {
          font-size: 36px;
          font-weight: bold;
          color: red;
        }
        ul {
          li {
            list-style: inside;
            color: red;
            font-size: 26px;
            font-weight: 500;
            line-height: 48px;
          }
        }
      }
      .submit-bottom {
        margin-top: 40px;
        .van-button {
          background: #415be1;
          height: 70px;
          line-height: 70px;
          font-size: 36px;
          font-weight: 500;
        }
      }
    }
  }
  .popup {
    h2 {
      text-align: center;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      margin: 0;
      margin-bottom: 40px;
    }
    .hire-quantity {
      display: flex;
      margin-top: 20px;
      > p {
        flex: 1;
        margin: 0;
        height: 60px;
        line-height: 60px;
        color: rgba(153, 153, 153, 1);
        font-size: 28px;
      }
      > p:nth-child(2) {
        text-align: right;
      }
    }
    .password {
      margin-top: 20px;
      > p {
        margin: 0;
        height: 60px;
        line-height: 60px;
        color: rgba(153, 153, 153, 1);
        font-size: 28px;
      }
    }
    .btn {
      margin-top: 20px;
      display: flex;
      > div {
        flex: 0.9;
        .cancel {
          background: rgba(245, 245, 249, 1) !important;
          border: none;
          color: rgba(51, 51, 51, 1);
        }
        .van-button--block {
          width: 100%;
        }
      }
      > div:nth-child(1) {
        margin-right: 40px;
      }
    }
  }
}
</style>
<style>
.withdraw .van-field {
  height: 80px;
  line-height: 80px;
  border-bottom: 2px solid #ccc;
}
.withdraw .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.withdraw .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.withdraw .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.withdraw .van-popup {
  width: 70%;
  padding: 60px 40px 40px;
}
.withdraw .van-number-keyboard {
  z-index: 9999;
  padding-bottom: 0;
}
.withdraw .van-password-input {
  margin: 0;
}
.withdraw .van-password-input__security {
  height: 80px;
}
.withdraw .van-password-input__security li {
  border: 2px solid #ccc;
}
.withdraw .van-key {
  height: 60px;
  line-height: 60px;
}
.withdraw .van-field__label {
  width: 40px;
  font-size: 52px;
  font-weight: 500;
  color: rgba(58, 63, 77, 1);
}
.withdraw .van-field__control {
  font-size: 28px;
}
.withdraw .van-field {
  line-height: 70px;
  border-bottom: 2px solid #ebedf0;
}
.withdraw .van-password-input__info {
  font-size: 24px;
}
.withdraw .popup .van-button {
  height: 60px;
  line-height: 60px;
  background: #415be1;
  font-size: 28px;
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
