<template>
  <div class="rechargePay">
    <van-nav-bar
      title="充值支付"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="qr-code" v-if="payType == '1' || payType == '2'">
      <div class="code-box">
        <img :src="qeCodeUrl" alt="" />
      </div>
    </div>
    <div v-else class="bank-card">
      <p @click="customerServicePath">点击联系客服索要充值账户信息！</p>
    </div>
    <div class="prompt">
      <p>温馨提示</p>
      <p>
        <span>*</span>
        <span>充值时，请备注用户名</span>
      </p>
      <p>
        <span>*</span>
        <span>实际充值金额与选择金额不同，会影响充值金额到账时间</span>
      </p>
      <p>
        <span>*</span>
        <span>转账完成后，点击我已充值即可</span>
      </p>
    </div>
    <div class="recharge-button">
      <van-button round type="info" block @click="recharged"
        >我已充值</van-button
      >
    </div>
  </div>
</template>

<script>
import { rechargeQcode, addRecharge } from '../../api/index'
export default {
  data() {
    return {
      payType: this.$route.query.payType,
      price: this.$route.query.price,
      qeCodeUrl: '',
      customerService: ''
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.customerService = this.$store.state.userInfo.customerService
    }
    this.getRechargeInfo()
  },
  methods: {
    // 获取充值信息
    getRechargeInfo() {
      rechargeQcode({ id: this.payType }).then(v => {
        if (v.status === 200) {
          this.qeCodeUrl = v.data.rechargeUrl
        }
      })
    },
    // 联系客服
    customerServicePath() {
      location.href = this.customerService
    },
    // 点击已充值按钮
    recharged() {
      const data = {
        price: Number(this.price),
        rechargeType: this.payType
      }
      addRecharge(data).then(v => {
        if (v.status === 200) {
          this.$toast.success(v.data)
          setTimeout(() => {
            this.$router.push({
              path: '/recharge'
            })
          }, 1000)
        }
      })
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.rechargePay {
  min-height: calc(100vh);
  background: #fff;
  .qr-code {
    width: 100%;
    .code-box {
      position: relative;
      width: 365px;
      height: 365px;
      background: #415de1;
      margin: 60px auto;
      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        height: 90%;
      }
    }
  }
  .bank-card {
    width: 100%;
    > p {
      text-align: center;
      line-height: 60px;
      font-size: 36px;
      color: #415be1;
    }
  }
  .prompt {
    padding: 0 30px;
    margin-top: 100px;
    > p {
      font-size: 26px;
    }
    > p:nth-child(1) {
      color: red;
    }
    > p:nth-child(2),
    > p:nth-child(3),
    > p:nth-child(4) {
      > span {
        color: red;
      }
    }
  }
  .recharge-button {
    padding: 0 30px;
    .van-button {
      margin-top: 80px;
      height: 80px;
      border: none;
      background: #4b6aeb;
    }
    .van-button__text {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 80px;
      height: 80px;
    }
  }
}
</style>
<style>
.rechargePay .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.rechargePay .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.rechargePay .van-icon {
  color: #fff !important;
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
