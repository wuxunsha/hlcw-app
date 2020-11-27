import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/view/home/home'], resolve),
      meta: {keepAlive: true, title: '首页', requireAuth: true}
    },
    {
      path: '/inviteFriends',
      name: 'inviteFriends',
      component: (resolve) => require(['@/view/home/inviteFriends'], resolve),
      meta: {keepAlive: true, title: '邀请好友', requireAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/view/login/login'], resolve),
      meta: {keepAlive: true, title: '登录', requireAuth: false}
    },
    {
      path: '/register',
      name: 'register',
      component: (resolve) => require(['@/view/register/register'], resolve),
      meta: {keepAlive: true, title: '注册', requireAuth: false}
    },
    {
      path: '/machine',
      name: 'machine',
      component: (resolve) => require(['@/view/machine/machine'], resolve),
      meta: {keepAlive: true, title: '矿机', requireAuth: true}
    },
    {
      path: '/myMachine',
      name: 'myMachine',
      component: (resolve) => require(['@/view/machine/myMachine'], resolve),
      meta: {keepAlive: true, title: '我的矿机', requireAuth: true}
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: (resolve) => require(['@/view/transaction/transaction'], resolve),
      meta: {keepAlive: true, title: '交易中心', requireAuth: true}
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: (resolve) => require(['@/view/transaction/myOrder'], resolve),
      meta: {keepAlive: true, title: '我的订单', requireAuth: true}
    },
    {
      path: '/transactionRecord',
      name: 'transactionRecord',
      component: (resolve) => require(['@/view/transaction/transactionRecord'], resolve),
      meta: {keepAlive: true, title: '交易记录', requireAuth: true}
    },
    {
      path: '/pet',
      name: 'pet',
      component: (resolve) => require(['@/view/pet/pet'], resolve),
      meta: {keepAlive: true, title: '宠物', requireAuth: true}
    },
    {
      path: '/myPet',
      name: 'myPet',
      component: (resolve) => require(['@/view/pet/myPet'], resolve),
      meta: {keepAlive: true, title: '我的宠物', requireAuth: true}
    },
    {
      path: '/petDetail',
      name: 'petDetail',
      component: (resolve) => require(['@/view/pet/petDetail'], resolve),
      meta: {keepAlive: true, title: '宠物详情', requireAuth: true}
    },
    {
      path: '/mine',
      name: 'mine',
      component: (resolve) => require(['@/view/mine/mine'], resolve),
      meta: {keepAlive: true, title: '我的', requireAuth: true}
    },
    {
      path: '/mineTeam',
      name: 'mineTeam',
      component: (resolve) => require(['@/view/mine/mineTeam'], resolve),
      meta: {keepAlive: true, title: '我的团队', requireAuth: true}
    },
    {
      path: '/memberList',
      name: 'memberList',
      component: (resolve) => require(['@/view/mine/memberList'], resolve),
      meta: {keepAlive: true, title: '成员列表', requireAuth: true}
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: (resolve) => require(['@/view/mine/recharge'], resolve),
      meta: {keepAlive: true, title: '充值', requireAuth: true}
    },
    {
      path: '/rechargePayment',
      name: 'rechargePayment',
      component: (resolve) => require(['@/view/mine/rechargePayment'], resolve),
      meta: {keepAlive: true, title: '充值支付', requireAuth: true}
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: (resolve) => require(['@/view/mine/withdraw'], resolve),
      meta: {keepAlive: true, title: '提现', requireAuth: true}
    },
    {
      path: '/announcementList',
      name: 'announcementList',
      component: (resolve) => require(['@/view/announcement/announcementList'], resolve),
      meta: {keepAlive: true, title: '公告列表', requireAuth: true}
    },
    {
      path: '/announcementDetail',
      name: 'announcementDetail',
      component: (resolve) => require(['@/view/announcement/announcementDetail'], resolve),
      meta: {keepAlive: true, title: '公告详情', requireAuth: true}
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: (resolve) => require(['@/view/mine/helpCenter'], resolve),
      meta: {keepAlive: true, title: '帮助中心', requireAuth: true}
    },
    {
      path: '/videoIntroduction',
      name: 'videoIntroduction',
      component: (resolve) => require(['@/view/mine/videoIntroduction'], resolve),
      meta: {keepAlive: true, title: '视频简介', requireAuth: true}
    },
    {
      path: '/noviceGuide',
      name: 'noviceGuide',
      component: (resolve) => require(['@/view/mine/noviceGuide'], resolve),
      meta: {keepAlive: true, title: '新手指引', requireAuth: true}
    },
    {
      path: '/modelSystem',
      name: 'modelSystem',
      component: (resolve) => require(['@/view/mine/modelSystem'], resolve),
      meta: {keepAlive: true, title: '模式与制度', requireAuth: true}
    },
    {
      path: '/platformIntroduction',
      name: 'platformIntroduction',
      component: (resolve) => require(['@/view/mine/platformIntroduction'], resolve),
      meta: {keepAlive: true, title: '平台简介', requireAuth: true}
    },
    {
      path: '/companyProfile',
      name: 'companyProfile',
      component: (resolve) => require(['@/view/mine/companyProfile'], resolve),
      meta: {keepAlive: true, title: '公司简介', requireAuth: true}
    },
    {
      path: '/rewardsSystem',
      name: 'rewardsSystem',
      component: (resolve) => require(['@/view/mine/rewardsSystem'], resolve),
      meta: {keepAlive: true, title: '推广与升级奖励制度', requireAuth: true}
    },
    {
      path: '/address',
      name: 'address',
      component: (resolve) => require(['@/view/mine/address'], resolve),
      meta: {keepAlive: true, title: '地址电话', requireAuth: true}
    },
    {
      path: '/personalInformation',
      name: 'personalInformation',
      component: (resolve) => require(['@/view/mine/personalInformation'], resolve),
      meta: {keepAlive: true, title: '个人信息', requireAuth: true}
    },
    {
      path: '/systemSettings',
      name: 'systemSettings',
      component: (resolve) => require(['@/view/mine/systemSettings'], resolve),
      meta: {keepAlive: true, title: '系统设置', requireAuth: true}
    },
    {
      path: '/accountSecurity',
      name: 'accountSecurity',
      component: (resolve) => require(['@/view/mine/accountSecurity'], resolve),
      meta: {keepAlive: true, title: '账号与安全', requireAuth: true}
    },
    {
      path: '/forgetPass',
      name: 'forgetPass',
      component: (resolve) => require(['@/view/forgetPass/forgetPass'], resolve),
      meta: {keepAlive: true, title: '忘记密码', requireAuth: false}
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: (resolve) => require(['@/view/forgetPass/changePassword'], resolve),
      meta: {keepAlive: true, title: '修改登录密码', requireAuth: true}
    },
    {
      path: '/modifyTransactionPass',
      name: 'modifyTransactionPass',
      component: (resolve) => require(['@/view/forgetPass/modifyTransactionPass'], resolve),
      meta: {keepAlive: true, title: '修改交易密码', requireAuth: true}
    },
    {
      path: '/retrieveTransactionPass',
      name: 'retrieveTransactionPass',
      component: (resolve) => require(['@/view/forgetPass/retrieveTransactionPass'], resolve),
      meta: {keepAlive: true, title: '找回交易密码', requireAuth: true}
    },
    {
      path: '/changeUsername',
      name: 'changeUsername',
      component: (resolve) => require(['@/view/mine/changeUsername'], resolve),
      meta: {keepAlive: true, title: '修改昵称', requireAuth: true}
    },
    {
      path: '/bankCard',
      name: 'bankCard',
      component: (resolve) => require(['@/view/mine/bankCard'], resolve),
      meta: {keepAlive: true, title: '银行卡', requireAuth: true}
    },
    {
      path: '/addBankCard',
      name: 'addBankCard',
      component: (resolve) => require(['@/view/mine/addBankCard'], resolve),
      meta: {keepAlive: true, title: '添加银行卡', requireAuth: true}
    },
    {
      path: '/withdrawalsRecord',
      name: 'withdrawalsRecord',
      component: (resolve) => require(['@/view/recording/withdrawalsRecord'], resolve),
      meta: {keepAlive: true, title: '提现记录', requireAuth: true}
    },
    {
      path: '/rechargeRecord',
      name: 'rechargeRecord',
      component: (resolve) => require(['@/view/recording/rechargeRecord'], resolve),
      meta: {keepAlive: true, title: '充值记录', requireAuth: true}
    },
    {
      path: '/rmbRecording',
      name: 'rmbRecording',
      component: (resolve) => require(['@/view/recording/rmbRecording'], resolve),
      meta: {keepAlive: true, title: 'RMB记录', requireAuth: true}
    },
    {
      path: '/ubRecording',
      name: 'ubRecording',
      component: (resolve) => require(['@/view/recording/ubRecording'], resolve),
      meta: {keepAlive: true, title: 'HLC记录', requireAuth: true}
    },
    {
      path: '/signInDetails',
      name: 'signInDetails',
      component: (resolve) => require(['@/view/recording/signInDetails'], resolve),
      meta: {keepAlive: true, title: '签到记录', requireAuth: true}
    },
    {
      path: '/signInRule',
      name: 'signInRule',
      component: (resolve) => require(['@/view/recording/signInRule'], resolve),
      meta: {keepAlive: true, title: '签到规则', requireAuth: true}
    },
    {
      path: '/teamRechargeRecord',
      name: 'teamRechargeRecord',
      component: (resolve) => require(['@/view/recording/teamRechargeRecord'], resolve),
      meta: {keepAlive: true, title: '团队充值记录', requireAuth: true}
    },
    {
      path: '/teamWithdrawalRecord',
      name: 'teamWithdrawalRecord',
      component: (resolve) => require(['@/view/recording/teamWithdrawalRecord'], resolve),
      meta: {keepAlive: true, title: '团队提现记录', requireAuth: true}
    }
  ]
})
