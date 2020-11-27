<template>
  <div class="companyProfile">
    <van-nav-bar title="公司简介" fixed :placeholder="true" left-arrow @click-left="onClickLeft" />
    <div class="companyProfile-inifo">
      <div class="companyProfile-content">
        <h2>香港恒链投资集团有限公司</h2>
        <p>香港恒链投资集团有限公司成立于2018年，总部坐落于全球第三大金融中心~~~香港，是一家新起的高科技企业，一家高度专注于互联网技术的公司,基于公司自主研发的区块链底层技术,可为用户提供区块链航天科技、区块链医疗、技术交易、区块链金融、区块链宠物+、产业孵化全链条服务,打通高校、科研机构、企业间科技成果转化通道。围绕打造技术转移功能性平台的目标,坚持政府主导、市场化运作的模式,积极引导技术转移和技术交易机构集聚。</p>
        <p>公司自成立以来，始终坚持以人才为本、诚信立业的经营原则，荟萃业界精英，将国外先进的信息技术、管理方法及企业经验与国内企业的具体实际相结合，为企业供给全方位的解决方案，帮忙企业提高管理水平和生产本事，使企业在激烈的市场竞争中始终坚持竞争力，实现企业快速、稳定地发展。</p>
        <p>在专注知识产权保护的同时,恒链投资集团有限公司也非常重视人才的储备，恒链投资集团有限公司区块链应用事业部是一支实力雄厚的百人团队,除拥有多名博士、硕士等丰富学业背景的人员外,还有众多曾就职于华为、IBM、阿里巴巴、腾讯的高科技人才,具有丰富的底层区块链平台开发、测试及应用实践经验。目前恒链投资集团有限公司基于自主研发的区块链企业应用服务平台,开发了供应链金融平台、分布式光伏结算、分布式能源交易、集中式购电费结算、区块链电子学历、区块链电子合同及商品溯源等多款产品,并与香港航天科技集团、香港科技大学、长江集团、英国法通保险等展开合作,在数据存证、能源交易、食品溯源、星级酒店、商业广场、供应链金融、保险、区块链航天科技等领域实现了多个项目的成功落地。</p>
        <img src="../../assets/image/home02.jpg" alt="">
        <p>知识产权是企业技术水平的体现,是公司可持续发展的根本动力,恒链投资集团有限公司始终着力核心技术的研究,持续加大研发投入,以“科技推动进步,创新引领发展”为理念,推动企业升级、区块链革命、经济增长和社会进步。</p>
        <p>另外恒链投资集团有限公司将在宠物活体交易、宠物慈善、宠物游戏、宠物繁育、宠物电子、宠物产品/食品、宠物医疗产品、宠物基因、宠物保险、宠物美容、宠物培训、宠物社区、智能硬件、宠物衍生等多个领域发挥自己的实力，实现‘关爱宠物，共建和谐社会’的目标。</p>
        <img src="../../assets/image/home03.png" alt="">
        <p>"管理创造价值，服务提升优势，品质至上，服务至优"是集团公司的发展理念。团结、创新、务实、奋进是公司矢志不渝的追求。公司倍加珍惜每一分荣誉，坚持"质量第一、用户至上、以质兴业、以优取胜"的经营宗旨，不断将优秀产品贡献社会，与社会各界优势互补、同创辉煌!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
.companyProfile {
  min-height: calc(100vh);
  background: #fff;
  .companyProfile-inifo {
    padding: 40px 20px;
    .companyProfile-content {
      > h2 {
        text-align: center;
        font-size: 36px;
        color: #415be1;
      }
      > p {
        margin: 0;
        font-size: 28px;
        text-indent: 2em;
        line-height: 60px;
        margin-bottom: 40px;
      }
      img {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>
<style>
.companyProfile .van-nav-bar {
  height: 80px;
  background: #415be1;
}
.companyProfile .van-nav-bar .van-nav-bar__title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.companyProfile .van-nav-bar .van-icon {
  color: #fff;
  font-size: 36px;
}
</style>
