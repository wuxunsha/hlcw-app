<template>
  <div class="signIn-rule">
    <van-nav-bar title="签到规则" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="signIn-rule-box">
      <p>
        1、一至三天获得自身对应等级的1倍奖励
      </p>
      <p>
        2、第四天获得自身对应等级的1.5倍奖励
      </p>
      <p>
        3、五至六天获得自身对应等级的1倍奖励
      </p>
      <p>
        4、第七天获得自身对应等级的2倍奖励
      </p>
      <p>
        5、签到天数累加计算，中间断签则重新累加
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.signIn-rule {
  background: #fff;
  min-height: calc(100vh);
  .signIn-rule-box {
    padding: 30px;
    p {
      font-size: 24px;
      line-height: 30px;
    }
  }
}
</style>
<style>
.signIn-rule .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.signIn-rule .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.signIn-rule .van-nav-bar .van-icon {
  color: #fff!important;
  font-size: 36px;
}
.signIn-rule .van-nav-bar__text {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
}
</style>

