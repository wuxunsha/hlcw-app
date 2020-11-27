<template>
  <div>
    <van-tabbar v-model="active" route fixed placeholder>
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? home.active : home.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/machine">
        <span>矿机</span>
        <template #icon="props">
          <img :src="props.active ? machine.active : machine.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/transaction">
        <span>交易中心</span>
        <template #icon="props">
          <img
            :src="props.active ? transaction.active : transaction.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/pet">
        <span>宠物</span>
        <template #icon="props">
          <img :src="props.active ? pet.active : pet.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine.active : mine.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ['footerNavActive'],
  name: 'myFooter',
  data () {
    return {
      active: 0,
      home: {
        active: require('../../assets/image/footer/hone.png'),
        inactive: require('../../assets/image/footer/hone-no.png')
      },
      machine: {
        active: require('../../assets/image/footer/mining-machine.png'),
        inactive: require('../../assets/image/footer/mining-machine-no.png')
      },
      transaction: {
        active: require('../../assets/image/footer/transaction.png'),
        inactive: require('../../assets/image/footer/transaction-no.png')
      },
      pet: {
        active: require('../../assets/image/footer/pet.png'),
        inactive: require('../../assets/image/footer/pet-no.png')
      },
      mine: {
        active: require('../../assets/image/footer/mine.png'),
        inactive: require('../../assets/image/footer/mine-no.png')
      }
    }
  }
}
</script>
<style>
.van-tabbar {
  padding: 20px 0!important;
}
.van-tabbar-item__icon img {
  width: 40px!important;
  height: 40px!important;
}
.van-tabbar-item__text {
  margin-top: 4px;
  font-size: 22px;
}
</style>
