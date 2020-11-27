<template>
  <div class="pet-content">
    <van-nav-bar title="我的宠物" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="pet">
      <ul v-if="petsList.length > 0">
        <li v-for="item in petsList" :key="item.id">
          <div class="pet-image">
            <img :src="item.image" alt="">
          </div>
          <div>
            <h2>{{item.productName}}</h2>
          </div>
          <div>
            <van-tag round type="success">{{item.storeInfo}}</van-tag>
          </div>
          <div>
            <p>买入价格</p>
            <p>{{Number(item.price).toFixed(2)}}RMB</p>
          </div>
          <div>
            <p>买入总价</p>
            <p>{{Number(item.payPrice).toFixed(2)}}RMB</p>
          </div>
          <div>
            <p>每天收益</p>
            <p>{{item.dailyInterest}}%</p>
          </div>
          <div>
            <p>剩余周期</p>
            <p>{{Number(item.remainder) > 0 ? item.remainder + '天' : '已到期'}}</p>
          </div>
          <div>
            <p>抢购数量</p>
            <p>{{item.totalNum}}</p>
          </div>
          <div>
            <p>抢购时间</p>
            <p>{{item.createTime}}</p>
          </div>
        </li>
      </ul>
      <div v-else class="no-data">
        <p>没有更多数据了</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyPets } from '../../api/index'
export default {
  data() {
    return {
      petsList: []
    }
  },
  created() {
    this.getMyPetsList()
  },
  methods: {
    // 我的宠物
    getMyPetsList() {
      getMyPets().then(v => {
        if (v.status === 200) {
          this.petsList = v.data
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
.pet-content {
  .user-info {
    position: fixed;
    top: 80px;
    width: 100%;
    box-shadow: 0 0 10px #ebedf0;
    > div:nth-child(1) {
      display: flex;
      height: 120px;
      background: #fff;

      > div {
        flex: 1;
        text-align: center;
        > p:nth-child(1) {
          font-size: 30px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
        > p:nth-child(2) {
          font-size: 30px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
      }
    }
  }
  .pet {
    padding: 0 30px;
    margin-top: 30px;
    > ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      > li {
        width: 49%;
        background: #fff;
        margin-bottom: 20px;
        min-height: 600px;
        border-radius: 20px;
        overflow: hidden;
        .pet-image {
          width: 100%;
          height: 340px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        > div:nth-child(2) {
          margin-top: 20px;
          padding: 0 20px;
          >h2 {
            text-align: center;
            margin: 0;
          }
        }
        > div:nth-child(3) {
          margin-top: 20px;
          padding: 0 20px;
          .van-tag {
            font-size: 24px;
            padding: 20px;
          }
        }
        > div:nth-child(4),
        > div:nth-child(5),
        > div:nth-child(6),
        > div:nth-child(7),
        > div:nth-child(8) {
          display: flex;
          padding: 0 20px;
          > p {
            flex: 1;
            font-size: 24px;
            line-height: 60px;
            margin: 0;
          }
          > p:nth-child(1) {
            color: rgba(153, 153, 153, 1);
          }
          > p:nth-child(2) {
            text-align: right;
          }
        }
        > div:nth-child(9) {
          display: flex;
          padding: 0 20px;
          > p {
            font-size: 24px;
            line-height: 2px;
            margin: 0;
          }
          > p:nth-child(1) {
            flex: 0.6;
            line-height: 60px;
            color: rgba(153, 153, 153, 1);
          }
          > p:nth-child(2) {
            flex: 1;
            line-height: 60px;
            text-align: right;
          }
        }
      }
    }
    .no-data {
      width: 100%;
      text-align: center;
      > p {
        font-size: 26px;
      }
    }
  }
}
</style>
<style>
.pet-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.pet-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.pet-content .van-nav-bar .van-icon {
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
</style>
