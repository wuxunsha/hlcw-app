<template>
  <div class="login">
    <div class="title between">
      <div class="h2">
        登录
        <span>恒链宠物</span>
      </div>
    </div>
    <div class="input">
      <div>
        <van-field v-model="form.username" placeholder="请输入账号" maxlength="20"/>
      </div>
      <div>
        <div>
          <van-field v-model="form.password" placeholder="请输入8-16位登录密码" type="password" maxlength="16"/>
        </div>
        <!-- <div>
          <i :class="
              passwordType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showTip"></i>
        </div> -->
      </div>
    </div>
    <div class="buttom-box">
      <van-button @click="submit" round type="primary" block>登录账号</van-button>
    </div>
    <div class="registered">
      <div>
        <span @click="forgetPassword">忘记密码</span>
      </div>
      <div>
        <span>还没有平台账号？</span>&nbsp;
        <a @click="register">立即注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/index'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      passwordType: 'password'
    }
  },
  methods: {
    // 登录
    submit() {
      if (this.form.username === '' || this.form.password === '') {
        return this.$toast.fail('用户名或密码不能为空')
      } else if (
        this.form.password.length < 8 ||
        this.form.password.length > 16
      ) {
        return this.$toast.fail('请输入8-16位登录密码')
      }
      login(this.form).then(v => {
        if (v.status === 200) {
          this.$toast.success('登录成功')
          this.$store.commit('handleUserName', v.data)
          this.$store.commit('isLogin', true)
          setTimeout(() => {
            this.$router.push({
              path: '/'
            })
          }, 2000)
        } else {
          console.log(v.msg)
        }
      })
    },
    // 密码显示隐藏
    showTip() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    // 注册账号
    register() {
      this.$router.push({
        path: '/register'
      })
    },
    // 忘记密码
    forgetPassword() {
      this.$router.push({
        path: '/forgetPass'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login {
  background: #fff;
  min-height: calc(100vh);
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
    margin-top: 20px;
    padding: 0 30px;
    > div {
      height: 80px;
      line-height: 80px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ebedf0;
    }
    > div:nth-child(2) {
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
  .registered {
    display: flex;
    margin-top: 40px;
    padding: 0 30px;
    > div {
      font-size: 28px;
    }
    > div:nth-child(1) {
      flex: 0.5;
      color: #415be1;
    }
    > div:nth-child(2) {
      flex: 1;
      text-align: right;
      > span {
        color: #353535;
      }
      > a {
        color: #415be1;
      }
    }
  }
}
</style>
<style>
.login .van-field__control {
  font-size: 28px;
}
.login .van-cell {
  height: 78px;
  line-height: 78px;
  padding: 0;
}
.login input::-webkit-input-placeholder {
  color: rgba(235, 235, 235, 1);
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
