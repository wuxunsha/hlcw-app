<template>
  <div class="pet-content">
    <van-nav-bar title="宠物" fixed :placeholder="true" />
    <div class="pet">
      <ul v-if="petList.length > 0">
        <li v-for="item in petList" :key="item.id">
          <div class="pet-image">
            <img :src="item.image" alt="" />
          </div>
          <div>
            <van-cell :title="item.storeName">
              <template #right-icon>
                <van-tag round type="success">{{ item.storeInfo }}</van-tag>
              </template>
            </van-cell>
          </div>
          <div>
            <p>价格</p>
            <p>{{ Number(item.price).toFixed(2) }} RMB</p>
          </div>
          <div>
            <p>每天收益</p>
            <p>{{ item.dailyInterest }}%</p>
          </div>
          <div>
            <p>合约周期</p>
            <p>{{ item.cycle }}天</p>
          </div>
          <div class="progress">
            <van-progress
              :percentage="parseInt((item.sales / item.stock) * 100)"
              stroke-width="10"
              color="#FB8114"
            />
          </div>
          <div class="buttom">
            <van-button
              round
              type="info"
              size="large"
              block
              @click="panicBuying(item.id)"
              >立即抢购</van-button
            >
          </div>
        </li>
      </ul>
      <p v-else class="no-data">没有更多数据了</p>
    </div>
    <myFooter :footerNavActive="activeType"></myFooter>
  </div>
</template>

<script>
import { pets } from '../../api/index'
import myFooter from '../../components/footer/footer.vue'
export default {
  data() {
    return {
      activeType: 'machine',
      // 账户余额
      balance: null,
      petList: []
    }
  },
  created() {
    this.getPetsList()
  },
  methods: {
    // 获取宠物列表
    getPetsList() {
      pets().then(v => {
        if (v.status === 200) {
          this.petList = v.data.listMine
          this.balance = v.data.balance
        }
      })
    },
    // 抢购
    panicBuying(id) {
      this.$router.push({
        path: '/petDetail',
        query: {
          petsId: id
        }
      })
    },
    // 保留两位小数
    eturnFloat(value) {
      var priceValue = Math.round(parseFloat(value) * 100) / 100
      var xsd = priceValue.toString().split('.')
      if (xsd.length === 1) {
        priceValue = priceValue.toString() + '.00'
        return priceValue
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          priceValue = priceValue.toString() + '0'
        }
        return priceValue
      }
    }
  },
  components: {
    myFooter
  }
}
</script>
<style scoped lang="scss">
.pet-content {
  .pet {
    padding: 0 30px;
    margin-top: 20px;
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
        padding-bottom: 20px;
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
          padding: 0 20px;
          margin: 20px 0 10px;
          .van-cell {
            padding: 0;
            height: 40px;
            line-height: 40px;
          }
          .van-cell__title {
            font-size: 32px;
            color: #000;
            font-weight: bold;
          }
          .van-tag {
            font-size: 24px;
            padding: 4px 10px;
          }
        }
        > div:nth-child(3) {
          display: flex;
          padding: 0 20px;
          > p {
            font-size: 24px;
            line-height: 50px;
            margin: 0;
          }
          > p:nth-child(1) {
            flex: 0.6;
            color: rgba(153, 153, 153, 1);
          }
          > p:nth-child(2) {
            flex: 1;
            text-align: right;
          }
        }
        > div:nth-child(4),
        > div:nth-child(5) {
          display: flex;
          padding: 0 20px;
          > p {
            flex: 1;
            font-size: 24px;
            line-height: 50px;
            margin: 0;
          }
          > p:nth-child(1) {
            color: rgba(153, 153, 153, 1);
          }
          > p:nth-child(2) {
            text-align: right;
          }
        }
        > div:nth-child(6) {
          padding: 0 20px;
        }
        .progress {
          margin-top: 20px;
          /deep/ .van-progress__pivot {
            font-size: 24px;
          }
        }
        .buttom {
          padding: 0 80px;
          margin-top: 40px;
        }
      }
    }
    .no-data {
      text-align: center;
      font-size: 28px;
      color: #ccc;
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
.pet-content .van-progress {
  border-radius: 8px;
}
.pet-content .pet > ul > li .buttom .van-button {
  background: #415be1;
  font-size: 26px;
}
.van-toast {
  width: 38% !important;
}
.van-toast__icon {
  font-size: 48px;
}
.van-toast__text {
  font-size: 26px;
  line-height: 40px;
}
</style>
