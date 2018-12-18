<template>
  <div class="left">
    <div class="user">
      <div class="img"><img src="../../assets/images/mine/user.png" alt=""></div>
      <div class="tel">{{mobile}}</div>
      <!-- 0 开通会员 1 普通会员 2 vip会员 3 白金会员 4 会员过期 -->
      <p v-if="memberInfo.memberLevel==0">开通会员</p>
      <p v-if="memberInfo.memberLevel==1">普通会员</p>
      <p v-if="memberInfo.memberLevel==2">vip会员</p>
      <p v-if="memberInfo.memberLevel==3">白金会员</p>
      <p v-if="memberInfo.memberLevel==4">会员续费</p>
      <ul>
        <li :class="{cur: isCur1}"><span></span><nuxt-link :to="{name:'mine-myAttention'}">我的关注</nuxt-link></li>
        <li @click="loginOutFun()"><span></span>退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Footer from '~/components/Footer/Footer';
export default {
  data(){
    return{
      mobile: "",
      memberInfo: "",
      memberLevel: "",
      isCur1: false,
    }
  },
  mounted() {
    this.init()
    var url = window.location.href;
    if(url.indexOf("myAttention") != -1){
      this.isCur1 = true;
    }
  },
  methods:{
    init() {
      var that = this;
      axios({
        url: '/member/auth/memberInfo',
        method: 'post'
      }).then(res => {
        console.log(res);
        this.memberInfo = res.data.memberInfo;
        this.$emit('memberLevel', this.memberInfo.memberLevel)
        var str = res.data.memberInfo.mobile;
        this.mobile = str.substr(0,3)+"****"+str.substr(7);
      }).catch(err => {
        console.log(err)
      });
    },
    loginOutFun(){
      var that = this;
      this.$confirm('确定要退出登录么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message("退出成功！")
        window.localStorage.clear();
        that.$router.push({name:"index"});
      }).catch(() => {
        this.$message("取消退出！")
      });
    }
  }
}
</script>


<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>

