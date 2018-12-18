<template>
  <div class="mine">
    <div class="model" v-if="download">
      <div class="down">
        <span @click="download=false"></span>
        <p>开通会员查看更多品牌联系人信息 敬请下载APP</p>
        <div></div>
      </div>
    </div>
    <Nav></Nav>
    <div class="content w1200 clearfix">
      <User @memberLevel="memberLevelFun"></User>
      <div class="right">
        <div class="yesMembers" v-if="huiyuan!=0 && huiyuan!=4">
          <div class="date">
            <p>会员有效期至 {{list.end_time}}</p>
            <h3>今日剩余查看次数：<span>{{list.view_count}}</span></h3>
          </div>
          <div class="quanyi">
            <h4><span></span>会员权益</h4>
            <p>
              <img src="../../assets/images/mine/putong.png" alt="" v-if="list.goods_id==1">
              <img src="../../assets/images/mine/baijing.png" alt="" v-if="list.goods_id==2">
              <img src="../../assets/images/mine/vip.png" alt="" v-if="list.goods_id==3">
            </p>
          </div>
        </div>
        <div class="noMembers" v-if="huiyuan==0">
          <div class="img"></div>
          <p>您还不是会员</p>
          <p>立即开通会员可以获得更多次查看品牌联系人的机会！</p>
          <div class="btn" @click="download=true">开通会员</div>
        </div>
        <div class="noMembers" v-if="huiyuan==4">
          <div class="img"></div>
          <p>您的会员已经到期</p>
          <p>会员续费可以获得更多次查看品牌联系人的机会！</p>
          <div class="btn" @click="download=true">会员续费</div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import User from '~/components/User/User';
  import Footer from '~/components/Footer/Footer';
export default {
  data(){
    return{
      list: "",
      goods_id: "",
      huiyuan: "",
      download: false
    }
  },
  components: {
    Nav,
    Footer,
    User
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      axios({
        url:"/member/auth/selectMemberInfo",
        method: 'post',
      }).then(res => {
        console.log(res)
        if(res.data.code == 101){
          this.list = res.data.list;
        }
      }).catch(err => {
        console.log(err)
      });
    },
    memberLevelFun(msg){
      this.huiyuan = msg;
    }
  }
}
</script>


<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
</style>

