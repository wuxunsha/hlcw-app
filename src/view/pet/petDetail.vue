<template>
  <div class="pet-content">
    <van-nav-bar
      title="宠物详情"
      fixed
      :placeholder="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="pet-box">
      <!-- <div class="pet-image">
        <img :src="petsDetail.image" alt="" />
      </div> -->
      <div class="pet-title">
        <p>
          <span>{{ petsDetail.storeName }}</span>
        </p>
        <p>
          <van-tag round type="success">{{ petsDetail.storeInfo }}</van-tag>
        </p>
      </div>
      <div>
        <p>
          <span>每天收益：</span>
          <span>{{ petsDetail.dailyInterest }}%</span>
        </p>
        <p>
          <span>周期：</span>
          <span>{{ petsDetail.cycle }}天</span>
        </p>
      </div>
      <div>
        <p>
          <span>可抢数量：</span>
          <span>{{ petsDetail.quantity }}</span>
        </p>
        <p>
          <span>已抢数量：</span>
          <span>{{ detailQuantity }}</span>
        </p>
      </div>
      <div class="pet-price">
        <p>
          <span>价格：</span>
          <span>{{ Number(petsDetail.price).toFixed(2) }} RMB</span>
        </p>
      </div>
      <div class="pet-price">
        <p>
          <span>预计产生收益：</span>
          <span
            >{{
              (
                Number(petsDetail.price) *
                (Number(petsDetail.dailyInterest) / 100) *
                Number(petsDetail.cycle)
              ).toFixed(2)
            }}
            RMB</span
          >
        </p>
      </div>
    </div>
    <div class="pet-detail">
      <h2>宠物详情</h2>
      <div v-html="petsDetail.description"></div>
      <van-button
        round
        type="info"
        size="large"
        @click="showPopup"
        v-show="Number(petsDetail.quantity) - Number(detailQuantity) > 0"
        >立即购买</van-button
      >
    </div>
    <!-- 租用弹窗 -->
    <van-popup
      v-model="popup"
      round
      closeable
      lock-scroll
      close-on-popstate
      class="popup"
      @closed="closePopup"
    >
      <h2>抢购宠物</h2>
      <div class="hire-quantity">
        <p>抢购数量</p>
        <p>
          <van-stepper
            v-model="hireForm.count"
            integer
            theme="round"
            button-size="22"
            :max="Number(petsDetail.quantity) - Number(detailQuantity)"
            input-width="60px"
          />
        </p>
      </div>
      <div class="hire-quantity">
        <p>宠物价格</p>
        <p>{{ Number(petsDetail.price).toFixed(2) }} RMB</p>
      </div>
      <div class="hire-quantity">
        <p>总金额</p>
        <p>
          {{ (Number(petsDetail.price) * Number(hireForm.count)).toFixed(2) }}
          RMB
        </p>
      </div>
      <div class="hire-quantity">
        <p>每天收益</p>
        <p>{{ petsDetail.dailyInterest }}%</p>
      </div>
      <div class="password">
        <p>交易密码</p>
        <div>
          <van-password-input
            :value="hireForm.password2"
            info="密码为 6 位数字"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
          />
        </div>
      </div>
      <div class="btn">
        <van-button round type="info" block size="large" @click="panicBuying"
          >确认抢购</van-button
        >
      </div>
    </van-popup>
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
      safe-area-inset-bottom
    />
  </div>
</template>

<script>
import { petsDetail, rentPets, buyQuantity } from '../../api/index'
export default {
  data() {
    return {
      // 账户余额
      balance: null,
      popup: false,
      petsDetail: {},
      hireForm: {
        count: 1,
        password2: ''
      },
      showKeyboard: false,
      detailQuantity: null
    }
  },
  created() {
    this.getPersDetail()
    this.getBuyQuantity()
  },
  methods: {
    // 查看宠物详情
    getPersDetail() {
      const data = {
        id: this.$route.query.petsId
      }
      petsDetail(data).then(v => {
        if (v.status === 200) {
          this.petsDetail = v.data
          this.balance = v.data.balance
        }
      })
    },
    // 获取商品购买数量
    getBuyQuantity() {
      buyQuantity({ productId: this.$route.query.petsId }).then(v => {
        if (v.status === 200) {
          this.detailQuantity = v.data
        }
      })
    },
    // 确认抢购
    panicBuying() {
      if (this.hireForm.password2 === '') {
        return this.$toast.fail('请输入交易密码')
      } else if (
        Number(this.petsDetail.price) * Number(this.hireForm.count) >
        Number(this.balance)
      ) {
        return this.$toast.fail('余额不足')
      }
      const data = {
        count: this.hireForm.count,
        id: this.petsDetail.id,
        password2: this.hireForm.password2
      }
      rentPets(data).then(v => {
        if (v.status === 200) {
          this.$toast.success('抢购成功')
          setTimeout(() => {
            this.getPersDetail()
            this.getBuyQuantity()
            this.popup = false
          }, 1000)
        }
      })
    },
    // 返回
    onClickLeft() {
      this.$router.push({
        path: '/pet'
      })
    },
    showPopup() {
      this.popup = true
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
    // 关闭弹窗
    closePopup(e) {
      this.hireForm.count = 1
      this.hireForm.password2 = ''
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
  }
}
</script>
<style scoped lang="scss">
.pet-content {
  .pet-box {
    background: #fff;
    min-height: 240px;
    padding-bottom: 20px;
    .pet-image {
      width: 100%;
      height: 380px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pet-title {
      padding: 0 40px;
      display: flex;
      margin-top: 10px;
      > p:nth-child(1) {
        flex: 1;
        > span:nth-child(1) {
          font-size: 36px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 70px;
        }
        > span:nth-child(2) {
          padding: 4px 20px;
          background: #4b69eb;
          font-size: 30px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
          border-radius: 30px;
        }
      }
      > p:nth-child(2) {
        flex: 0.4;
        text-align: right;
        font-size: 28px;
        color: rgba(251, 148, 19, 1);
        line-height: 30px;
        .van-tag {
          font-size: 28px;
          height: 30px;
          line-height: 30px;
          padding: 16px 20px;
        }
      }
    }
    > div:nth-child(2),
    > div:nth-child(3) {
      display: flex;
      padding: 10px 40px;
      > p {
        margin: 0;
        flex: 1;
        font-size: 28px;
      }
      > p:nth-child(2) {
        text-align: right;
      }
    }
    .pet-price {
      display: flex;
      padding: 0 40px;
      margin-top: 16px;
      > p {
        margin: 0;
        flex: 1;
        font-size: 28px;
      }
      > p:nth-child(1) {
        > span:nth-child(1) {
          font-size: 32px;
          font-weight: 600;
        }
        > span:nth-child(2) {
          font-size: 36px;
          font-weight: 600;
          color: rgba(253, 81, 53, 1);
          line-height: 30px;
        }
      }
      > p:nth-child(2) {
        text-align: right;
      }
    }
  }
  .pet-detail {
    padding: 30px 40px;
    margin-top: 20px;
    background: #fff;
    h2 {
      font-size: 36px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      margin: 0;
    }
    > div:nth-child(2) {
      width: 100%;
      p {
        width: 100%;
        font-size: 28px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 48px;
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
  color: #fff !important;
  font-size: 36px;
}
.pet-content .popup .hire-quantity > p:nth-child(2) .van-stepper__input {
  font-size: 28px;
  border-bottom: 2px solid #ebedf0;
}
.pet-content .popup .password .van-password-input__info {
  font-size: 24px;
}
.pet-content .popup .btn .van-button {
  height: 60px;
  line-height: 60px;
  background: #415be1;
  font-size: 28px;
}
.pet-content .popup .van-popup__close-icon {
  color: #ccc;
  font-size: 32px;
}
.pet-content .popup .van-icon-cross {
  font-size: 32px;
}
.pet-content .van-popup {
  width: 70%;
  padding: 60px 40px 40px;
}
.pet-content .van-number-keyboard {
  z-index: 9999;
  padding-bottom: 0;
}
.pet-content .van-password-input {
  margin: 0;
}
.pet-content .van-password-input__security {
  height: 80px;
  line-height: 80px;
}
.pet-content .van-password-input__security li {
  border: 2px solid #ccc;
}
.pet-content .van-key {
  height: 60px;
  line-height: 60px;
}
.pet-content .pet-detail > div:nth-child(2) > p img {
  width: 100%;
}
.pet-content .pet-detail > div:nth-child(2) img {
  width: 100%;
}
.pet-content .pet-detail .van-button {
  height: 80px;
  line-height: 80px;
  font-size: 36px;
  background: #415be1;
}
.pet-content .pet-detail p {
  line-height: 60px;
  text-indent: 2em;
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
