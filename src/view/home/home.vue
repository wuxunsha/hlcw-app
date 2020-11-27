<template>
  <div class="home">
    <div class="swipe">
      <van-swipe :autoplay="2000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index" @click="bannerPath(item)">
          <img :src="item.pic" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="announcement">
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item v-for="item in newsList" :key="item.id" @click="detail(item.id)">{{ item.title }}</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>
    <div class="nav-box">
      <div class="nav-bar">
        <div v-for="item in navbarList" :key="item.id" @click="navPath(item)">
          <img :src="item.pic" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="activity">
      <div class="activity-content lottery-box" id="app">
        <div class="sign-in">
          <div class="sign-in-title">
            <p>每日签到有礼</p>
            <p>
              <span @click="signInDetails">签到明细</span>
            </p>
          </div>
          <div class="sign-in-box">
            <div class="sign-in-bg">
              <div v-for="(item, index) in signInList" :key="item + index">
                <span :class="signNum === 0 ? '' : signNum > index ? 'active' : ''" @click.once="signIn(index)">{{ item.day !== '7' ? item.day : '' }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="lottery">
          <div class="lottery-item">
            <div class="lottery-start">
              <div class="box gray" v-if="isStart === 0">
                <p>活动未开始</p>
              </div>
              <div class="box" @click="startLottery" v-if="isStart === 1">
                <p>
                  <b>抽奖</b>
                </p>
                <p>剩余{{ score }}次</p>
              </div>
              <div class="box gray" v-if="isStart === 2">
                <p>活动已过期</p>
              </div>
            </div>
            <ul>
              <li v-for="(item, i) in lotteryList" :key="i" :class="i == index ? 'on' : ''">
                <div class="box">
                  <p>
                    <img :src="item.pic" alt="" />
                  </p>
                  <p>{{ item.title }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 中奖弹窗 -->
    <div class="mask" v-if="showToast"></div>
    <div class="lottery-alert" v-if="showToast">
      <template v-if="lotteryList[index].title === '谢谢惠顾'">
        <p>
          <img src="../../assets/image/home/fly-away.png" alt="" />
        </p>
        <h2>哎呀，没抽中奖，再接再厉喽!</h2>
        <div class="btnsave" @click="showToast = false">再来一次</div>
      </template>
      <template v-else>
        <h1>恭喜您</h1>
        <p>
          <img :src="lotteryList[index].pic" alt="" />
        </p>
        <h2>获得{{ lotteryList[index].title }}</h2>
        <div class="btnsave" @click="showToast = false">确定</div>
      </template>
    </div>
    <myFooter :footerNavActive="activeType"></myFooter>
  </div>
</template>

<script>
import { homeList, winningPosition, sign } from '../../api/index'
import myFooter from '../../components/footer/footer.vue'
export default {
  data() {
    return {
      activeType: 'home',
      // 轮播图
      bannerList: [],
      // 公告
      newsList: [],
      // 导航栏
      navbarList: [],
      // 签到数据
      signInList: [],
      // 签到开关
      signFlag: null,
      // 抽奖按钮控制开关
      lotteryFlag: false,
      isStart: 1,
      // 消耗次数
      score: 0,
      // 奖品1-9
      lotteryList: [],
      // 当前转动到哪个位置，起点位置
      index: -1,
      // 总共有多少个位置
      count: 8,
      // 每次转动定时器
      timer: 0,
      // 初始转动速度
      speed: 200,
      // 转动次数
      times: 0,
      // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      cycle: 50,
      // 中奖位置
      prize: -1,
      click: true,
      // 显示中奖弹窗
      showToast: false,
      // 签到天数
      signNum: null
    }
  },
  methods: {
    // 获取数据
    getHomeData() {
      homeList().then(v => {
        if (v.status === 200) {
          this.bannerList = v.data.banner
          this.newsList = v.data.news
          this.navbarList = v.data.menus
          this.lotteryList = v.data.lottery
          this.signInList = v.data.sign
          this.score = v.data.user.lotteryNum
          this.signNum = v.data.user.signNum
          this.signFlag = v.data.user.isDaySign
        }
      })
    },
    startLottery() {
      if (this.score === 0) {
        return this.$toast.fail('抽奖次数已用完，请明天再来')
      }
      if (!this.lotteryFlag) {
        this.score = this.score - 1
        this.getWinningPosition()
        this.startRoll()
        this.lotteryFlag = true
      }
    },
    // 签到
    signIn(i) {
      if (!this.signFlag) {
        if (this.signNum === i) {
          sign().then(v => {
            if (v.status === 200) {
              this.signNum++
              this.$toast.success('签到成功')
            }
          })
          if (this.signNum === 7) {
            this.signNum = 7
          }
          this.signFlag = true
        }
      }
    },
    // 获取中奖位置
    getWinningPosition() {
      winningPosition().then(v => {
        if (v.status === 200) {
          this.prize = v.data.index
        }
      })
    },
    // 开始转动
    startRoll() {
      // 转动次数
      this.times += 1
      this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 10 && this.prize === this.index) {
        // 清除转动定时器，停止转动
        clearTimeout(this.timer)
        this.prize = -1
        this.times = 0
        this.speed = 200
        this.click = true
        var that = this
        setTimeout(() => {
          this.lotteryFlag = false
          that.showToast = true
        }, 500)
      } else {
        if (this.times < this.cycle) {
          // 加快转动速度
          this.speed -= 10
        } else if (this.times === this.cycle) {
          // 随机获得一个中奖位置
          // const index = parseInt(Math.random() * 10, 0) || 0
          // 中奖位置,可由后台返回
          // this.prize = index
          if (this.prize > 7) {
            this.prize = 7
          }
        } else if (
          this.times > this.cycle + 10 &&
          ((this.prize === 0 && this.index === 7) ||
            this.prize === this.index + 1)
        ) {
          this.speed += 110
        } else {
          this.speed += 20
        }
        if (this.speed < 40) {
          this.speed = 40
        }
        this.timer = setTimeout(this.startRoll, this.speed)
      }
    },
    // 每一次转动
    oneRoll() {
      // 当前转动到哪个位置
      let index = this.index
      // 总共有多少个位置
      const count = this.count
      index += 1
      if (index > count - 1) {
        index = 0
      }
      this.index = index
    },
    // 轮播图跳转
    bannerPath(data) {
      if(data.isOut === 1) {
        this.$router.push({
          path: data.in_url
        })
      } else {
        location.href = data.out_url
      }
    },
    // icon导航跳转
    navPath(data) {
      if (data.isOut === 1) {
        this.$router.push({
          path: data.in_url
        })
      } else {
        location.href = data.out_url
      }
    },
    // 签到记录
    signInDetails() {
      this.$router.push({
        path: '/signInDetails'
      })
    },
    // 查看公告详情
    detail(id) {
      this.$router.push({
        path: '/announcementDetail',
        query: {
          articleId: id
        }
      })
    }
  },
  created() {
    console.log(this.$store.state.userInfo)
    // let userInfo = this.$store.state.userInfo
    this.getHomeData()
  },
  components: {
    myFooter
  }
}
</script>
<style scoped lang="scss">
* {
  box-sizing: border-box;
}
img {
  border: 0px;
}
p {
  margin: 0;
}
ul,
li {
  list-style-type: none;
}
@keyframes changeBg {
  0% {
    background-image: url(../../assets/image/home/k1.png);
  }
  100% {
    background-image: url(../../assets/image/home/k2.png);
  }
}
.home {
  .swipe {
    width: 100%;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .announcement {
    padding: 10px 20px;
    background: #fff;
  }
  .nav-box {
    margin-top: 20px;
    padding: 10px 30px;
    .nav-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      height: 190px;
      padding: 0 26px;
      border-radius: 20px;
      box-shadow: 0px 6px 12px rgba(109, 109, 109, 0.1);
      > div {
        width: 25%;
        text-align: center;
        img {
          width: 90px;
          margin-bottom: 10px;
        }
        > p {
          margin: 0;
          font-size: 30px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .activity {
    padding: 10px 30px;
    .activity-content {
      background: #fff;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0px 6px 12px rgba(109, 109, 109, 0.1);
    }
    .lottery-box {
      overflow: hidden;
      .sign-in {
        margin: 20px 0;
        .sign-in-title {
          display: flex;
          height: 40px;
          line-height: 40px;
          > p:nth-child(1) {
            flex: 1;
            font-size: 40px;
            font-weight: bold;
            color: #333;
          }
          > p:nth-child(2) {
            flex: 1;
            text-align: right;
            font-size: 28px;
            font-weight: bold;
            color: #fd8727;
          }
        }
        .sign-in-box {
          position: relative;
          height: 80px;
          width: 100%;
          margin-top: 40px;
          .sign-in-bg {
            display: flex;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 100%;
            height: 80px;
            line-height: 80px;
            background: url('../../assets/image/home/sign-in-bg.png') no-repeat
              center center;
            background-size: 100% 20%;
            > div {
              > span {
                display: inline-block;
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: linear-gradient(157deg, #f5f5f9 0%, #dfdcda 100%);
                border-radius: 50%;
                font-size: 24px;
                font-weight: 400;
                color: #333;
              }
              .active {
                background: linear-gradient(157deg, #fcc261 0%, #fd8727 100%);
                color: #fff;
              }
            }
            > div:nth-child(2),
            > div:nth-child(3),
            > div:nth-child(4),
            > div:nth-child(5),
            > div:nth-child(6) {
              flex: 1;
              text-align: center;
            }
            > div:first-child {
              width: 70px;
              text-align: left;
            }
            > div:last-child {
              width: 80px;
              text-align: right;
              margin-right: -16px;
              > span {
                display: inline-block;
                width: 80px;
                height: 80px;
                background: url('../../assets/image/home/lp.png') no-repeat
                  center right;
                background-size: 100% 100%;
              }
            }
          }
        }
      }
      .lottery {
        animation: changeBg 0.5s ease infinite;
        overflow: hidden;
        padding: 20px;
        width: 100%;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .lottery-item {
          height: 340px;
          position: relative;
          margin: 10px 15px 0 25px;
          ul {
            li {
              width: 33.33333333%;
              position: absolute;
              padding-right: 10px;
            }
            li:nth-child(2) {
              left: 33.33333333%;
            }
            li:nth-child(3) {
              left: 66.66666666%;
            }
            li:nth-child(4) {
              left: 66.66666666%;
              top: 110px;
            }
            li:nth-child(5) {
              left: 66.66666666%;
              top: 220px;
            }
            li:nth-child(6) {
              left: 33.33333333%;
              top: 220px;
            }
            li:nth-child(7) {
              left: 0;
              top: 220px;
            }
            li:nth-child(8) {
              left: 0;
              top: 110px;
            }
            .box {
              height: 100px;
              position: relative;
              text-align: center;
              overflow: hidden;
              background: url(../../assets/image/home/bg2.png) no-repeat center;
              background-size: 100% 100%;
              img {
                display: block;
                height: 50px;
                margin: 0 auto;
                margin-top: 10px;
                margin-bottom: 5px;
              }
              p {
                color: #4b6aeb;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 24px;
                margin: 0;
              }
            }
            li.on {
              .box {
                background: url(../../assets/image/home/bg1.png) no-repeat
                  center;
                background-size: 100% 100%;
                p {
                  color: #fff;
                }
              }
            }
          }
          .lottery-start {
            position: absolute;
            left: 33.33333333%;
            width: 33.33333333%;
            top: 110px;
            padding-right: 10px;
            .box {
              height: 100px;
              font-size: 24px;
              color: #fff;
              cursor: pointer;
              text-align: center;
              overflow: hidden;
              background: url(../../assets/image/home/bg1.png) no-repeat center;
              background-size: 100% 100%;
              p {
                b {
                  font-size: 36px;
                  margin-top: 16px;
                  margin-bottom: 12px;
                  line-height: 30px;
                  display: block;
                }
              }
            }
            .box:active {
              opacity: 0.7;
            }
            .box.gray {
              background: url(../../assets/image/home/bg3.png) no-repeat center;
              background-size: 100% 100%;
              p {
                color: #708abf;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    overflow: hidden;
    z-index: 222;
    top: 0;
    left: 0;
  }
  .lottery-alert {
    max-width: 400px;
    text-align: center;
    z-index: 10000;
    border-radius: 10px;
    background: #fff;
    padding: 20px;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    h1 {
      font-size: 30px;
      font-weight: bold;
      color: #4b6aeb;
    }
    img {
      display: block;
      height: 120px;
      margin: 0 auto;
    }
    h2 {
      font-weight: normal;
      color: #4b6aeb;
      font-size: 24px;
      padding-top: 15px;
    }
    p {
      color: #666;
      font-size: 32px;
      padding-top: 5px;
    }
    .btnsave {
      border-radius: 6px;
      box-shadow: none;
      height: 50px;
      cursor: pointer;
      line-height: 50px;
      color: #fff;
      margin-top: 12px;
      background: #4b6aeb;
      font-size: 24px;
    }
  }
}
</style>
<style>
.home .swipe .van-swipe {
  height: 100%;
}
.home .announcement .notice-swipe {
  height: 80px;
  line-height: 80px;
  font-size: 28px;
}
.home .announcement .van-notice-bar {
  background: none;
}
.home .announcement .van-notice-bar__wrap {
  margin-left: 20px;
  color: #333333;
}
.home .announcement .van-notice-bar__left-icon {
  font-size: 36px;
  color: #4b6aeb;
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
