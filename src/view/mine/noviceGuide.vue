<template>
  <div class="modelSystem">
    <van-nav-bar title="新手指引" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="modelSystem-inifo">
      <div class="machine">
        <h4>一、注册及下载</h4>
        <p>注册需要联系推荐人获取注册邀请码，按照注册流程填写相关资料即可完成注册，然后点击下载APP即可。</p>
      </div>
      <div class="pet">
        <h4>二、个人资料完善</h4>
        <p>注册完成后进入APP在我的操作页面点击头像右侧的个人信息进行完善，绑定好账户的收款银行卡。</p>
      </div>
      <div class="pet">
        <h4>三、快速充值</h4>
        <p>点击充值输入金额，按照流程完成转账，完成转账后点击我已充值即可快速到账（注：输入的金额需要和转账金额一致、转账时在备注或者附言一栏填写平台用户名，如转账金额和输入金额不一致或者忘备注用户名影响了到账时间请联系客服及时处理）。每次充值一定要提交最新的充值订单，联系客服获取公司最新收款账户。</p>
      </div>
      <div class="pet">
        <h4>四、快速提现</h4>
        <p>在我的界面点击发起提现，输入提现金额及交易密码即可，如遇提现高峰期提现会在10分钟之内到账，请留意您的收款账户。（注：每日仅限提现一次，最低金额100RMB，提现手续费为1%，为防止利用平台进行违法操作，新充值的金额必须进行认购后才可提现，没有认购进行强制提现的，平台将强制扣除50%的提现手续费）</p>
      </div>
      <div class="pet">
        <h4>五、在线客服</h4>
        <p>客服在线时间8：00-22：00，充值提现时间同步。</p>
      </div>
      <div class="pet">
        <h4>六、抽奖分配</h4>
        <p>VIP0：0次，VIP1、2：1次，VIP3、4：2次，VIP5、6：3次，VIP7：4次，VIP8：5次。</p>
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
