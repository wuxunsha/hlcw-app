<template>
  <div class="platformIntroduction">
    <van-nav-bar title="平台简介" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="platformIntroduction-inifo">
      <div class="machine">
        <p>恒链宠物是全球区块链科技商业化及投资公司恒链投资集团战略投资，中澳多个极客技术团队联合打造的宠物区块链实体产业通证化经济，基于IPFS技术与POC共识机制，全面切入宠物购买、配种、宠物食品用品、宠物美容、宠物医疗，铺开以区块链技术搭建宠物新经济的落地应用场景，承载着为万亿宠物市场赋予新的革命意义。</p>
        <img src="../../assets/image/home02.jpg" alt="">
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
.platformIntroduction {
  min-height: calc(100vh);
  background: #fff;
  .platformIntroduction-inifo {
    padding: 20px;
    .machine {
      > p {
        margin: 0;
        font-size: 32px;
        text-indent: 2em;
        line-height: 80px;
        margin-bottom: 40px;
      }
      img {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>
<style>
.platformIntroduction .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.platformIntroduction .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.platformIntroduction .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
</style>
