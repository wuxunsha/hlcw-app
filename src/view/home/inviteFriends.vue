<template>
  <div class="inviteFriends">
    <van-nav-bar
      title="邀请好友"
      left-arrow
      @click-left="onClickLeft"
      fixed
      right-text="保存图片"
      @click-right="onClickRight"
    />
    <div class="qsCode">
      <img :src="imageUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { qsCode } from '../../api/index'
import { Toast } from 'vant'
export default {
  data() {
    return {
      imageUrl: '',
      shareTime: true
    }
  },
  created() {
    this.getQsCode()
    this.getShare()
  },
  methods: {
    getShare() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
        overlay: true
      })
      const timer = setInterval(() => {
        qsCode().then(v => {
          if (v.status === 200) {
            if (v.data[0].wap_poster !== '') {
              Toast.clear()
              this.imageUrl = v.data[0].wap_poster
              clearInterval(timer)
            }
          }
        })
      }, 5000)
    },
    // 获取分享二维码
    getQsCode() {
      qsCode().then(v => {
        if (v.status === 200) {
          if (v.data[0].wap_poster !== '') {
            this.imageUrl = v.data[0].wap_poster
          }
        }
      })
    },
    // 保存图片
    onClickRight() {
      let _that = this
      // imgUrl 图片网络路径
      var timestamp = new Date().valueOf()
      var downLoader = plus.downloader.createDownload(
        this.imageUrl,
        {
          method: 'GET',
          filename: '_downloads/image/' + timestamp + '.png'
        },
        function(download, status) {
          if (status == 200) {
            var fileName = download.filename
            plus.gallery.save(
              fileName,
              function() {
                Toast.success('保存成功')
              },
              function() {
                Toast.fail('保存失败，请重试')
              }
            )
          } else {
            Toast.fail('下载失败，请重试')
          }
        }
      )
      downLoader.start()
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.inviteFriends {
  height: calc(100vh);
  .qsCode {
    height: 100%;
    > img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
<style>
.inviteFriends .van-nav-bar {
  height: 80px;
  background: none;
}
.inviteFriends .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.inviteFriends .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.inviteFriends .van-hairline--bottom::after {
  border-bottom-width: 0;
}
.inviteFriends .van-nav-bar__text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
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
