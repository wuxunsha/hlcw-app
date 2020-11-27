<template>
  <div class="changeUsername-content">
    <van-nav-bar title="修改用户名" fixed :placeholder="true" left-arrow @click-left="onClickLeft">
      <template #right>
        <van-button type="primary" size="normal" :disabled="btnFlag">保存</van-button>
      </template>
    </van-nav-bar>
    <div class="changeUsername-box">
      <div class="changeUsername-title">
        <van-field v-model="username" placeholder="请输入用户名" @input="nicknameChange" maxlength="20"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnFlag: true,
      username: ''
    }
  },
  created() {
    if (this.$route.query.username) {
      this.username = this.$route.query.username
    }
  },
  methods: {
    nicknameChange() {
      this.btnFlag = false
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.changeUsername-content {
  height: calc(100vh);
  background: #fff;
  .changeUsername-box {
    background: #fff;
    padding: 0 30px;
    .changeUsername-title {
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
      .van-cell {
        padding: 20px 0;
        font-size: 30px;
      }
    }
  }
}
</style>
<style>
.changeUsername-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.changeUsername-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.changeUsername-content .van-nav-bar .van-nav-bar__text {
  font-size: 28px;
  color: #fff;
}
.changeUsername-content .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.changeUsername-content .van-button {
  height: 50px;
  border: none;
}
.changeUsername-content .van-button--normal {
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
