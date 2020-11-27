<template>
  <div class="transaction-content1">
    <van-nav-bar title="交易中心" fixed :placeholder="true" right-text="我的" @click-right="onClickRight" />
    <div class="transaction-fixed">
      <div class="transaction">
        <div></div>
        <div></div>
        <div class="transaction-box">
          <div class="transaction-info">
            <div>
              <div>
                <p>最低价</p>
                <p>{{transactionData.minPrice}}</p>
              </div>
              <div>
                <p>最高价</p>
                <p>{{transactionData.maxPrice}}</p>
              </div>
              <div>
                <p>涨跌幅</p>
                <p>{{transactionData.updownRange}}</p>
              </div>
              <div>
                <p>参考价</p>
                <p>{{transactionData.referencePrice}}</p>
              </div>
            </div>
            <div>
              <div>
                <p>当前求购量</p>
                <p>{{buyingQuantity}}</p>
              </div>
              <div>
                <p>当前汇率</p>
                <p>{{transactionData.exchangeRate}}</p>
              </div>
              <div>
                <p>平台交易总量</p>
                <p>{{transactionTotal}}</p>
              </div>
            </div>
            <div>
              <van-button round type="info" size="large" @click="showBuyInPopup">发布买入</van-button>
              <van-button round type="info" size="large" @click="showSellPopup">发布卖单</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-content">
      <div class="order-info-box">
        <div class="order-tab">
          <div v-for="item in tabList" :key="item.value" @click="tabTarget(item.value)">
            <p :class="item.value == tabType ? 'active' : ''">{{ item.label }}</p>
          </div>
        </div>
        <div v-if="tabType == '2'" class="tab-content">
          <van-pull-refresh v-model="issellLoading" @refresh="onSellRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
            <van-list v-model="sellLoading" :finished="sellFinished" finished-text="没有更多数据了" @load="sellOnLoad" offset="50">
              <div class="tab1">
                <ul>
                  <li class="order-info" v-for="(item, index) in sellDataForm" :key="index">
                    <div class="order-info-left">
                      <div class="order-box">
                        <span>订单号</span>
                        <span>{{item.tradingId}}</span>
                      </div>
                      <div class="order-box">
                        <span>价格</span>
                        <span>{{Number(item.payPrice).toFixed(2)}} RMB</span>
                      </div>
                      <div class="order-box">
                        <span>数量</span>
                        <span>{{Number(item.payNum).toFixed(2)}} HLC</span>
                      </div>
                    </div>
                    <div class="order-buttom">
                      <van-button round type="info" size="large" color="#415be1" @click="mrBayIn(item.payNum, item.payPrice, item.id)">买 入</van-button>
                    </div>
                  </li>
                </ul>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div v-if="tabType == '1'" class="tab-content">
          <van-pull-refresh v-model="isBuyInLoading" @refresh="onBuyInRefresh" style="touch-action: pan-y;" class="van-pull-refresh">
            <van-list v-model="buyInLoading" :finished="buyInFinished" finished-text="没有更多数据了" @load="buyInOnLoad" offset="50">
              <div class="tab2">
                <ul>
                  <li class="order-info" v-for="(item, index) in buyInDataForm" :key="index">
                    <div class="order-info-left">
                      <div class="order-box">
                        <span>订单号</span>
                        <span>{{item.tradingId}}</span>
                      </div>
                      <div class="order-box">
                        <span>价格</span>
                        <span>{{Number(item.payPrice).toFixed(2)}} RMB</span>
                      </div>
                      <div class="order-box">
                        <span>数量</span>
                        <span>{{Number(item.payNum).toFixed(2)}} HLC</span>
                      </div>
                    </div>
                    <div class="order-buttom">
                      <van-button round type="info" size="large" color="#415be1" @click="mcBayIn(item.payNum, item.payPrice, item.id)">卖 出</van-button>
                    </div>
                  </li>
                </ul>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </div>
    <myFooter :footerNavActive="activeType"></myFooter>
    <!-- 发布买入弹窗 -->
    <van-popup v-model="buyInPopup" round closeable lock-scroll close-on-popstate class="popup" @closed="closeBuyInPopup">
      <h2>发布买入</h2>
      <div class="hire-quantity">
        <p>买入数量(HLC)</p>
        <p>
          <van-stepper v-model="buyInForm.payNum" integer theme="round" button-size="22" input-width="60px" />
        </p>
      </div>
      <div class="hire-quantity">
        <p>买入价格(RMB)</p>
        <p>
          {{(Number(buyInForm.payNum) * Number(transactionData.exchangeRate)).toFixed(2)}}
        </p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input :value="buyInForm.password2" info="密码为 6 位数字" :focused="buyInShowKeyboard" @focus="buyInShowKeyboard = true" />
        </div>
      </div>
      <div class="btn">
        <van-button round type="info" block size="large" @click="postBuy">确 认</van-button>
      </div>
    </van-popup>
    <!-- 发布卖出弹窗 -->
    <van-popup v-model="sellPopup" round closeable lock-scroll close-on-popstate class="popup" @closed="closeSellPopup">
      <h2>发布卖单</h2>
      <div class="hire-quantity">
        <p>卖出数量(HLC)</p>
        <p>
          <van-stepper v-model="sellForm.payNum" integer theme="round" button-size="22" input-width="60px" />
        </p>
      </div>
      <div class="hire-quantity">
        <p>手续费</p>
        <p>
          {{costInformation.tradingFee}} %
        </p>
      </div>
      <div class="hire-quantity">
        <p>实际到账金额(RMB)</p>
        <p>
          {{(Number(sellForm.payNum) * Number(transactionData.exchangeRate) - (Number(sellForm.payNum) * Number(transactionData.exchangeRate)) * (Number(costInformation.tradingFee) / 100)).toFixed(2)}}
        </p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input :value="sellForm.password2" info="密码为 6 位数字" :focused="sellShowKeyboard" @focus="sellShowKeyboard = true" />
        </div>
      </div>
      <div class="btn">
        <van-button round type="info" block size="large" @click="issueaSellOrder">确 认</van-button>
      </div>
    </van-popup>
    <!-- 买入弹窗 -->
    <van-popup v-model="mrPopup" round closeable lock-scroll close-on-popstate class="popup" @closed="closeMRPopup">
      <h2>买入</h2>
      <div class="hire-quantity">
        <p>买入数量(HLC)</p>
        <p>{{Number(mrData.number).toFixed(2)}}</p>
      </div>
      <div class="hire-quantity">
        <p>买入价格(RMB)</p>
        <p>{{Number(mrData.price).toFixed(2)}}</p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input :value="mrData.password2" info="密码为 6 位数字" :focused="mrShowKeyboard" @focus="mrShowKeyboard = true" />
        </div>
      </div>
      <div class="btn">
        <van-button round type="info" block size="large" @click="confirmBuy">确 认</van-button>
      </div>
    </van-popup>
    <!-- 卖出弹窗 -->
    <van-popup v-model="mcPopup" round closeable lock-scroll close-on-popstate class="popup" @closed="closeMcPopup">
      <h2>卖出</h2>
      <div class="hire-quantity">
        <p>卖出数量(HLC)</p>
        <p>{{Number(mcData.number).toFixed(2)}}</p>
      </div>
      <div class="hire-quantity">
        <p>卖出价格(RMB)</p>
        <p>{{Number(mcData.price).toFixed(2)}}</p>
      </div>
      <div class="hire-quantity">
        <p>手续费</p>
        <p>{{costInformation.tradingFee}} %</p>
      </div>
      <div class="hire-quantity">
        <p>实际到账金额(RMB)</p>
        <p>{{(Number(mcData.price) - Number(mcData.price) * (Number(costInformation.tradingFee) / 100)).toFixed(2)}}</p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input :value="mcData.password2" info="密码为 6 位数字" :focused="mcShowKeyboard" @focus="mcShowKeyboard = true" />
        </div>
      </div>
      <div class="btn">
        <van-button round type="info" block size="large" @click="sureToSell">确 认</van-button>
      </div>
    </van-popup>
    <!-- 发布买入数字键盘 -->
    <van-number-keyboard :show="buyInShowKeyboard" @input="onInput($event, 'buyIn')" @delete="onDelete('buyIn')" @blur="buyInShowKeyboard = false" safe-area-inset-bottom />
    <!-- 发布卖出数字键盘 -->
    <van-number-keyboard :show="sellShowKeyboard" @input="onInput($event, 'sell')" @delete="onDelete('sell')" @blur="sellShowKeyboard = false" safe-area-inset-bottom />
    <!-- 买入数字键盘 -->
    <van-number-keyboard :show="mrShowKeyboard" @input="onInput($event, 'mr')" @delete="onDelete('mr')" @blur="mrShowKeyboard = false" safe-area-inset-bottom />
    <!-- 卖出数字键盘 -->
    <van-number-keyboard :show="mcShowKeyboard" @input="onInput($event, 'mc')" @delete="onDelete('mc')" @blur="mcShowKeyboard = false" safe-area-inset-bottom />
  </div>
</template>

<script>
import {
  getPendingOrder,
  addEyStoreTradingCenter,
  dealTransaction,
  feeOrUserInfo
} from '../../api/index'
import merge from 'webpack-merge'
import myFooter from '../../components/footer/footer.vue'
export default {
  data() {
    return {
      activeType: 'transaction',
      tabList: [
        {
          value: '2',
          label: '卖单区'
        },
        {
          value: '1',
          label: '买单区'
        }
      ],
      tabType: '2',
      // 卖单查询条件
      sellInfo: {
        page: 1,
        limit: 5
      },
      // 交易数据
      transactionData: {},
      // 求购量
      buyingQuantity: '',
      // 总量
      transactionTotal: '',
      sellDataForm: [],
      sellLoading: false,
      sellFinished: false,
      issellLoading: false,
      // 买单查询条件
      buyInInfo: {
        page: 1,
        limit: 5
      },
      buyInDataForm: [],
      buyInLoading: false,
      buyInFinished: false,
      isBuyInLoading: false,
      // 发布买入
      buyInPopup: false,
      buyInForm: {
        payNum: 1,
        password2: ''
      },
      buyInShowKeyboard: false,
      // 发布卖出
      sellPopup: false,
      sellForm: {
        payNum: 1,
        password2: ''
      },
      sellShowKeyboard: false,
      // 买入
      mrPopup: false,
      mrData: {
        number: '',
        price: '',
        password2: '',
        id: ''
      },
      mrShowKeyboard: false,
      // 卖出
      mcPopup: false,
      mcData: {
        number: '',
        price: '',
        password2: '',
        id: ''
      },
      mcShowKeyboard: false,
      costInformation: {}
    }
  },
  created() {
    this.tabType = this.$route.query.tabType ? this.$route.query.tabType : '2'
    this.getFeeOrUserInfo()
    if (this.tabType === '2') {
      this.buyInFinished = false
      this.getSellOrdersList()
    } else {
      this.sellFinished = false
      this.getPayTheBillList()
    }
  },
  methods: {
    // 获取卖单区挂单信息
    getSellOrdersList() {
      const data = {
        type: this.tabType,
        status: '0',
        page: this.sellInfo.page,
        limit: this.sellInfo.limit
      }
      getPendingOrder(data).then(v => {
        this.sellLoading = false
        if (v.status === 200) {
          this.transactionData = v.data.eyStoreTradingSet
          this.buyingQuantity = v.data.buySum
          this.transactionTotal = v.data.sellSum
          if (
            v.data.page.records.length === 0 ||
            v.data.page.records.length < 5
          ) {
            this.sellFinished = true
          }
          if (this.sellInfo.page > 1) {
            this.sellDataForm = [...this.sellDataForm, ...v.data.page.records]
          } else {
            this.issellLoading = false
            this.sellDataForm = v.data.page.records
          }
        }
      })
    },
    // 获取买单区挂单信息
    getPayTheBillList() {
      const data = {
        type: this.tabType,
        status: '0',
        page: this.buyInInfo.page,
        limit: this.buyInInfo.limit
      }
      getPendingOrder(data).then(v => {
        this.buyInLoading = false
        if (v.status === 200) {
          this.transactionData = v.data.eyStoreTradingSet
          this.buyingQuantity = v.data.buySum
          this.transactionTotal = v.data.sellSum
          if (
            v.data.page.records.length === 0 ||
            v.data.page.records.length < 5
          ) {
            this.buyInFinished = true
          }
          if (this.buyInInfo.page > 1) {
            this.buyInDataForm = [...this.buyInDataForm, ...v.data.page.records]
          } else {
            this.isBuyInLoading = false
            this.buyInDataForm = v.data.page.records
          }
        }
      })
    },
    // 切换
    tabTarget(i) {
      this.tabType = i
      if (i === '2') {
        this.$router.replace({
          query: merge(this.$route.query, { tabType: '2' })
        })
        this.sellInfo.page = 1
        this.sellDataForm = []
        this.buyInFinished = false
        this.getSellOrdersList()
      } else {
        this.$router.replace({
          query: merge(this.$route.query, { tabType: '1' })
        })
        this.buyInInfo.page = 1
        this.buyInDataForm = []
        this.sellFinished = false
        this.getPayTheBillList()
      }
    },
    // 确定买入
    confirmBuy() {
      if (this.mrData.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      }
      const data = {
        password2: this.mrData.password2,
        id: Number(this.mrData.id)
      }
      dealTransaction(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('买入成功')
          this.mrPopup = false
          this.getSellOrdersList()
          this.mrData.password2 = ''
        }
      })
    },
    // 确定卖出
    sureToSell() {
      if (this.mcData.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      }
      const data = {
        password2: this.mcData.password2,
        id: Number(this.mcData.id)
      }
      dealTransaction(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('卖出成功')
          this.mcPopup = false
          this.getPayTheBillList()
          this.mcData.password2 = ''
        }
      })
    },
    // 交易记录
    onClickRight() {
      this.$router.push({
        path: '/myOrder'
      })
    },
    showBuyInPopup() {
      this.buyInPopup = true
    },
    mrBayIn(payNum, payPrice, id) {
      this.mrData.number = payNum
      this.mrData.price = payPrice
      this.mrData.id = id
      this.mrPopup = true
    },
    mcBayIn(payNum, payPrice, id) {
      this.mcData.number = payNum
      this.mcData.price = payPrice
      this.mcData.id = id
      this.mcPopup = true
    },
    showSellPopup() {
      this.sellPopup = true
    },
    onInput(key, name) {
      if (name === 'buyIn') {
        this.buyInForm.password2 = (this.buyInForm.password2 + key).slice(0, 6)
      } else if (name === 'sell') {
        this.sellForm.password2 = (this.sellForm.password2 + key).slice(0, 6)
      } else if (name === 'mr') {
        this.mrData.password2 = (this.mrData.password2 + key).slice(0, 6)
      } else if (name === 'mc') {
        this.mcData.password2 = (this.mcData.password2 + key).slice(0, 6)
      }
    },
    onDelete(name) {
      if (name === 'buyIn') {
        this.buyInForm.password2 = this.buyInForm.password2.slice(
          0,
          this.buyInForm.password2.length - 1
        )
      } else if (name === 'sell') {
        this.sellForm.password2 = this.sellForm.password2.slice(
          0,
          this.sellForm.password2.length - 1
        )
      } else if (name === 'mr') {
        this.mrData.password2 = this.mrData.password2.slice(
          0,
          this.mrData.password2.length - 1
        )
      } else if (name === 'mc') {
        this.mcData.password2 = this.mcData.password2.slice(
          0,
          this.mcData.password2.length - 1
        )
      }
    },
    // 卖单区上拉加载
    sellOnLoad() {
      // 异步更新数据
      if (this.sellDataForm.length === 0) return
      this.sellLoading = true
      this.sellInfo.page++
      this.getSellOrdersList()
    },
    // 卖单区下拉刷新
    onSellRefresh() {
      this.sellInfo.page = 1
      this.sellDataForm = []
      this.sellFinished = false
      this.getSellOrdersList()
    },
    // 买单区上拉加载
    buyInOnLoad() {
      // 异步更新数据
      if (this.buyInDataForm.length === 0) return
      this.buyInLoading = true
      this.buyInInfo.page++
      this.getPayTheBillList()
    },
    // 买单区下拉刷新
    onBuyInRefresh() {
      this.buyInInfo.page = 1
      this.buyInDataForm = []
      this.buyInFinished = false
      this.getPayTheBillList()
    },
    // 发布买入订单
    postBuy() {
      if (this.buyInForm.payNum === '') {
        return this.$toast.fail('请输入买入数量')
      } else if (this.buyInForm.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      }
      const data = {
        payNum: this.buyInForm.payNum,
        password2: this.buyInForm.password2,
        status: '0',
        type: '1'
      }
      addEyStoreTradingCenter(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('发布成功')
          this.buyInPopup = false
          this.getPayTheBillList()
          this.buyInForm = {
            payNum: 1,
            password2: ''
          }
        }
      })
    },
    // 发布买入弹窗关闭
    closeBuyInPopup() {
      this.buyInForm = {
        payNum: 1,
        password2: ''
      }
    },
    // 发布卖出弹窗关闭
    closeSellPopup() {
      this.sellForm = {
        payNum: 1,
        password2: ''
      }
    },
    // 买入弹窗关闭
    closeMRPopup() {
      this.mrData = {
        number: '',
        price: '',
        password2: '',
        id: ''
      }
    },
    // 卖出弹窗关闭
    closeMcPopup() {
      this.mcData = {
        number: '',
        price: '',
        password2: '',
        id: ''
      }
    },
    // 发布卖单
    issueaSellOrder() {
      if (this.sellForm.payNum === '') {
        return this.$toast.fail('请输入买入数量')
      } else if (this.sellForm.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      }
      const data = {
        payNum: this.sellForm.payNum,
        password2: this.sellForm.password2,
        status: '0',
        type: '2'
      }
      addEyStoreTradingCenter(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('发布成功')
          this.sellPopup = false
          this.getSellOrdersList()
          this.sellForm = {
            payNum: 1,
            password2: ''
          }
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
    },
    // 获取交易手续费
    getFeeOrUserInfo() {
      feeOrUserInfo().then(v => {
        if(v.status === 200) {
          this.costInformation = v.data
        }
      })
    }
  },
  components: {
    myFooter
  }
}
</script>
<style scoped lang="scss">
.transaction-content1 {
  min-height: calc(100vh);
  background: #fff;
  .transaction-fixed {
    position: fixed;
    top: 80px;
    width: 100%;
    height: 320px;
    z-index: 99;
    .transaction {
      position: relative;
      height: 320px;
      > div:nth-child(1) {
        height: 50%;
        background: #415be1;
      }
      > div:nth-child(2) {
        height: 50%;
        background: #fff;
      }
      .transaction-box {
        position: absolute;
        left: 0;
        top: 0;
        height: 260px;
        width: 100%;
        .transaction-info {
          height: 100%;
          background: #fff;
          margin: 0 30px;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 0 20px #999;
          > div:nth-child(1) {
            display: flex;
            height: 95px;
            > div {
              flex: 1;
              text-align: center;
              > p {
                margin: 0;
              }
              > p:nth-child(1) {
                font-size: 28px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              > p:nth-child(2) {
                font-size: 28px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                margin-top: 20px;
              }
            }
          }
          > div:nth-child(2) {
            display: flex;
            height: 95px;
            > div {
              flex: 1;
              text-align: center;
              > p {
                margin: 0;
              }
              > p:nth-child(1) {
                font-size: 28px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              > p:nth-child(2) {
                font-size: 28px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);
                margin-top: 20px;
              }
            }
          }
          > div:nth-child(3) {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            padding: 0 40px;
            .van-button {
              width: 45%;
            }
          }
        }
      }
    }
  }
  .order-content {
    margin-top: 318px;
    background: #fff;
    padding: 30px;
    .order-info-box {
      min-height: calc(100vh - 600px);
      padding: 15px 30px 0;
      border: 2px solid #ebedf0;
      border-radius: 20px;
      box-shadow: 0 0 10px #ccc;
      .order-tab {
        display: flex;
        > div {
          flex: 1;
          text-align: center;
          padding: 10px 60px;
          > p {
            margin: 0;
            font-size: 36px;
            color: rgba(153, 153, 153, 1);
            padding: 10px 0;
          }
          .active {
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            border-bottom: 4px solid #415ce1;
          }
        }
      }
      .tab-content {
        margin-top: 20px;
        .order-info {
          display: flex;
          height: 120px;
          border-bottom: 2px solid #ebedf0;
          padding: 20px 0;
          .order-info-left {
            flex: 1;
            .order-box {
              display: flex;
              line-height: 40px;
              > span:nth-child(1) {
                flex: 0.4;
                font-size: 28px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              > span:nth-child(2) {
                flex: 1;
                margin-left: 40px;
                font-size: 28px;
                font-weight: 400;
                color: #999;
              }
            }
          }
          .order-buttom {
            flex: 0.2;
            line-height: 120px;
            text-align: center;
          }
        }
      }
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
        color: rgba(153, 153, 153, 1);
        font-size: 28px;
      }
      > p:nth-child(2) {
        text-align: right;
        font-size: 28px;
      }
      .buy-in-price {
        border-bottom: 2px solid #ebedf0;
        line-height: 60px;
      }
    }
    .password {
      margin-top: 20px;
      > p {
        margin: 0;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        color: rgba(153, 153, 153, 1);
      }
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>
<style>
.transaction-content1 .van-nav-bar {
  height: 82px;
  background: #415be1;
}
.transaction-content1 .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.transaction-content1 .van-nav-bar__text {
  font-size: 28px;
  color: rgba(240, 240, 240, 1);
}
.transaction-content1 .van-button--info {
  height: 60px;
  line-height: 60px;
  background: #415be1;
  border: none;
  font-size: 30px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.transaction-content1 [class*='van-hairline']::after {
  content: none;
}
.transaction-content1 .van-button--info {
  font-size: 28px;
}
.transaction-content1 .van-popup {
  width: 70%;
  padding: 60px 40px 40px;
}
.transaction-content1 .van-number-keyboard {
  z-index: 9999;
  padding-bottom: 0;
}
.transaction-content1 .van-password-input {
  margin: 0;
}
.transaction-content1 .van-password-input__security {
  height: 80px;
}
.transaction-content1 .van-password-input__security li {
  border: 2px solid #ccc;
}
.transaction-content1 .van-key {
  height: 60px;
  line-height: 60px;
}
.transaction-content1
  .order-content
  .order-info-box
  .tab-content
  .order-buttom
  .van-button {
  font-size: 28px;
}
.transaction-content1
  .order-content
  .order-info-box
  .tab-content
  .van-pull-refresh {
  overflow: inherit;
}
.transaction-content1
  .order-content
  .order-info-box
  .tab-content
  .van-list__finished-text {
  font-size: 24px;
  padding: 10px 0;
}
.transaction-content1
  .order-content
  .order-info-box
  .tab-content
  .van-pull-refresh__head {
  font-size: 24px;
}
.transaction-content1
  .order-content
  .order-info-box
  .tab-content
  .van-loading__text {
  font-size: 24px;
}
.transaction-content1
  .popup
  .hire-quantity
  > p:nth-child(2)
  .van-stepper__input {
  font-size: 28px;
  border-bottom: 2px solid #ebedf0;
}
.transaction-content1 .popup .hire-quantity .buy-in-price .van-cell {
  line-height: 40px;
  font-size: 28px;
}
.transaction-content1 .popup .password .van-password-input__info {
  font-size: 24px;
}
.transaction-content1 .popup .btn .van-button {
  height: 60px;
  line-height: 60px;
  background: #415be1;
  font-size: 28px;
}
.transaction-content1 .popup .van-icon-cross {
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
