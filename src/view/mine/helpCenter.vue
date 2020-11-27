<template>
  <div class="helpCenter">
    <van-nav-bar
      title="帮助中心"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="helpCenter-inifo">
      <div class="helpCenter-content" @click="noviceGuide">
        <div>
          <img src="../../assets/image/mine/system.png" alt="" />
        </div>
        <div>
          <van-cell title="新手指引" is-link center></van-cell>
        </div>
      </div>
      <div class="helpCenter-content" @click="companyProfile">
        <div>
          <img src="../../assets/image/mine/system.png" alt="" />
        </div>
        <div>
          <van-cell title="公司简介" is-link center></van-cell>
        </div>
      </div>
      <div class="helpCenter-content" @click="platformIntroduction">
        <div>
          <img src="../../assets/image/mine/system.png" alt="" />
        </div>
        <div>
          <van-cell title="平台简介" is-link center></van-cell>
        </div>
      </div>
      <!-- <div class="helpCenter-content" @click="videoIntroduction">
        <div>
          <img src="../../assets/image/mine/promote.png" alt="">
        </div>
        <div>
          <van-cell title="平台简介视频" is-link center></van-cell>
        </div>
      </div> -->
      <div class="helpCenter-content" @click="modelSystem">
        <div>
          <img src="../../assets/image/mine/system.png" alt="" />
        </div>
        <div>
          <van-cell title="模式制度详情" is-link center></van-cell>
        </div>
      </div>
      <div class="helpCenter-content" @click="rewardsSystem">
        <div>
          <img src="../../assets/image/mine/promote.png" alt="" />
        </div>
        <div>
          <van-cell title="推广与升级奖励制度" is-link center></van-cell>
        </div>
      </div>
      <div class="helpCenter-content" @click="address">
        <div>
          <img src="../../assets/image/mine/phone.png" alt="" />
        </div>
        <div>
          <van-cell title="地址" is-link center></van-cell>
        </div>
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
    // 跳转视频简介
    videoIntroduction() {
      this.$router.push({
        path: '/videoIntroduction'
      })
    },
    // 新手指引
    noviceGuide() {
      this.$router.push({
        path: '/noviceGuide'
      })
    },
    // 公司简介
    companyProfile() {
      this.$router.push({
        path: '/companyProfile'
      })
    },
    // 平台简介
    platformIntroduction() {
      this.$router.push({
        path: '/platformIntroduction'
      })
    },
    // 模式与制度
    modelSystem() {
      this.$router.push({
        path: '/modelSystem'
      })
    },
    // 奖励制度
    rewardsSystem() {
      this.$router.push({
        path: '/rewardsSystem'
      })
    },
    // 地址电话
    address() {
      this.$router.push({
        path: '/address'
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
.helpCenter {
  min-height: calc(100vh);
  background: #fff;
  .helpCenter-inifo {
    padding: 20px;
    .helpCenter-content {
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
      display: flex;
      > div:nth-child(1) {
        width: 30px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: middle;
        }
      }
      > div:nth-child(2),
      > div:nth-child(3),
      > div:nth-child(4),
      > div:nth-child(5) {
        flex: 1;
        height: 80px;
        line-height: 80px;
        .van-cell {
          height: 80px;
          line-height: 80px;
        }
        .van-cell__title {
          font-size: 30px;
          font-weight: 500;
          color: rgba(52, 52, 52, 1);
        }
        .van-cell__right-icon {
          color: #666666;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
<style>
.helpCenter .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.helpCenter .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.helpCenter .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.helpCenter .custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.helpCenter .search-icon {
  font-size: 16px;
  line-height: inherit;
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
