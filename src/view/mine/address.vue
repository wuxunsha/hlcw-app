<template>
  <div class="address">
    <van-nav-bar
      title="地址"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="address-inifo">
      <div class="machine">
        <img src="../../assets/image/addres.png" alt="" />
        <!-- <p>
          <span>联系电话：</span>
          <span>852+92274532</span>
        </p> -->
      </div>
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
.address {
  min-height: calc(100vh);
  background: #fff;
  .address-inifo {
    padding: 30px;
    .machine {
      img {
        width: 100%;
      }
      > p {
        margin: 0;
        font-size: 36px;
        line-height: 60px;
        margin-top: 20px;
      }
      > p:nth-child(2) {
        color: #415be1;
      }
    }
  }
}
</style>
<style>
.address .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.address .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.address .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
</style>
