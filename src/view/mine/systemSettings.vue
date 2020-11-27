<template>
  <div class="personal-content">
    <van-nav-bar title="系统设置" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="personal-box">
      <div class="personal-title">
        <van-cell title="账号与安全" is-link center @click="accountSecurity"></van-cell>
      </div>
      <div class="personal-box">
        <!-- <van-cell title="版本号" is-link center></van-cell> -->
        <div>
          <span>版本号</span>
        </div>
        <div>
          <span>{{versionNumber}}</span>
        </div>
      </div>
      <div class="dropOut-btm">
        <van-button round type="info" block @click="signOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, getAppVersion } from '../../api/index'
import axios from 'axios'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      // 版本号
      versionNumber: ''
    }
  },
  created() {
    this.getAppVersionData()
  },
  methods: {
    getAppVersionData() {
      const key = new Date().getTime()
      axios.get('http://qiniuyun.dsgawdj.cn/getversion.html?' + key).then(v => {
        if (v.status === 200) {
          this.versionNumber = v.data.appVersion
        }
      })
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    },
    accountSecurity() {
      this.$router.push({
        path: '/accountSecurity'
      })
    },
    // 退出登录
    signOut() {
      Dialog.confirm({
        message: '是否确定退出登录!',
        width: '300',
        lockScroll: true
      })
        .then(() => {
          logout().then(v => {
            if (v.status === 200) {
              this.$store.commit('LoginOut')
              setTimeout(() => {
                this.$router.replace({
                  path: '/login'
                })
              }, 1000)
            }
          })
        })
        .catch(() => {
          // on cancel
        })
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
    .personal-box {
      display: flex;
      padding: 0 20px;
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #ebedf0;
      > div {
        flex: 1;
      }
      > div:nth-child(1) {
        font-size: 32px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      > div:nth-child(2) {
        text-align: right;
        font-size: 28px;
        font-weight: 500;
        color: rgba(187, 187, 187, 1);
      }
    }
    .dropOut-btm {
      padding: 20px;
      margin-top: 80px;
      .van-button {
        background: #415be1;
        height: 80px;
        font-size: 40px;
        font-weight: 500;
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
.van-dialog__message {
  padding: 60px 0;
  font-size: 36px !important;
}
.van-dialog__footer {
  padding: 20px 0;
}
.van-button__text {
  font-size: 32px;
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
