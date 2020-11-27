<template>
  <div class="recharge-content">
    <van-nav-bar
      title="充值"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="recharge-box">
      <span>当前余额(RMB)：</span>
      <span>¥ {{ nowMoney }}</span>
    </div>
    <div class="recharge-info">
      <div class="recharge-amount">
        <van-field
          v-model="rechargeForm.amount"
          label="¥"
          placeholder="请输入充值金额"
          input-align="right"
          :readonly="amountFlat"
          type="digit"
          maxlength="10"
        />
      </div>
      <div class="recharge-number">
        <div
          :class="active === index ? 'active' : ''"
          v-for="(item, index) in numberList"
          :key="index"
          @click="selectNumber(index, item.value)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div class="payment-method">
      <h2>选择支付方式</h2>
      <div>
        <van-radio-group v-model="rechargeForm.payType">
          <van-cell-group>
            <div
              class="pay-type"
              v-for="item in rechargeTypeList"
              :key="item.id"
            >
              <div>
                <img
                  :src="
                    item.id === 1
                      ? require('../../assets/image/mine/zfb.png')
                      : item.id === 2
                      ? require('../../assets/image/mine/wx.png')
                      : item.id === 3
                      ? require('../../assets/image/mine/yhk.png')
                      : ''
                  "
                  alt=""
                />
              </div>
              <div>
                <van-cell
                  :title="item.rechargeName"
                  clickable
                  @click="radio = item.id"
                >
                  <template #right-icon>
                    <van-radio :name="item.id" />
                  </template>
                </van-cell>
              </div>
            </div>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div>
        <van-button round type="info" block @click="pay">下一步</van-button>
      </div>
      <div>
        <p>温馨提示</p>
        <p>1、大于500的充值订单请使用银行卡通道充值。</p>
        <p>
          2、请在8:00-21:59时间段内进行充值，超出时间充值会在第二天及时到账。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { rechargeType, feeOrUserInfo } from '../../api/index'
import { eturnFloat } from '@/libs/tool'
export default {
  data() {
    return {
      // 当前余额
      nowMoney: '',
      rechargeForm: {
        amount: null,
        payType: null
      },
      protocol: false,
      amountFlat: false,
      active: 5,
      numberList: [
        {
          label: '100000',
          value: 100000
        },
        {
          label: '50000',
          value: 50000
        },
        {
          label: '10000',
          value: 10000
        },
        {
          label: '500',
          value: 500
        },
        {
          label: '100',
          value: 100
        },
        {
          label: '自定义',
          value: '自定义'
        }
      ],
      // 充值方式
      rechargeTypeList: []
    }
  },
  created() {
    this.getFeeOrUserInfo()
    this.getRechargeType()
  },
  methods: {
    // 获取账户余额
    getFeeOrUserInfo() {
      feeOrUserInfo().then(v => {
        if (v.status === 200) {
          this.nowMoney = Number(v.data.nowMoney).toFixed(2)
        }
      })
    },
    // 获取充值方式
    getRechargeType() {
      rechargeType().then(v => {
        if (v.status === 200) {
          this.rechargeTypeList = v.data.records
          this.rechargeForm.payType = v.data.records[0].id
        }
      })
    },
    // 选择金额
    selectNumber(i, number) {
      this.active = i
      if (this.active === 5) {
        this.rechargeForm.amount = null
        this.amountFlat = false
      } else {
        this.rechargeForm.amount = number
        this.amountFlat = true
      }
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    pay() {
      console.log(this.rechargeForm.payType)
      if (this.rechargeForm.amount === '') {
        return this.$toast.fail('请输入充值金额')
      } else if (Number(this.rechargeForm.amount) < 100) {
        return this.$toast.fail('充值金额不能小于100')
      } else if(Number(this.rechargeForm.payType) !== 3 && Number(this.rechargeForm.amount) > 500) {
        return this.$toast.fail('大于500的充值订单请使用银行卡通道充值')
      }
      this.$router.push({
        path: '/rechargePayment',
        query: {
          price: this.rechargeForm.amount,
          payType: this.rechargeForm.payType
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.recharge-content {
  .recharge-box {
    display: flex;
    background: #fff;
    padding: 40px 30px;
    > span {
      flex: 1;
      line-height: 60px;
    }
    > span:nth-child(1) {
      font-size: 36px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    > span:nth-child(2) {
      text-align: right;
      font-size: 36px;
      font-weight: bold;
      color: rgba(251, 148, 19, 1);
    }
  }
  .recharge-info {
    margin-top: 20px;
    padding: 20px 30px 0;
    background: #fff;
    .recharge-amount {
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
    }
    .recharge-number {
      display: flex;
      padding: 20px 0 0;
      justify-content: space-between;
      flex-wrap: wrap;
      > div {
        width: 32%;
        height: 66px;
        line-height: 66px;
        text-align: center;
        background: rgba(239, 239, 239, 1);
        border-radius: 18px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        cursor: pointer;
      }
      .active {
        background: rgba(75, 106, 235, 1);
        color: #fff;
      }
    }
  }
  .payment-method {
    padding: 20px 30px 80px;
    margin-top: 20px;
    background: #fff;
    h2 {
      margin: 0;
      font-size: 36px;
      font-weight: bold;
      color: rgba(32, 25, 0, 1);
    }
    > div:nth-child(2) {
      margin-top: 20px;
      .pay-type {
        display: flex;
        > div:nth-child(1) {
          position: relative;
          width: 40px;
          img {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 100%;
            vertical-align: bottom;
          }
        }
        > div:nth-child(2) {
          flex: 1;
          margin-left: 20px;
        }
      }
    }
    .van-button {
      margin-top: 140px;
      height: 80px;
      border: none;
      background: #4b6aeb;
      font-size: 36px;
    }
    > div:nth-child(4) {
      margin-top: 80px;
      > p:nth-child(1) {
        color: red;
        font-size: 28px;
      }
      > p:nth-child(2) {
        line-height: 60px;
        font-size: 24px;
      }
    }
  }
}
</style>
<style>
.recharge-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.recharge-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.recharge-content .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.recharge-content .payment-method .van-cell {
  padding: 10px 0;
}
.recharge-content .van-field__label {
  font-size: 36px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}
.recharge-content .van-radio__icon {
  font-size: 30px;
}
.recharge-content .van-cell::after {
  content: none;
}
.recharge-content .van-hairline--top-bottom::after {
  border-width: 0;
}
.recharge-content .van-checkbox {
  margin-top: 10px;
}
.recharge-content .van-checkbox__icon {
  font-size: 30px;
}
.recharge-content .payment-method .van-checkbox__label {
  font-size: 24px;
}
.recharge-content .payment-method .van-cell {
  height: 78px;
  line-height: 78px;
  font-size: 28px;
  padding: 0;
}
.recharge-content .payment-method .van-radio__icon .van-icon {
  border: 2px solid #c8c9cc;
}
.recharge-content .recharge-info .recharge-amount .van-cell {
  height: 78px;
  line-height: 78px;
  font-size: 28px;
  padding: 0;
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
