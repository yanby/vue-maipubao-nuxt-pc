<template>
  <div class="sellList">
    <Nav></Nav>
    <div class="search-wrap">
      <h2 class="w1200">
        <div class="search">
          <b></b>
          <input type="text" placeholder="请输入项目名称" v-model="search" @keyup.enter="searchFun()"><button @click="searchFun()">开始搜索</button>
        </div>
      </h2>
    </div>
    <div class="shopList w1200">
      <div class="search-list">
        <ul class="one">
          <li class="oneArea">
            <span>区<b>域</b></span>
            <div id="areasChildren" class="two">
              <b @click="regionFun($event,item)" v-for="item in list.districtList">{{item.area_name}}</b>
            </div>
          </li>
          <li>
            <span>类<b>型</b></span>
            <div class="two" id="yetai">
              <b @click="typeFun($event,item)" v-for="item in list.houseTypeList">{{item.type_name}}</b>
            </div>
          </li>
          <li class="mianji">
            <span>价<b>格</b></span>
            <div id="mianjiChildren" class="two">
              <b @click="priceFun($event,item)" v-for="item in list.priceRangeList">{{item.description}}</b>
            </div>
          </li>
          <li>
            <span>面<b>积</b></span>
            <div class="two" id="monthChildren">
              <b @click="areaFun($event,item)" v-for="item in list.acreageList">{{item.d_name}}</b>
            </div>
          </li>
        </ul>
        <h3 v-if="allClick">
          <div class="list">
            <span class="select" v-for="item in regionName">{{item}}<b @click="regionRemove()"></b></span>
            <span class="select" v-for="item in typeName">{{item}}<b @click="typeRemove()"></b></span>
            <span class="select" v-for="item in priceName">{{item}}<b @click="priceRemove()"></b></span>
            <span class="select" v-for="item in areaName">{{item}}<b @click="areaRemove()"></b></span>
          </div>
        </h3>
      </div>
      <div class="shop-list">
        <div class="shop-msg clearfix">
          <ul class="shop-left">
            <li v-if="projectList.length!=0" v-for="item in projectList" @click="goShopDetail(item)">
              <div class="img">
                <img :src="item.pictures" alt="" :onerror="defaultImg">
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
                <div><span>{{item.price}}</span>元/㎡</div>
                <p>(均价)</p>
              </div>
            </li>
            <div class="nodata" v-if="projectList.length==0"><p><span></span></p><p>暂无数据</p></div>
            <div class="page" v-if="page">
              <el-pagination background layout="prev, pager, next" :current-page="curPage" :page-size="pageSize" :total="totalCount" @current-change="handleCurrentChange">
              </el-pagination>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import axios from '~/plugins/axios.js';
  import Nav from '~/components/Nav/Nav';
  import Footer from '~/components/Footer/Footer';
  export default {
    data(){
      return{
        list:"",//筛选列表
        pageSize: 10,//条数
        pageNum: 1,//第几页
        curPage: 1,
        totalCount:0,//铺源总数
        projectList: "",//项目列表
        projectType:1,//项目类型,1销售，2招商
        regionSelect:"",//区域选中
        typeSelect:"",//类型选中
        areaSelect:"",//面积选中
        beginpriceSelect:"",//价格开始选中
        endpriceSelect:"",//价格选中
        search: "",//搜索条件
        defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
        next: "",//下一页
        regionName: [],//区域名称
        typeName: [],//类型名称
        areaName: [],//面积名称
        priceName: [],//价格名称
        allClick: false,//已选区域显示
        shopTags: "",//特色标签
        page: true
      }
    },
    async asyncData(){
      let [shopArea, shopList] = await Promise.all([
        axios({
          url: '/project/filter',
          method: "post",
          params: {
            cityId: 110100,
            provinceId: 110000,
            projectType: 1,
          }
        }),
        axios({
          url:'/project/list',
          method: "post",
          params: {
            cityId: 110100, //所属城市【必传】
            pageSize: 10, //每页数据量【必传】
            pageNum: 1, //页码从1开始【必传】
            projectType: 1, //项目类型，1是销售，2是招商【必传】
            projectDistrictId: "", //区域筛选
            houseType: "", //建筑类型筛选
            beginPrice: "", //价格段筛选
            endPrice: "", //价格段筛选
            acreageRangeValue: "", //面积段筛选
            projectName: "" //项目名称筛选
          }
        })
      ])
      return {
        one: shopArea.data,
        two: shopList.data
      }
    },
    mounted(){
      this.search = this.$route.query.name;
      this.init();
      this.lists();
    },
    updated(){

    },
    components: {
      Nav,
      Footer
    },
    methods: {
      init(){//筛选初始化
        var that = this;
        axios({
          url: '/project/filter',
          method: "post",
          params: {
            cityId: sessionStorage.cityId || 110100,
            provinceId: sessionStorage.provinceId || 110000,
            projectType: this.projectType,
          }
        }).then(res => {
          console.log(res)
          if(res.data.code == 101){
            this.list = res.data;
            this.next = res.data.next;
          }
          setTimeout(function () {
            $("#areasChildren b").eq(0).addClass("cur");
            $("#yetai b").eq(0).addClass("cur");
            $("#mianjiChildren b").eq(0).addClass("cur");
            $("#monthChildren b").eq(0).addClass("cur");
            that.list.districtList.forEach(function (item,index) {
              if(that.$route.params.id == item.id){
                $("#areasChildren b").eq(index).click();
              }
            })
          },100)
        }).catch(err => {
          console.log(err)
        });
      },
      lists(){//列表初始化
        var data = {
          cityId: sessionStorage.cityId || 110100, //所属城市【必传】
          pageSize: this.pageSize, //每页数据量【必传】
          pageNum: this.pageNum, //页码从1开始【必传】
          projectType: this.projectType, //项目类型，1是销售，2是招商【必传】
          projectDistrictId: this.regionSelect, //区域筛选
          houseType: this.typeSelect, //建筑类型筛选
          beginPrice: this.beginpriceSelect, //价格段筛选
          endPrice: this.endpriceSelect, //价格段筛选
          acreageRangeValue: this.areaSelect, //面积段筛选
          projectName: this.search //项目名称筛选
        }
        axios({
          url: '/project/list',
          method: "post",
          params: data
        }).then(function(res){
          console.log(res)
          this.projectList = res.data.projectList;
          this.totalCount = Number(res.data.totalCount);
        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      searchFun(){
        this.curPage = 0;
        var reg = /^\s*$/g;
        if(reg.test(this.search) || this.search == null || this.search == ""){
          this.$message("搜索内容不能为空")
        }else{
          this.lists();
        }
      },
      regionFun(e,item){ //区域
        // this.$router.push({name:"sell-sellList-id",params:{id:item.id}})
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");//添加样式
        this.regionSelect = item.id;//赋值当前id
        this.search = "";//搜索的清空
        this.lists();//重新获取数据
        this.regionName = [];//已选条件
        if(item.area_name == "全部"){//如果是全部，则不显示
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.regionName.push(item.area_name);
          this.allClick = true;
          $(".threeArea").show();
        }
      },
      typeFun(e,item){//类型点击
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.search = "";
        this.typeSelect = item.type_id;
        this.lists()
        this.typeName = [];//已选条件
        if(item.type_name == "全部"){//如果是全部，则不显示
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.typeName.push(item.type_name);
          this.allClick = true;
          $(".threeArea").show();
        }
      },
      areaFun(e,item){//面积一级点击;
        this.search = "";
        this.typeSelect = item.d_value;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.lists()
        this.areaName = [];//已选条件
        if(item.d_name == "全部"){//如果是全部，则不显示
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.areaName.push(item.d_name);
          this.allClick = true;
          $(".threeArea").show();
        }
      },
      priceFun(e,item){//月租金点击
        this.search = "";
        this.beginpriceSelect = item.beginPrice;
        this.endpriceSelect = item.endPrice;
        $(e.srcElement).addClass("cur").siblings().removeClass("cur");
        this.lists()
        this.priceName = [];//已选条件
        if(item.description == "全部"){//如果是全部，则不显示
          this.allClick = false;
          $(".threeArea").hide();
        }else{
          this.priceName.push(item.description);
          this.allClick = true;
          $(".threeArea").show();
        }
      },
      regionRemove(){
        //删除区域
        this.regionSelect = "";//清空当前id
        this.regionName = [];//区域清空
        if(this.regionName.length == 0 && this.areaName.length == 0 && this.typeName.length == 0 && this.priceName.length == 0){
          this.allClick = false;//隐藏删选区域
        }
        $("#areasChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.lists();
      },
      typeRemove(){
        //已类型删除
        this.typeSelect = "";//清空当前id
        this.typeName = [];//区域清空
        if(this.regionName.length == 0 && this.areaName.length == 0 && this.typeName.length == 0 && this.priceName.length == 0){
          this.allClick = false;//隐藏删选区域
        }
        $("#yetai b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.lists();
      },
      priceRemove(){
        //价格为空，
        this.beginpriceSelect = "";//清空当前id
        this.endpriceSelect = "";//清空当前id
        this.priceName = [];//区域清空
        if(this.regionName.length == 0 && this.areaName.length == 0 && this.typeName.length == 0 && this.priceName.length == 0){
          this.allClick = false;//隐藏删选区域
        }
        $("#mianjiChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.lists();
      },
      areaRemove(){
        //面积删除
        this.areaSelect = "";//清空当前id
        this.areaName = [];//区域清空
        if(this.regionName.length == 0 && this.areaName.length == 0 && this.typeName.length == 0 && this.priceName.length == 0){
          this.allClick = false;//隐藏删选区域
        }
        $("#monthChildren b").eq(0).addClass("cur").siblings().removeClass("cur");
        this.lists();
      },
      handleCurrentChange(val){//分页
        console.log(val)
        this.pageNum = val;
        this.lists();
        $('html,body').animate({scrollTop: 100},100);
      },
      goShopDetail(item){//跳转到详情页面
        // window.location.href = "shopDetail.html?shopId=" + id;
        window.open("/sell/sellDetail/"+this.projectType+"/"+item.projectId+"/"+item.houseType);
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../../assets/css/shopList.less';
  @import '../../../assets/css/shopMsg.less';
  @import '../../../assets/css/shopPages.less';
  .sellList{
    .shop-list{
      .shop-left{
        width: 1200px;
        .nodata{
          p{
            width: 1200px;
          }
        }
        li{
          width: 1200px;
        }
      }
    }
    .page{
      width: 1200px;
    }
  }
</style>
