<template>
  <div id="app">
    <router-view />
    <div v-show="showVersionDialog" class="dialog">
      <div class="active-title">
        <p class="server-version">
          <span>最新版本：</span>
          <span> V {{ serverVersion }}</span>
        </p>
        <div class="commit">
          <van-button type="info" @click="upgrade" size="large"
            >立即更新</van-button
          >
        </div>
      </div>
    </div>

    <div class="apptip-dialog" v-show="openSimple">
      <van-dialog
        title=""
        width="80%"
        class="apptip"
        v-model="openSimple"
        :showConfirmButton="false"
      >
        <div class="progress">已下载{{ percent }}%</div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { getAppVersion } from './api/index'
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right',
      boot: true,
      time: null,
      serverVersion: '',
      showVersionDialog: false,
      iosDownloadUrl: '',
      androidDownloadUrl: '',
      userAgent: 'android',
      textList: '',
      percent: '',
      openSimple: false
    }
  },
  created() {
    this.updata()
  },
  methods: {
    updata() {
      const key = new Date().getTime()
      let _this = this
      axios.get('http://qiniuyun.dsgawdj.cn/getversion.html?' + key).then(res => {
        if (res.status === 200) {
          // 服务器返回版本号和下载地址
          _this.serverVersion = res.data.appVersion
          _this.androidDownloadUrl = res.data.appAndroidDownload
          _this.iosDownloadUrl = res.data.appIosDownload
          _this.userAgent = navigator.userAgent.toLowerCase()
          plus.runtime.getProperty(plus.runtime.appid, function(inf) {
            let appVersion = inf.version
            if (appVersion == _this.serverVersion) {
              return
            } else {
              _this.showVersionDialog = true
              // location.href = _this.androidDownloadUrl
            }
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 确认
    upgrade() {
      this.showVersionDialog = false
      let wgtWaiting = null
      let _this = this
      if (/iphone|ipad|ipod/.test(_this.userAgent)) {
        document.location.href = _this.iosDownloadUrl
        // var dtask = plus.downloader.createDownload(
        //   _this.iosDownloadUrl,
        //   {},
        //   function(d, status) {
        //     if (status === 200) {
        //       var path = d.filename
        //       _this.installApp(path)
        //     } else {
        //       plus.nativeUI.alert('版本更新失败:' + status)
        //     }
        //   }
        // )
        // dtask.addEventListener('statechanged', function(download, status) {
        //   switch (download.state) {
        //     case 2:
        //       break
        //     case 3:
        //       var percent = (download.downloadedSize / download.totalSize) * 100
        //       _this.percent = parseInt(percent)
        //       _this.openSimple = true
        //       break
        //     case 4:
        //       _this.openSimple = false
        //       break
        //   }
        // })
        // dtask.start()
      } else if (/android/.test(_this.userAgent)) {
        var dtask = plus.downloader.createDownload(
          _this.androidDownloadUrl,
          {},
          function(d, status) {
            if (status === 200) {
              var path = d.filename
              _this.installApp(path)
            } else {
              plus.nativeUI.alert('版本更新失败:' + status)
            }
          }
        )
        dtask.addEventListener('statechanged', function(download, status) {
          switch (download.state) {
            case 2:
              break
            case 3:
              var percent = (download.downloadedSize / download.totalSize) * 100
              _this.percent = parseInt(percent)
              _this.openSimple = true
              break
            case 4:
              _this.openSimple = false
              break
          }
        })
        dtask.start()
      }
    },
    // 安装app
    installApp(wgtpath) {
      plus.runtime.install(
        wgtpath,
        {},
        function(wgtinfo) {
          plus.runtime.quit()
        },
        function(error) {
          plus.nativeUI.alert(
            '应用更新失败！\n' + error.message,
            function() {},
            '提示',
            '确定'
          )
        }
      )
    },
    // 取消
    closeVersionDialog() {
      this.showVersionDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  .dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    .active-title {
      position: relative;
      left: 0;
      top: 30%;
      width: 90%;
      margin: 0 auto;
      background: #fff;
      padding: 20px 0;
      .server-version {
        height: 60px;
        line-height: 60px;
        width: 100%;
        text-align: center;
        font-size: 32px;
        > span:nth-child(1) {
          color: blue;
        }
        > span:nth-child(2) {
          color: red;
        }
      }
      .commit {
        text-align: center;
        padding: 0 60px;
        .van-button__text {
          font-size: 28px;
        }
      }
    }
  }
  .apptip-dialog {
    height: 160px;
    background: #fff;
    .progress {
      height: 160px;
      text-align: center;
      line-height: 160px;
      color: #000;
      font-size: 32px;
    }
    /deep/ .van-button__text {
      font-size: 28px;
    }
  }
}
</style>
<style>
.van-toast {
  width: 16% !important;
}
</style>
