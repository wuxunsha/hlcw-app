<template>
  <div class="modelSystem">
    <van-nav-bar title="模式与制度" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="modelSystem-inifo">
      <div class="machine">
        <h4>一、恒链专业矿机介绍</h4>
        <p>1.入门矿机：租金100枚HLC，算力3%，租期45天，单台总产量135枚HLC，每人限购1台。</p>
        <p>2.恒链①号矿机：租金500枚HLC，算力3%，租期45天，单台总产量675枚HLC，每人限购2台。</p>
        <p>3.恒链②号矿机：租金1000枚HLC，算力3%，租期45天，单台总产量1350枚HLC，每人限购2台。</p>
        <p>4.恒链③号矿机：租金2000枚HLC，算力3%，租期45天，单台总产量2700枚HLC，每人限购4台。</p>
        <p>5.恒链④号矿机：租金10000枚HLC，算力3%，租期45天，单台总产量13500枚HLC，每人限购4台。</p>
        <p>6.恒链⑤号矿机：租金20000枚HLC，算力3%，租期45天，单台总产量27000枚HLC，每人限购5台。</p>
        <p>全球公开透明发行总量2800万枚通证HLC，永不增发，数量有限，具有巨大的升值空间，HLC价格达到500/枚也是合理的价格。</p>
        <p>恒链宠物是真正实现实体支撑的平台，由中澳及多个资深技术团队打造，优秀的制度，门槛低，交易市场自由交易，随时变现，人人平等，真正实现全民挖矿。</p>
      </div>
      <div class="pet">
        <h4>二、恒链精品宠物介绍</h4>
        <p>1.新人专享：奶茶仓鼠，价值100RMB，抢购时间00:00—23:59，合约收益2.3%/天，合约周期1个自然日，每用户限购1只。</p>
        <p>2.温和：拉布拉多，价值2000RMB，抢购时间00:00—23:59，合约收益1.8%/天，合约周期7个自然日，每用户限购5只。</p>
        <p>3.生活：伯曼猫，价值20000RMB，抢购时间00:00—23:59，合约收益2.0%/天，合约周期30个自然日，每用户限购10只。</p>
        <p>4.无畏：德国宾莎犬，价值40000RMB，抢购时间00:00—23:59，合约收益2.2%/天，合约周期60个自然日，每用户限购10只。</p>
        <p>5.权力：藏獒，价值60000RMB，抢购时间00:00—23:59，合约收益2.3%/天，合约周期90个自然日，每用户限购10只。</p>
        <p>6.吉祥：米切氏凤头鹦鹉，价值100000RMB，抢购时间00:00—23:59，合约收益2.5%/天，合约周期180个自然日，每用户限购10只。</p>
        <p>合约到期退还本金，并且新上线前90天是平台福利期间，豪送6亿现金，所有宠物利润+1%，更有签到奖励、升级奖励、幸运大抽奖等现金发放环节，海量新宠随时上线，丰富的任务内容赋予亿万宠物爱好者全新的体验。</p>
      </div>
      <div class="welcome">
        <p>恒链宠物，期待您的加入！</p>
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
.modelSystem {
  min-height: calc(100vh);
  background: #fff;
  .modelSystem-inifo {
    padding: 20px;
    .machine,
    .pet {
      > h4 {
        margin: 0;
        padding: 0;
        margin-bottom: 20px;
        font-size: 32px;
      }
      > p {
        margin: 0;
        font-size: 28px;
        text-indent: 2em;
        line-height: 46px;
      }
    }
    .pet {
      margin-top: 40px;
    }
    .welcome {
      > p {
        text-align: center;
        font-size: 32px;
        color: green;
      }
    }
  }
}
</style>
<style>
.modelSystem .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.modelSystem .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.modelSystem .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.modelSystem .custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.modelSystem.search-icon {
  font-size: 16px;
  line-height: inherit;
}
</style>
