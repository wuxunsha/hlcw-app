<template>
  <div class="myMachine-content">
    <van-nav-bar title="我的矿机" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="machine">
      <ul v-if="machineList.length > 0">
        <li v-for="item in machineList" :key="item.id">
          <div>
            <img :src="item.image" alt="">
          </div>
          <div>
            <h2>{{item.productName}}</h2>
            <p>
              <span>租用单价</span>
              <span>{{Number(item.price).toFixed(2)}} HLC</span>
            </p>
            <p>
              <span>租用总价</span>
              <span>{{Number(item.payPrice).toFixed(2)}} HLC</span>
            </p>
            <p>
              <span>每天收益</span>
              <span>{{item.dailyInterest}}%</span>
            </p>
            <p>
              <span>每天可挖</span>
              <span>{{ (Number(item.payPrice)* (Number(item.dailyInterest) / 100)).toFixed(2) }} HLC</span>
            </p>
            <p>
              <span>剩余周期</span>
              <span>{{Number(item.remainder) > 0 ? item.remainder + '天' : '已到期'}}</span>
            </p>
            <p>
              <span>租用数量</span>
              <span>{{item.totalNum}}</span>
            </p>
            <p>
              <span>租用时间</span>
              <span>{{item.createTime}}</span>
            </p>
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
import { getMyMine } from '../../api/index'
export default {
  data() {
    return {
      machineList: []
    }
  },
  created() {
    this.getMyMineList()
  },
  methods: {
    // 获取我的矿机
    getMyMineList() {
      getMyMine().then(v => {
        if (v.status === 200) {
          this.machineList = v.data
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
.myMachine-content {
  .machine-info {
    position: fixed;
    top: 80px;
    height: 120px;
    background: #fff;
    width: 100%;
    box-shadow: 0 0 10px #ccc;
    > div:nth-child(1) {
      display: flex;
      width: 100%;
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
  .machine {
    padding: 0 30px;
    margin-top: 30px;
    > ul {
      > li {
        display: flex;
        background: #fff;
        border-radius: 20px;
        min-height: 220px;
        padding: 20px;
        margin-bottom: 20px;
        > div:nth-child(1) {
          flex: 0.5;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        > div:nth-child(2) {
          flex: 1;
          margin-left: 20px;
          > h2 {
            text-align: center;
            font-size: 36px;
            margin: 0;
            margin-bottom: 10px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 36px;
          }
          > p {
            display: flex;
            width: 100%;
            margin: 0;
            font-size: 28px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 46px;
            > span {
              flex: 1;
            }
            > span:nth-child(2) {
              text-align: right;
            }
          }
          > p:nth-child(8) {
            display: flex;
            width: 100%;
            margin: 0;
            font-size: 28px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 46px;
            > span:nth-child(1) {
              flex: .4;
            }
            > span:nth-child(2) {
              flex: 1;
              text-align: right;
            }
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
.myMachine-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.myMachine-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.myMachine-content .van-nav-bar .van-icon {
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
