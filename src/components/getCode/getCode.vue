<template>
  <div>
    <a class="btn_border_them getCode" v-if="second">{{second}} 后重新获取</a>
    <a class="btn_border_them getCode" v-else @click="getCode()">获取验证码</a>
  </div>
</template>

<script>
import { getCode } from '../../api/index'
let timer
export default {
  props: ['codeData'],
  data() {
    return {
      // 倒计时
      second: null
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      const str = this.codeData.phone
      const re = /^1\d{10}$/
      let reFlag = re.test(str)
      if (str === '') {
        return this.$toast.fail('请输入手机号')
      }
      if (str !== '' && !reFlag) {
        return this.$toast.fail('请输入正确的手机号')
      }
      const data = {
        phone: this.codeData.phone,
        type: this.codeData.type
      }
      getCode(data)
        .then(res => {
          if (res.status === 200) {
            this.setGetCodeStatue()
            this.$toast.success(res.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 设置获取验证码状态
    setGetCodeStatue() {
      this.second = 60
      timer = setInterval(() => {
        if (this.second > 1) {
          --this.second
        } else {
          this.second = null
          clearInterval(timer)
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(timer)
  }
}
</script>
<style scoped lang="scss">
a {
  font-size: 24px;
}
</style>
<style>
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
