import request from './request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout(data) {
  return request({
    url: '/auth/logout',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCode(data) {
  return request({
    url: '/register/verify',
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// 修改登录密码
export function retrievePassword(data) {
  return request({
    url: '/update/pwd/one',
    method: 'post',
    data
  })
}

// 修改交易密码
export function changeTransactionPassword(data) {
  return request({
    url: '/update/pwd/two',
    method: 'post',
    data
  })
}

// 获取首页数据
export function homeList(data) {
  return request({
    url: '/index',
    method: 'get',
    data
  })
}

// 签到
export function sign(data) {
  return request({
    url: '/sign/moeny',
    method: 'post',
    data
  })
}

// 签到记录
export function signList(params) {
  return request({
    url: '/sign/list',
    method: 'get',
    params
  })
}

// 获取抽奖位置
export function winningPosition(data) {
  return request({
    url: '/lottery/money',
    method: 'post',
    data
  })
}

// 获取矿机列表
export function miningMachine(data) {
  return request({
    url: '/mine/miningMachine/index',
    method: 'get',
    data
  })
}

// 确认租用矿机
export function rentMine(data) {
  return request({
    url: '/mine/miningMachine/rentMine',
    method: 'post',
    data
  })
}

// 获取宠物列表
export function pets(params) {
  return request({
    url: '/mine/pets/index',
    method: 'get',
    params
  })
}

// 查看宠物详情
export function petsDetail(data) {
  return request({
    url: '/mine/pets/detail',
    method: 'post',
    data
  })
}

// 购买宠物
export function rentPets(data) {
  return request({
    url: '/mine/pets/rentPets',
    method: 'post',
    data
  })
}

// 获取公告列表
export function articleList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

// 查看公告详情
export function articleDetails(data) {
  return request({
    url: '/article/details/' + data,
    method: 'get'
  })
}

// 获取用户信息
export function userinfo(data) {
  return request({
    url: '/userinfo',
    method: 'get',
    data
  })
}

// 获取交易挂单信息
export function getPendingOrder(data) {
  return request({
    url: '/mine/eyStoreTradingCenter/getPageList',
    method: 'post',
    data
  })
}

// 发布买入
export function addEyStoreTradingCenter(params) {
  return request({
    url: '/mine/eyStoreTradingCenter/add',
    method: 'post',
    params
  })
}

// 成交买卖
export function dealTransaction(params) {
  return request({
    url: '/mine/eyStoreTradingCenter/transaction',
    method: 'post',
    params
  })
}

// 取消订单
export function cancelOrder(params) {
  return request({
    url: '/mine/eyStoreTradingCenter/canneTradingCenter',
    method: 'post',
    params
  })
}

// 我的矿机
export function getMyMine(data) {
  return request({
    url: '/getMyMine',
    method: 'get',
    data
  })
}

// 我的宠物
export function getMyPets(data) {
  return request({
    url: '/getMyPets',
    method: 'get',
    data
  })
}

// 查看绑定银行卡
export function bankInfo(data) {
  return request({
    url: '/eyUserBank/info',
    method: 'post',
    data
  })
}

// 绑定银行卡
export function addBank(data) {
  return request({
    url: '/eyUserBank/add',
    method: 'post',
    data
  })
}

// 获取RMB记录
export function balanceRecord(params) {
  return request({
    url: '/balanceRecord',
    method: 'get',
    params
  })
}

// 获取HLC记录
export function mineRecord(params) {
  return request({
    url: '/mineRecord',
    method: 'get',
    params
  })
}

// 提现记录
export function extract(params) {
  return request({
    url: '/extract/getExtract',
    method: 'get',
    params
  })
}

// 充值记录
export function recharge(params) {
  return request({
    url: '/recharge/getRecharge',
    method: 'get',
    params
  })
}

// 获取充值方式
export function rechargeType(params) {
  return request({
    url: '/recharge/rechargeBankInfo',
    method: 'get',
    params
  })
}

// 充值
export function addRecharge(data) {
  return request({
    url: '/recharge/addCash',
    method: 'post',
    data
  })
}

// 获取充值二维码
export function rechargeQcode(data) {
  return request({
    url: '/recharge/rechargeBankInfo',
    method: 'post',
    data
  })
}

// 修改用户信息
export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

// 提现
export function withdraw(data) {
  return request({
    url: '/extract/addCash',
    method: 'post',
    data
  })
}

// 分享二维码
export function qsCode(params) {
  return request({
    url: '/spread/banner',
    method: 'get',
    params
  })
}

// 我的团队
export function myTeam(params) {
  return request({
    url: '/group/getMyTeam',
    method: 'get',
    params
  })
}

// 团队下级成员
export function groupLower(data) {
  return request({
    url: '/group/getLower',
    method: 'post',
    data
  })
}

// 交易记录
export function tradingCenterByAccount(params) {
  return request({
    url: '/mine/eyStoreTradingCenter/getTradingCenterByMy',
    method: 'get',
    params
  })
}

// 获取APP版本号
export function getAppVersion(params) {
  return request({
    url: '/auth/getAppVersion',
    method: 'get',
    params
  })
}

// 获取商品限购数量
export function buyQuantity(params) {
  return request({
    url: '/order/buyQuantity',
    method: 'get',
    params
  })
}

// 获取手续费
export function feeOrUserInfo(params) {
  return request({
    url: '/feeOrUserInfo',
    method: 'get',
    params
  })
}

// 交易记录
export function test(params) {
  return request({
    url: '/mine/eyStoreTradingCenter/test',
    method: 'get',
    params
  })
}

// 团队提现记录
export function groupExtract(params) {
  return request({
    url: '/extract/getGroupExtract',
    method: 'get',
    params
  })
}

// 团队充值记录
export function groupRecharge(params) {
  return request({
    url: '/recharge/getGroupRecharge',
    method: 'get',
    params
  })
}
