<template>
  <div class="petDetail">
    <van-nav-bar title="公告详情" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="pet-detail">
      <h2>{{ articleDetailDate.title }}</h2>
      <div>
        <van-icon name="underway-o" />
        <span>{{ articleDetailDate.addTime }}</span>
      </div>
      <div v-html="articleDetailDate.content"></div>
    </div>
  </div>
</template>

<script>
import { articleDetails } from '../../api/index'
export default {
  data() {
    return {
      articleDetailDate: {}
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    // 获取公告详情
    getArticleDetail() {
      articleDetails(this.$route.query.articleId).then(v => {
        if (v.status === 200) {
          this.articleDetailDate = v.data
        }
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
.petDetail {
  min-height: calc(100vh);
  background: #fff;
  .pet-detail {
    padding: 30px;
    background: #fff;
    h2 {
      font-size: 36px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 50px;
      margin: 0;
      text-align: center;
    }
    > div:nth-child(2) {
      margin-top: 20px;
      .van-icon {
        font-size: 24px;
        color: #999;
        vertical-align: middle;
      }
      > span {
        font-size: 24px;
        color: #999;
      }
    }
    > div:nth-child(3) {
      p {
        font-size: 28px;
        font-weight: 500;
        color: #656565;
        line-height: 48px;
      }
      /deep/ img {
        width: 100%;
      }
    }
  }
}
</style>
<style>
.petDetail .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.petDetail .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.petDetail .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
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
.pet-detail >div:nth-child(3) p img {
  width: 100%;
}
</style>
