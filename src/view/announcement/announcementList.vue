<template>
  <div class="announcement-content">
    <van-nav-bar title="公告列表" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="announcement-info">
      <van-pull-refresh v-model="isAnnouncementLoading" @refresh="onAnnouncementRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
        <van-list v-model="announcementLoading" :finished="announcementFinished" finished-text="没有更多数据了" @load="announcementOnLoad" offset="50">
          <ul>
            <li class="announcement-list" @click="detail(item.id)" v-for="item in articleList" :key="item.id">
              <h2>{{item.title}}</h2>
              <p>
                <van-icon name="underway-o" />
                <span>{{item.addTime}}</span>
              </p>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { articleList } from '../../api/index'
export default {
  data() {
    return {
      queryInfo: {
        limit: 100,
        page: 1
      },
      articleList: [],
      announcementLoading: false,
      announcementFinished: false,
      isAnnouncementLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取公告列表
    getArticleList() {
      const data = {
        limit: this.queryInfo.limit,
        page: this.queryInfo.page
      }
      articleList(data).then(v => {
        if (v.status === 200) {
          this.announcementLoading = false
          if (v.status === 200) {
            if (v.data.length === 0 || v.data.length < 100) {
              this.announcementFinished = true
            }
            if (this.queryInfo.page > 1) {
              this.articleList = [...this.articleList, ...v.data]
            } else {
              this.isAnnouncementLoading = false
              this.articleList = v.data
            }
          }
        }
      })
    },
    // 上拉加载
    announcementOnLoad() {
      // 异步更新数据
      if (this.articleList.length === 0) return
      this.announcementLoading = true
      this.queryInfo.page++
      this.getArticleList()
    },
    // 下拉刷新
    onAnnouncementRefresh() {
      this.queryInfo.page = 1
      this.articleList = []
      this.announcementFinished = false
      this.getArticleList()
    },
    // 查看公告详情
    detail(id) {
      this.$router.push({
        path: '/announcementDetail',
        query: {
          articleId: id
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
.announcement-content {
  min-height: calc(100vh);
  background: #fff;
  .announcement-info {
    padding: 30px;
    .announcement-list {
      // height: 160px;
      border-bottom: 2px solid #ebedf0;
      margin-bottom: 40px;
      padding-bottom: 30px;
      h2,
      p {
        margin: 0;
      }
      > p {
        margin-top: 20px;
        font-size: 24px;
        > span {
          font-size: 24px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
        .van-icon {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
<style>
.announcement-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.announcement-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.announcement-content .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
.van-pull-refresh {
  overflow: inherit;
}
.van-list__finished-text {
  padding: 10px 0;
  font-size: 24px;
}
.van-loading__text {
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
