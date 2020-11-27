<template>
  <div class="personal-content">
    <van-nav-bar title="账号与安全" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="personal-box">
      <div class="personal-title">
        <van-cell title="修改登录密码" is-link center @click="changePassword"></van-cell>
      </div>
      <div class="personal-title">
        <van-cell title="修改交易密码" is-link center @click="modifyTransactionPass"></van-cell>
      </div>
      <!-- <div class="personal-title">
        <van-cell title="找回交易密码" is-link center @click="retrieveTransactionPass"></van-cell>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 修改登录密码
    changePassword() {
      this.$router.push({
        path: '/changePassword'
      })
    },
    // 找回交易密码
    retrieveTransactionPass() {
      this.$router.push({
        path: '/retrieveTransactionPass'
      })
    },
    // 修改交易密码
    modifyTransactionPass() {
      this.$router.push({
        path: '/modifyTransactionPass'
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
.personal-content {
  min-height: calc(100vh);
  background: #fff;
  .personal-box {
    background: #fff;
    .personal-title {
      display: flex;
      padding: 0 20px;
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
      .van-cell__title {
        font-size: 32px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .van-cell__right-icon {
        font-size: 28px;
        font-weight: 500;
        color: rgba(187, 187, 187, 1);
      }
      .van-cell {
        padding: 0;
      }
    }
  }
}
</style>
<style>
.personal-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.personal-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.personal-content .van-nav-bar .van-icon {
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
