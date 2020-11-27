<template>
  <div class="personal-content">
    <van-nav-bar title="个人资料" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="personal-box">
      <div class="personal-title">
        <div>
          <p>头像</p>
        </div>
        <div>
          <img :src="userAvatar ? userAvatar : require('../../assets/image/mine/avatar.png')" alt="">
        </div>
      </div>
      <div class="personal-title">
        <div>
          <p>用户名</p>
        </div>
        <div>
          <p>{{userInfo.username}}</p>
        </div>
      </div>
    </div>
    <div class="personal-box-bottom">
      <div class="personal-title">
        <div>
          <p>手机号</p>
        </div>
        <div>
          <p>{{userInfo.phone}}</p>
        </div>
      </div>
      <div class="personal-title">
        <van-cell title="银行卡" is-link center @click="bankCard"></van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { userinfo } from '../../api/index'
export default {
  data() {
    return {
      userAvatar: '',
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      userinfo().then(v => {
        if (v.status === 200) {
          this.userInfo = v.data
          this.userAvatar = v.data.avatar
        }
      })
    },
    // 银行卡
    bankCard() {
      this.$router.push({
        path: '/bankCard'
      })
    },
    // 返回
    onClickLeft() {
      this.$router.push({
        path: '/mine'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.personal-content {
  // height: calc(100vh);
  // background: #fff;
  .personal-box,
  .personal-box-bottom {
    background: #fff;
    .personal-title {
      display: flex;
      padding: 10px 30px;
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
      p {
        margin: 0;
      }
      > div {
        flex: 1;
        > p {
          font-size: 32px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
      > div:nth-child(2) {
        text-align: right;
        img {
          width: 60px;
          height: 60px;
          vertical-align: middle;
          border-radius: 50%;
        }
        > p {
          font-size: 30px;
          font-weight: 500;
          color: rgba(187, 187, 187, 1);
        }
      }
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
        height: 80px;
        line-height: 80px;
      }
    }
  }
  .personal-box-bottom {
    margin-top: 20px;
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
.personal-content .custom-title {
  margin-right: 4px;
  vertical-align: middle;
}
.personal-content .search-icon {
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
