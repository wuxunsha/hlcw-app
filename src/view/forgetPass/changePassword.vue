<template>
  <div class="forgetPass">
    <van-nav-bar title="修改登录密码" left-arrow fixed :placeholder="true" @click-left="onClickLeft" />
    <div class="forgetPass_form">
      <div>
        <div>
          <van-field v-model="form.password" placeholder="请输入8-16位新登录密码" type="password" maxlength="16"/>
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
          <van-field v-model="affNewPassword" type="password" placeholder="再次输入新登录密码" maxlength="16"/>
        </div>
        <!-- <div>
          <i :class="
              affPasswordType === 'password'
                ? 'iconfont iconyanjing_xianshi_o'
                : 'iconfont iconyanjing_yincang_o'
            " @click="showAffPassword"></i>
        </div> -->
      </div>
      <div>
        <van-field v-model="form.captcha" placeholder="请输入验证码" type="digit" maxlength="6">
          <template #button>
            <usernameCode :codeData="{ username: form.username, type: 'updatepwdone' }" />
          </template>
        </van-field>
      </div>
      <van-button @click="confirm" round type="primary">确认重置</van-button>
    </div>
  </div>
</template>

<script>
import { retrievePassword } from '../../api/index'
import usernameCode from '../../components/getCode/usernameCode'
export default {
  data() {
    return {
      form: {
        captcha: '',
        password: '',
        username: ''
      },
      affNewPassword: '',
      passwordType: 'password',
      affPasswordType: 'password'
    }
  },
  components: {
    usernameCode
  },
  methods: {
    // 确认重置
    confirm() {
      if (this.form.password === '') {
        return this.$toast.fail('请输入8-16位新登录密码')
      } else if (
        this.form.password.length < 8 ||
        this.form.password.length > 16
      ) {
        return this.$toast.fail('请输入8-16位新登录密码')
      } else if (this.affNewPassword === '') {
        return this.$toast.fail('请再次输入登录密码')
      } else if (
        this.form.password !== '' &&
        this.affNewPassword !== '' &&
        this.form.password !== this.affNewPassword
      ) {
        return this.$toast.fail('两次新登录密码不同，请重新输入')
      } else if (this.form.captcha === '') {
        return this.$toast.fail('请输入验证码')
      }
      retrievePassword(this.form).then(res => {
        if (res.status === 200) {
          this.$toast.success('修改成功')
          this.$store.commit('LoginOut')
          setTimeout(() => {
            this.$router.push({
              path: '/login'
            })
          }, 2000)
        }
      })
    },
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    showAffPassword() {
      if (this.affPasswordType === 'password') {
        this.affPasswordType = 'text'
      } else {
        this.affPasswordType = 'password'
      }
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  },
  created() {
    if (this.$store.state.userInfo) {
      this.form.username = this.$store.state.userInfo.user.username
    }
  }
}
</script>
<style scoped lang="scss">
.forgetPass {
  background: #fff;
  min-height: calc(100vh);
  .forgetPass_form {
    margin-top: 20px;
    padding: 0 30px;
    > div {
      display: flex;
      height: 80px;
      line-height: 80px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ebedf0;
      > div:nth-child(1) {
        flex: 1;
      }
      > div:nth-child(2) {
        width: 40px;
      }
    }
  }
  .van-button {
    margin-top: 80px;
    line-height: 80px;
    height: 80px;
    border: none;
    background: #4b6aeb;
    display: block;
    width: 100%;
    font-size: 36px;
  }
}
</style>
<style>
.forgetPass .van-nav-bar {
  height: 80px;
  line-height: 80px;
  background: #415be1;
}
.forgetPass .van-nav-bar .van-icon {
  color: #fff !important;
  font-size: 36px;
}
.forgetPass .van-nav-bar .van-nav-bar__title {
  color: #fff;
  font-size: 32px;
}
input::-webkit-input-placeholder {
  color: rgba(235, 235, 235, 1);
  font-size: 28px;
}
.forgetPass .van-field__control {
  font-size: 28px;
}
.forgetPass .van-cell {
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
