<template>
  <div class="helpCenter">
    <van-nav-bar title="视频简介" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="helpCenter-inifo">
      <video id="myVideo" class="video-js">
        <source src="../../assets/video/4531715-0dec11d93495878f952a0555cb419a0f.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    initVideo() {
      // 初始化视频方法
      let myPlayer = this.$video(myVideo, {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        // 自动播放属性,muted:静音播放
        autoplay: 'muted',
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: 'auto',
        // 设置视频播放器的显示宽度（以像素为单位）
        // 设置视频播放器的显示高度（以像素为单位）
        height: '200px'
      })
    },
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  },
  mounted() {
    this.initVideo()
  }
}
</script>
<style scoped lang="scss">
.helpCenter {
  min-height: calc(100vh);
  background: #fff;
  .helpCenter-inifo {
    padding: 20px;
    .video-js {
      width: 100%;
    }
  }
}
</style>
<style>
.helpCenter .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.helpCenter .van-nav-bar .van-nav-bar__title {
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
.helpCenter.search-icon {
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
