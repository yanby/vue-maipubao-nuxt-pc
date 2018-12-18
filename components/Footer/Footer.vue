<template>
    <div class="Footer">
        <div class="wrap">
            <div class="wrap_box">
              <div class="about_up">
                <nuxt-link :to="{name:'introduce-aboutUp'}"><b></b>关于优铺</nuxt-link>
                <nuxt-link :to="{name:'introduce-joinUp'}"><b></b>加盟优铺</nuxt-link>
                <nuxt-link :to="{name:'introduce-collegeUp'}"><b></b>优铺商学院</nuxt-link>
                <a href="http://www.zhongjinglianmeng.com/" target="_blank">中经联盟</a>
                <a href="http://zyss.youpuchina.com/" target="_blank">中耀盛世</a>
              </div>
              <div class="product">
                <span>优铺控股旗下产品:</span>&nbsp;
                <a href="http://youpuglobal.com/" target="_blank">卖铺宝</a>
                <a href="http://www.youpuchina.com/" target="_blank">租铺宝</a>
                <a href="http://college.youpuchina.com" target="_blank">优铺商学院</a>
              </div>
              <div class="youpu_code">
                  <dl>
                      <dt><img src="../../assets/images/footer/zupubao.png"></dt>
                      <dd>优铺-租铺宝</dd>
                  </dl>
                <dl>
                  <dt><img src="../../assets/images/footer/fuwuhao.png"></dt>
                  <dd>优铺-租铺宝</dd>
                </dl>
              </div>
              <div class="copyright">
                  <p>版权所有：北京优铺网络科技有限公司  Copyright 2016 Beijing Youpu Network Technology Co., Ltd</p>
                  <p>京ICP备16035060号 客服电话：4008988808</p>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  },
  methods:{

  },
  created(){

  }
}
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/footer.less';
</style>
