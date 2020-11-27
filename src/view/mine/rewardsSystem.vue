<template>
  <div class="rewardsSystem">
    <van-nav-bar
      title="推广与升级奖励制度"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="rewardsSystem-inifo">
      <table>
        <tr>
          <th>累计投资</th>
          <th>等级</th>
          <th>一级返利</th>
          <th>二级返利</th>
          <th>三级返利</th>
          <th>升级奖励</th>
        </tr>
        <tr>
          <td>0</td>
          <td>0</td>
          <td>0.5%</td>
          <td>0.3%</td>
          <td>0.2%</td>
          <td>0</td>
        </tr>
        <tr>
          <td>100~9999</td>
          <td>VIP1</td>
          <td>1%</td>
          <td>0.5%</td>
          <td>0.3%</td>
          <td>18</td>
        </tr>
        <tr>
          <td>10000~39999</td>
          <td>VIP2</td>
          <td>1.5%</td>
          <td>1%</td>
          <td>0.5%</td>
          <td>68</td>
        </tr>
        <tr>
          <td>40000~99999</td>
          <td>VIP3</td>
          <td>2%</td>
          <td>1.5%</td>
          <td>1%</td>
          <td>168</td>
        </tr>
        <tr>
          <td>100000~199999</td>
          <td>VIP4</td>
          <td>2.5%</td>
          <td>2%</td>
          <td>1.5%</td>
          <td>388</td>
        </tr>
        <tr>
          <td>200000~399999</td>
          <td>VIP5</td>
          <td>3%</td>
          <td>2.5%</td>
          <td>2%</td>
          <td>888</td>
        </tr>
        <tr>
          <td>400000~599999</td>
          <td>VIP6</td>
          <td>3.5%</td>
          <td>3%</td>
          <td>2.5%</td>
          <td>1888</td>
        </tr>
        <tr>
          <td>600000~799999</td>
          <td>VIP7</td>
          <td>4%</td>
          <td>3.5%</td>
          <td>3%</td>
          <td>3888</td>
        </tr>
        <tr>
          <td>80万(80万以上)</td>
          <td>VIP8</td>
          <td>5%</td>
          <td>5%</td>
          <td>5%</td>
          <td>8888</td>
        </tr>
      </table>
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
.rewardsSystem {
  .rewardsSystem-inifo {
    min-height: calc(100vh - 80px);
    background: url('../../assets/image/reward.jpg') no-repeat;
    background-size: 100%, 100%;
    overflow: hidden;
    table {
      margin: 300px auto;
      border: 2px solid #fff;
      border-collapse: collapse; /*关键代码*/
      th,
      td {
        color: #fff;
        font-size: 24px;
        text-align: center;
        border: 2px solid #fff;
        padding: 10px;
      }
    }
  }
}
</style>
<style>
.rewardsSystem .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.rewardsSystem .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.rewardsSystem .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
</style>
