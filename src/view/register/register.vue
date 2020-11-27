<template>
  <div class="register">
    <div class="title between">
      <div class="h2">
        注册
        <span>恒链宠物</span>
      </div>
    </div>
    <div class="input">
      <div>
        <van-field v-model="form.username" placeholder="请输入用户名" maxlength="20"/>
      </div>
      <div>
        <van-field v-model="form.phone" placeholder="请输入手机号" type="digit" maxlength="11"/>
      </div>
      <div>
        <van-field type="digit" placeholder="请输入验证码" v-model="form.captcha" maxlength="6">
          <template #button>
            <getCode :codeData="{ phone: form.phone, type: 'register' }" />
          </template>
        </van-field>
      </div>
      <div>
        <div>
          <van-field type="password" placeholder="请输入8-16位登录密码" v-model="form.password" maxlength="16"/>
        </div>
        <!-- <div>
          <i :class="
              passwordType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showPassword"></i>
        </div> -->
      </div>
      <div>
        <div>
          <van-field type="password" placeholder="再次输入登录密码" v-model="loginPwd_re" maxlength="16"/>
        </div>
        <!-- <div>
          <i :class="
              loginPwdType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showLoginPwd"></i>
        </div> -->
      </div>
      <div>
        <div>
          <van-field type="digit" placeholder="请输入交易密码" v-model="form.password2" maxlength="6" />
        </div>
        <!-- <div>
          <i :class="
              payPadType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showPayPad"></i>
        </div> -->
      </div>
      <div>
        <div>
          <van-field type="digit" placeholder="再次输入交易密码" v-model="payPwd_re" maxlength="6" />
        </div>
        <!-- <div>
          <i :class="
              payPwdReType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showPayPwdRe"></i>
        </div> -->
      </div>
      <div>
        <van-field type="digit" placeholder="请输入邀请码" v-model="form.spread" :disabled="invitation_dis" maxlength="10"/>
      </div>
    </div>
    <div class="buttom-box">
      <van-button @click="submitRegister" round type="primary" block>注册帐号</van-button>
    </div>
    <div class="info">
      <div>
        <span>已有帐号？</span>&nbsp;
        <a @click="login">立即登录</a>
      </div>
      <div>
        <!-- <a href="http://login.njmall.store/app.jpeg" target="_bank">下载APP</a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '../../api/index'
import getCode from '../../components/getCode/getCode'
export default {
  data() {
    return {
      form: {
        username: '',
        phone: '',
        captcha: '',
        password: '',
        password2: '',
        spread: ''
      },
      passwordType: 'password',
      loginPwdType: 'password',
      payPadType: 'password',
      payPwdReType: 'password',
      loginPwd_re: '',
      payPwd_re: '',
      invitation_dis: false
    }
  },
  components: {
    getCode
  },
  methods: {
    // 提交注册
    submitRegister() {
      const re = /^1\d{10}$/
      let reFlag = re.test(this.form.phone)
      if (this.form.username === '') {
        return this.$toast.fail('请输入用户名')
      } else if (this.form.phone === '') {
        return this.$toast.fail('请输入手机号')
      } else if (this.form.phone !== '' && !reFlag) {
        return this.$toast.fail('请输入正确的手机号')
      } else if (this.form.captcha === '') {
        return this.$toast.fail('请输入验证码')
      } else if (this.form.password === '') {
        return this.$toast.fail('请输入登录密码')
      } else if (
        this.form.password.length < 8 ||
        this.form.password.length > 16
      ) {
        return this.$toast.fail('请输入8-16位登录密码')
      } else if (this.loginPwd_re === '') {
        return this.$toast.fail('请再次输入登录密码')
      } else if (
        this.form.password !== '' &&
        this.loginPwd_re !== '' &&
        this.form.password !== this.loginPwd_re
      ) {
        return this.$toast.fail('两次登录密码不同，请重新输入')
      } else if (this.form.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      } else if (this.payPwd_re === '') {
        return this.$toast.fail('请再次输入交易密码')
      } else if (
        this.form.password2 !== '' &&
        this.payPwd_re !== '' &&
        this.form.password2 !== this.payPwd_re
      ) {
        return this.$toast.fail('两次交易密码不同，请重新输入')
      } else if (this.form.spread === '') {
        return this.$toast.fail('请输入邀请码')
      }
      register(this.form).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$dialog
            .alert({
              title: res.msg,
              confirmButtonText: '立即登录'
            })
            .then(() => {
              this.$router.replace({
                path: '/login'
              })
            })
        }
      })
    },
    login() {
      this.$router.replace({
        path: '/login'
      })
    },
    // 密码显示隐藏
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    showLoginPwd() {
      if (this.loginPwdType === 'password') {
        this.loginPwdType = 'text'
      } else {
        this.loginPwdType = 'password'
      }
    },
    showPayPad() {
      if (this.payPadType === 'password') {
        this.payPadType = 'text'
      } else {
        this.payPadType = 'password'
      }
    },
    showPayPwdRe() {
      if (this.payPwdReType === 'password') {
        this.payPwdReType = 'text'
      } else {
        this.payPwdReType = 'password'
      }
    }
  },
  mounted() {
    // if (this.$route.query.invitation) {
    //   this.form.invitation = this.$route.query.invitation
    //   this.invitation_dis = true
    // }
  }
}
</script>
<style scoped lang="scss">
.register {
  background: #fff;
  min-height: calc(100vh);
  padding-bottom: 40px;
  .title {
    margin: 0 30px 120px;
    padding-top: 60px;
    .h2 {
      font-size: 56px;
      font-weight: bold;
      color: #333;
      > span {
        color: rgba(52, 59, 58, 1);
        background: linear-gradient(
          -61deg,
          rgba(33, 239, 185, 1) 0%,
          rgba(85, 107, 243, 1) 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .between {
    justify-content: space-between;
    /* 09版 */
    -webkit-box-pack: space-between;
    /* 12版 */
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
  }
  .input {
    padding: 0 30px;
    > div {
      height: 80px;
      line-height: 80px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ebedf0;
    }
    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4),
    > div:nth-child(5),
    > div:nth-child(6),
    > div:nth-child(7) {
      display: flex;
      > div:nth-child(1) {
        flex: 1;
      }
      > div:nth-child(2) {
        width: 40px;
      }
    }
  }
  .buttom-box {
    margin-top: 80px;
    padding: 0 30px;
    .van-button {
      margin-top: 80px;
      margin-top: 80px;
      height: 80px;
      border: none;
      background: #4b6aeb;
      font-size: 36px;
    }
  }
  .info {
    padding: 0 30px;
    margin-top: 40px;
    display: flex;
    font-size: 28px;
    > div:nth-child(1) {
      flex: 1;
      > span {
        color: #999;
      }
      > a {
        color: #415be1;
      }
    }
    > div:nth-child(2) {
      flex: 0.6;
      text-align: right;
      > a {
        color: #415be1;
      }
    }
  }
}
</style>
<style>
.register input::-webkit-input-placeholder {
  color: rgba(235, 235, 235, 1);
  font-size: 28px;
}
.register .input .van-field__control {
  font-size: 28px;
}
.register .input .van-cell {
  height: 78px;
  line-height: 78px;
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
