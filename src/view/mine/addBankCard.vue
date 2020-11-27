<template>
  <div class="addBankCard-content">
    <van-nav-bar title="添加银行卡" fixed :placeholder="true" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="bankCard-box">
      <div class="bankCard-field">
        <van-field v-model="form.name" label="账户姓名" placeholder="请输入账户姓名" maxlength="20"/>
      </div>
      <div class="bankCard-field">
        <van-field v-model="form.bankCode" label="银行卡号" placeholder="请输入银行卡号" type="digit" @blur="cardNumberVerification" maxlength="20"/>
      </div>
      <div class="bankCard-field">
        <van-field v-model="form.bankName" label="银行名称" :readonly="bankNameFlag" placeholder="请输入银行名称" />
      </div>
      <div class="bankCard-field">
        <van-field v-model="form.address" label="开户行" placeholder="请输入开户行"/>
      </div>
      <div class="add-btn">
        <van-button round type="info" block @click="addSubmit">确定绑定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addBank } from '../../api/index'
var BIN = require('bankcardinfo')
export default {
  data() {
    return {
      form: {
        name: '',
        bankCode: '',
        bankName: '',
        address: ''
      },
      bankCardFlag: false,
      bankNameFlag: false
    }
  },
  methods: {
    // 确定添加
    addSubmit() {
      if (this.form.name === '') {
        return this.$toast.fail('请输入账户姓名')
      } else if (this.form.bankCode === '') {
        return this.$toast.fail('请输入15到19位银行卡号')
      } else if (!this.bankCardFlag) {
        return this.$toast.fail('请输入正确的银行卡号')
      } else if (this.form.bankName === '') {
        return this.$toast.fail('请输入银行名称')
      } else if (this.form.address === '') {
        return this.$toast.fail('请输入开户行')
      }
      addBank(this.form).then(v => {
        if (v.status === 200) {
          this.$toast({
            message: '绑定成功',
            icon: 'success',
            forbidClick: true,
            overlay: true
          })
          setTimeout(() => {
            this.$router.push({
              path: '/bankCard'
            })
          }, 1000)
        }
      })
    },
    // 银行卡号校验
    cardNumberVerification() {
      if (this.form.bankCode !== '') {
        BIN.getBankBin(this.form.bankCode)
          .then(data => {
            if (data.bankName) {
              this.form.bankName = data.bankName
              this.bankCardFlag = true
              this.bankNameFlag = true
            } else {
              this.bankNameFlag = false
            }
          })
          .catch(() => {
            this.form.bankName = ''
            this.bankCardFlag = false
            this.bankNameFlag = false
          })
      } else {
        this.form.bankName = ''
      }
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  },
  created() {}
}
</script>
<style scoped lang="scss">
.addBankCard-content {
  min-height: calc(100vh);
  background: #fff;
  .bankCard-box {
    background: #fff;
    padding: 30px;
    .add-btn {
      padding: 20px;
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
.addBankCard-content .bankCard-field .van-field__label {
  width: 160px;
}
.addBankCard-content .bankCard-field .van-cell {
  font-size: 28px;
  font-weight: 500;
  color: rgba(135, 135, 135, 1);
  border-bottom: 2px solid #ebedf0;
  padding: 30px 0;
}
.addBankCard-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.addBankCard-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.addBankCard-content .van-nav-bar .van-icon {
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
