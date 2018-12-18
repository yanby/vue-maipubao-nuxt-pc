<template>
  <div class="mine">
    <Nav></Nav>
    <div class="content w1200 clearfix">
      <User></User>
      <div class="right">
        <div class="myAttention">
          <h3>我的关注</h3>
          <h4><span :class="{'cur':type==1}" @click="xiaoshouFun()">销售项目</span><span :class="{'cur':type==2}" @click="zhaoshangFun()">招商项目</span></h4>
          <ul class="shop-left">
            <li v-if="nodata==false" v-for="item in projectList" @click="goShopDetail(item)">
              <div class="img">
                <img :src="item.pictures" alt="">
                <div v-if="item.topStatus===1" class="zhiding"></div>
              </div>
              <div class="txt">
                <h5>{{item.project_name}}</h5>
                <p><b></b>{{item.address}}</p>
                <div class="tag">
                  <span v-if="index1 < 3" v-for="(item1,index1) in item.tag">{{item1}}</span>
                </div>
              </div>
              <div class="price">
                <b class="guanzhu" @click.stop="cancelFun(item)">取消关注</b>
                <div v-if="type==1"><span>{{item.price}}</span>元/㎡</div>
                <div v-if="type==2"><span>{{item.price}}</span>元/㎡/天</div>
                <p>(均价)</p>
              </div>
            </li>
            <div class="nodata" v-if="nodata"><p><span></span></p><p>暂无数据</p></div>
          </ul>
        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
          </el-pagination>
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
      type: 1,
      pageSize:10,
      projectList: "",
      pageSize: 10,//条数
      pageNum: 1,//第几页
      curPage: 1,
      totalCount:0,//铺源总数
      nodata: false
    }
  },
  components: {
    Nav,
    Footer,
    User
  },
  mounted(){
    this.init(this.type);
  },
  methods:{
    init(type){
      axios({
        url: '/member/auth/favoriteList',
        method: 'post',
        params:{
          pageSize: this.pageSize,// 每页数据量【必传】
          pageNum: this.pageNum, //页码从1开始【必传】
          projectType: type //项目类型，1是销售，2是招商【必传】
        }
      }).then(res => {
        console.log(res);
        this.projectList = res.data.favoriteList;
        this.totalCount = Number(res.data.totalCount);
        if(this.projectList.length==0){
          this.nodata = true;
        }else{
          this.nodata = false;
        }
      }).catch(err => {
        console.log(err)
      });
    },
    xiaoshouFun(){
      this.type = 1;
      this.init(this.type);
    },
    zhaoshangFun(){
      this.type = 2;
      this.init(this.type);
    },
    handleCurrentChange(val){//分页
      console.log(val)
      this.pageNum = val;
      this.init(this.type);
      $('html,body').animate({scrollTop: 100},100);
    },
    cancelFun(item){
      axios({
        url: '/member/auth/cancelFavorites',
        method: 'post',
        params:{
          projectId: item.projectId
        }
      }).then(res => {
        console.log(res);
        this.init(this.type);
      }).catch(err => {
        console.log(err)
      });
    },
    goShopDetail(item){
      if(this.type == 1){
        window.open("/sell/sellDetail/"+item.projectType+"/"+item.projectId+"/"+item.houseType);
      }else if(this.type == 2){
        window.open("/sell/sellDetail/"+item.projectType+"/"+item.projectId+"/"+item.houseType);
      }
    }
  }
}
</script>


<style lang="less" type="text/less" scoped>
  @import '../../assets/css/mine.less';
  @import '../../assets/css/shopMsg.less';
  @import '../../assets/css/shopPages.less';
</style>

