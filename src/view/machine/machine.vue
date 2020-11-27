<template>
  <div class="machine-content">
    <van-nav-bar title="矿机" fixed :placeholder="true" />
    <div class="swipe">
      <van-swipe :autoplay="2000">
          <van-swipe-item v-for="(item, index) in bannerList" :key="index">
            <img :src="item.pic" alt="" />
          </van-swipe-item>
      </van-swipe>
    </div>
    <div class="machine">
      <div class="mining-machine-box">
        <ul v-if="machineList.length > 0">
          <li v-for="(item, index) in machineList" :key="item.id + index">
            <div>
              <img :src="item.image" alt="" />
            </div>
            <div>
              <h2>{{ item.storeName }}</h2>
              <p>
                <span>租用价格</span>
                <span>{{ Number(item.price).toFixed(2) }} HLC</span>
              </p>
              <p>
                <span>算力</span>
                <span>{{ item.dailyInterest }}%</span>
              </p>
              <p>
                <span>每天可挖</span>
                <span>{{
                  (
                  Number(item.price) *
                  (Number(item.dailyInterest) / 100)
                  ).toFixed(2)
                  }}
                  HLC</span>
              </p>
              <p>
                <span>合约周期</span>
                <span>{{ item.cycle }}天</span>
              </p>
            </div>
            <div>
              <van-button round type="info" size="large" color="#FB9513" @click="showPopup(item)" v-show="item.quantity > 0">租 用</van-button>
              <van-button round type="info" size="large" color="#32CD32" @click="showDetailPopup(item)">详 情</van-button>
            </div>
          </li>
        </ul>
        <p v-else class="no-data">没有更多数据了</p>
      </div>
      <!-- 租用弹窗 -->
      <van-popup v-model="popup" round closeable lock-scroll close-on-popstate class="popup" @closed="closePopup">
        <h2>矿机租用</h2>
        <div class="hire-quantity" v-show="Number(hireDate.quantity) - Number(availableQuantity) > 0">
          <p>租用数量</p>
          <p>
            <van-stepper v-model="hireForm.count" integer theme="round" button-size="22" :max="Number(hireDate.quantity) - Number(availableQuantity)" input-width="60px" />
          </p>
        </div>
        <div class="hire-quantity">
          <p>可租数量</p>
          <p>{{ hireDate.quantity }}</p>
        </div>
        <div class="hire-quantity">
          <p>已租数量</p>
          <p>{{ availableQuantity }}</p>
        </div>
        <div class="hire-quantity">
          <p>算力</p>
          <p>加 {{ hireDate.dailyInterest }}%</p>
        </div>
        <div class="hire-quantity">
          <p>矿机价格</p>
          <p>{{ Number(hireDate.price).toFixed(2) }} HLC</p>
        </div>
        <div class="hire-quantity">
          <p>总金额</p>
          <p>
            {{ (Number(hireDate.price) * Number(hireForm.count)).toFixed(2) }}
            HLC
          </p>
        </div>
        <div class="password" v-show="Number(hireDate.quantity) - Number(availableQuantity) > 0">
          <p>交易密码</p>
          <div>
            <van-password-input :value="hireForm.password2" info="密码为 6 位数字" :focused="showKeyboard" @focus="showKeyboard = true" />
          </div>
        </div>
        <div class="btn" v-show="Number(hireDate.quantity) - Number(availableQuantity) > 0">
          <van-button round type="info" block size="large" @click="confirmHire">确认租用</van-button>
        </div>
      </van-popup>
      <!-- 详情弹窗 -->
      <van-popup v-model="detailPopup" round closeable lock-scroll close-on-popstate class="popup">
        <h2>矿机详情</h2>
        <div class="hire-quantity">
          <p>可租数量</p>
          <p>{{ poolDetailData.quantity }}</p>
        </div>
        <div class="hire-quantity">
          <p>已租数量</p>
          <p>{{ detailQuantity }}</p>
        </div>
        <div class="hire-quantity">
          <p>预计产生收益</p>
          <p>
            {{
            (
            Number(poolDetailData.price) *
            (Number(poolDetailData.dailyInterest) / 100) *
            Number(poolDetailData.cycle)
            ).toFixed(2)
            }}
            HLC
          </p>
        </div>
        <div class="hire-quantity">
          <p>矿机地址</p>
          <p>{{ poolDetailData.storeInfo }}</p>
        </div>
      </van-popup>
      <!-- 数字键盘 -->
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" safe-area-inset-bottom />
    </div>
    <myFooter :footerNavActive="activeType"></myFooter>
  </div>
</template>

<script>
import { miningMachine, rentMine, buyQuantity } from '../../api/index'
import myFooter from '../../components/footer/footer.vue'
export default {
  data() {
    return {
      activeType: 'machine',
      images: [
        require('../../assets/image/advertising.png'),
        require('../../assets/image/advertising.png')
      ],
      // 账户余额
      balance: null,
      // 轮播图
      bannerList: [],
      // 矿机列表
      machineList: [],
      popup: false,
      detailPopup: false,
      // 租用信息
      hireDate: {},
      // 矿机详情信息
      poolDetailData: {},
      hireForm: {
        count: 1,
        password2: ''
      },
      showKeyboard: false,
      // 可租数量
      availableQuantity: null,
      detailQuantity: null
    }
  },
  created() {
    this.getMiningMachineList()
  },
  methods: {
    // 获取矿机列表
    getMiningMachineList() {
      miningMachine().then(v => {
        if (v.status === 200) {
          this.machineList = v.data.listMine
          this.bannerList = v.data.banner
          this.balance = v.data.balance
        }
      })
    },
    showPopup(data) {
      this.hireDate = data
      this.getBuyQuantity(this.hireDate.id, '1')
    },
    // 矿机详情弹窗
    showDetailPopup(data) {
      this.poolDetailData = data
      this.getBuyQuantity(this.poolDetailData.id, '2')
    },
    // 获取商品购买数量
    getBuyQuantity(id, _type) {
      buyQuantity({ productId: id }).then(v => {
        if (v.status === 200) {
          if (_type === '1') {
            this.availableQuantity = v.data
            this.popup = true
          } else {
            this.detailQuantity = v.data
            this.detailPopup = true
          }
        }
      })
    },
    onInput(key) {
      this.hireForm.password2 = (this.hireForm.password2 + key).slice(0, 6)
    },
    onDelete() {
      this.hireForm.password2 = this.hireForm.password2.slice(
        0,
        this.hireForm.password2.length - 1
      )
    },
    // 确认租用
    confirmHire() {
      if (this.hireForm.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      } else if (
        Number(this.hireDate.price) * Number(this.hireForm.count) >
        Number(this.balance)
      ) {
        return this.$toast.fail('余额不足')
      }
      const data = {
        count: this.hireForm.count,
        id: this.hireDate.id,
        password2: this.hireForm.password2
      }
      rentMine(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('租用成功')
          setTimeout(() => {
            this.getMiningMachineList()
            this.popup = false
          }, 1000)
        }
      })
    },
    // 关闭弹窗
    closePopup(e) {
      this.hireForm.count = 1
      this.hireForm.password2 = ''
    },
    // 轮播图跳转
    path(data) {
      if (data.isOut === 1) {
        this.$router.push({
          path: data.in_url
        })
      } else {
        location.href = data.out_url
      }
    }
  },
  components: {
    myFooter
  }
}
</script>
<style scoped lang="scss">
.machine-content {
  .swipe {
    width: 100%;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .machine {
    padding: 0 30px;
    .mining-machine-box {
      margin-top: 20px;
      > ul {
        > li {
          display: flex;
          background: #fff;
          border-radius: 20px;
          padding: 20px;
          min-height: 220px;
          margin-bottom: 20px;
          > div:nth-child(1) {
            flex: 0.5;
            img {
              width: 100%;
              height: 100%;
            }
          }
          > div:nth-child(2) {
            flex: 1;
            margin-left: 20px;
            > h2 {
              font-size: 36px;
              margin: 0;
              margin-bottom: 10px;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 42px;
            }
            > p {
              display: flex;
              margin: 0;
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
              line-height: 42px;
              > span {
                flex: 1;
              }
            }
          }
          > div:nth-child(3) {
            flex: 0.3;
            line-height: 110px;
            text-align: center;
          }
        }
      }
      .no-data {
        text-align: center;
        font-size: 28px;
        color: #ccc;
      }
    }
    .popup {
      h2 {
        text-align: center;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 36px;
        margin: 0;
        margin-bottom: 40px;
      }
      .hire-quantity {
        display: flex;
        margin-top: 20px;
        > p {
          flex: 1;
          margin: 0;
          height: 60px;
          line-height: 60px;
          font-size: 28px;
          color: rgba(153, 153, 153, 1);
        }
        > p:nth-child(2) {
          text-align: right;
          font-size: 28px;
        }
      }
      .password {
        margin-top: 20px;
        > p {
          font-size: 28px;
          margin: 0;
          height: 60px;
          line-height: 60px;
          color: rgba(153, 153, 153, 1);
        }
      }
      .btn {
        margin-top: 20px;
      }
    }
  }
}
</style>
<style>
.machine-content .mining-machine-box > ul > li > div:nth-child(3) .van-button {
  font-size: 24px;
}
.machine-content .popup .hire-quantity > p:nth-child(2) .van-stepper__input {
  font-size: 28px;
  border-bottom: 2px solid #ebedf0;
}
.machine-content .popup .password .van-password-input__info {
  font-size: 24px;
}
.machine-content .popup .btn .van-button {
  height: 60px;
  line-height: 60px;
  background: #415be1;
  font-size: 28px;
}
.machine-content .swipe .van-swipe {
  height: 100%;
  width: 100%;
}
.machine-content .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.machine-content .popup .van-icon {
  color: #ccc;
  font-size: 32px;
}
.machine-content .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.machine-content .van-popup {
  width: 70%;
  padding: 60px 40px 40px;
}
.machine-content .van-number-keyboard {
  z-index: 9999;
  padding-bottom: 0;
}
.machine-content .van-password-input {
  margin: 0;
}
.machine-content .van-password-input__security {
  height: 80px;
}
.machine-content .van-password-input__security li {
  border: 2px solid #ebedf0;
}
.machine-content .van-key {
  height: 60px;
  line-height: 60px;
}
.machine-content .popup .van-icon-cross {
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
.van-stepper__minus::after,
.van-stepper__plus::after {
  width: 2px !important;
}
.van-stepper__minus::before,
.van-stepper__plus::before {
  height: 2px !important;
}
</style>
