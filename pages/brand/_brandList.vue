<template>
<section class="container">
<nav-bar/>
<div class="brandWrap">
    <div class="brandTop">
        <div class="brandSearchWrap">
            <div class="searchInput">
                <input type="text" name="" v-model="brandName" placeholder="请输入品牌名称">
                <p @click="searchBtn()">开始搜索</p>
                <img src="~/assets/images/brand/brandSearch.png" class="brandSearchImg">
            </div>
        </div>
    </div>
    <div class="brandNavWrap">
        <div class="brandNav">
            <ul class="brandNavList">
                <li class="area clearfix">
                    <h3>需求面积</h3>
                    <div class="areaList one">
                        <p v-for="(item,index) in needsAreaArr" :class="{txtColor:txtColorIndex == index}" @click="areaBtn($event,item,item.d_value,index,item.d_name)">{{item.d_name}}</p>
                    </div>
                </li>
                <li class="district clearfix">
                    <h3>拓展区域</h3>
                    <div class="districtList one clearfix">
                        <p v-for="(item,index) in expandAreas" @click="districtBtn($event,item,item.id,index)" :class="{txtColor:txtColorIndex1 == index}">{{item.regions_name}}</p>
                    </div>
                    <div class="districtChild clearfix two" v-if="districtChildShow">
                        <span v-for="(item1,index1) in districtChild.areasList" @click="districtChildBtn(item1.id,item1.regions_id,index1,item1.area_name)" :class="{txtColor:txtColorIndex1_1 == index1}">{{item1.area_name}}</span>
                    </div>
                </li>
                <li class="brandLiquid clearfix">
                    <h3>品牌业态</h3>
                    <div class="brandLiquidList one">
                        <p v-for="(item,index) in brandTypeArr" @click="brandLiquidBtn($event,item,item.id,index)" :class="{txtColor:txtColorIndex2 == index}">{{item.businessName}}</p>
                    </div>
                    <div class="brandLiquidChild two" v-if="brandLiquidChildShow">
                        <span  v-for="(item1,index1) in brandTypeChild.levelTwoList" @click="brandLiquidChildBtn(item1.id,item1.p_id,index1,item1.businessName)" :class="{txtColor:txtColorIndex2_1 == index1}">{{item1.businessName}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="brandLabel">
            <p v-if="areaName != ''">{{areaName}}<img src="~/assets/images/brand/redClose.png" class="redClose" @click="areaNameClose"></p>
            <p v-if="districtName != ''">{{districtName}}<img src="~/assets/images/brand/redClose.png" class="redClose" @click="districtNameClose"></p>
            <p v-if="brandLiquidName != ''">{{brandLiquidName}}<img src="~/assets/images/brand/redClose.png" class="redClose" @click="brandLiquidNameClose"></p>
        </div>
    </div>
    <!-- 品牌列表 -->
    <div class="brandList clearfix">
        <div class="brandListLeft">
            <dl class="brandListLeftBox" v-for="(item,index) in brandListData" @click="goBrandDetail(item.id)">
                <dt>
                    <img :src="item.logo" :onerror="defaultImg">
                </dt>
                <dd>
                    <h3>品牌名称：{{item.brand_name}}</h3>
                    <ul>
                        <li>品牌业态：{{item.brand_business}}</li>
                        <li>拓展区域：{{item.expand_area}}</li>
                        <li>品牌定位：{{item.brand_positioning}}</li>
                    </ul>
                </dd>
                <h5 v-if="item.top_flag == '1'"><img src="~/assets/images/brand/stick.png"></h5>
            </dl>

            <!-- 分页 -->
            <!-- <div class="page" v-show="brandListData != ''"> -->
            <div class="page" v-show="brandListData.length > 19">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="20"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 暂无数据 -->
        <div class="brandListLeft2" v-show="brandListData ==''">
            <div>
                <img src="~/assets/images/brand/noData.png">
                <p>暂无数据</p>
            </div>
        </div>
        <div class="brandListRight">
            <!-- <div> -->
                <h2>热门品牌推荐</h2>
                <dl v-for="(item,index) in hotBrandList" @click="goBrandDetail(item.id)">
                    <dt>
                        <img :src="item.logo">
                    </dt>
                    <dd>品牌名称：{{item.brand_name}}</dd>
                </dl>

            <!-- </div> -->
        </div>
    </div> 
</div>
<Footer></Footer>
</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav.vue';
import { getHomeData} from '~/api/movie.js';
import Footer from '~/components/Footer/Footer';
export default {
  head () {
    return {
      title: '品牌库',
      meta: [
        { hid: 'description', name: 'description', content: '品牌库' },
        { hid: 'title', name: 'title', content: '品牌库' },
        { hid: 'keywords', name: 'keywords', content: '品牌库' }
      ]
    }
  },
  data () {
    return {
        sessionCityId: "110100",
        // pageSize: 10, // 每页数据量【必传】
        needsAreaArr: [],  // 需求面积
        txtColorIndex: 0, // 需求面积字体颜色
        expandAreas: [], // 拓展区域
        txtColorIndex1: 0, // 拓展区域字体颜色
        districtChild: [], // 拓展区域子集
        districtChildShow: false, // 拓展区域子集默认隐藏
        txtColorIndex1_1: 0, // 拓展区域子集字体颜色
        brandTypeArr: [], // 品牌业态
        txtColorIndex2: 0, // 品牌业态字体颜色
        brandTypeChild: [], // 品牌业态子集
        brandLiquidChildShow: false, // 品牌业态子集默认隐藏
        txtColorIndex2_1: 0,  // 品牌业态子集字体颜色
        brandListData: [], // 品牌列表
        // 检索条件
        brandName: '',
        areasId: '', //需求面积ID
        regionsId: '', //拓展区ID
        provinceId: '', //拓展区域省ID
        brandBusiness: '', // 业态ID
        brandBusinessP: '', // 业态父ID
        // 标签
        areaName: '', // 需求面积
        districtName: '', // 拓展区域
        brandLiquidName: '', // 品牌业态
        defaultImg: 'this.src="' + require('~/assets/images/brand/err.png') + '"', //默认图片
        // 分页
        pageSize: 20,
        pageNum: 1,
        total: 0,  //接收渲染数据总数的参数
        hotBrandList: [], // 热门品牌推荐
        isSearch: false,
        loading: "",
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    // 筛选数据
    brandDetailsData(){
        axios({
            url: '/brand/filter',
            method: "post",
        }).then(data => {
            console.log(data);     
            // 需求面积
            this.needsAreaArr = data.data.acreageList;
            // 拓展区域
            this.expandAreas = data.data.expandAreaList;
            // 品牌业态
            this.brandTypeArr = data.data.brandBusinessList;
            
        }).catch(err => {
            console.log(err)
        });
    },
    // 需求面积
    areaBtn(e,item,id,index,name){
        this.brandName = "";
        if(index == 0){
            this.txtColorIndex = index;
            this.areasId = "";
            this.areaName = "";
            this.brandList();
        }else{
            this.txtColorIndex = index;
            this.areasId = id;
            this.areaName = name;
            this.brandList();
        }
    },
    // 拓展区域
    districtBtn(e,item,id,index){
        this.brandName = "";
        if(index == 0){
            this.txtColorIndex1 = index;
            this.districtChildShow = false;
            this.provinceId = "";
            this.regionsId = "";
            this.districtName = "";
            this.brandList();
        }else{
            this.txtColorIndex1 = index;
            this.districtChild = item;
            this.txtColorIndex1_1 = 0;
            this.districtChildShow = true;
            console.log(this.provinceId);
        }    
    },
    // 拓展区域子集
    districtChildBtn(id,regionsId,index,name){
        this.brandName = "";
        this.txtColorIndex1_1 = index;
        this.provinceId = id;
        this.regionsId = regionsId;
        this.districtName = name;
        // console.log(regionsId);
        // console.log(id);
        this.brandList();
    },
    // 品牌业态
    brandLiquidBtn(e,item,id,index){
        this.brandName = "";
        if(index == 0){
            this.txtColorIndex2 = index;
            // this.txtColorIndex2_1 = 0;
            this.brandLiquidChildShow = false;
            this.brandBusiness = "";
            this.brandBusinessP = "";
            this.brandLiquidName = "",
            this.brandList();
        }else{
            this.txtColorIndex2 = index;
            this.brandTypeChild = item;
            this.txtColorIndex2_1 = 0;
            this.brandLiquidChildShow = true;
        }  
    },
    // 品牌业态子集
    brandLiquidChildBtn(id,brandTypeParentId,index,name){
        this.brandName = "";

        this.txtColorIndex2_1 = index;
        this.brandLiquidName = name;
        this.brandBusiness = id;
        this.brandBusinessP = brandTypeParentId;
        this.brandList();
    },
    // 需求面积关闭按钮
    areaNameClose(){
        this.areasId = "";
        this.areaName = "";
        this.txtColorIndex = 0;
        this.brandList();
    },
    // 拓展区域关闭按钮
    districtNameClose(){
        this.regionsId = ""; //拓展区ID
        this.provinceId = ""; //拓展区域省ID
        this.districtName = "";
        this.txtColorIndex1 = 0;
        this.districtChildShow = false;
        this.brandList();
    },
    // 品牌业态关闭按钮
    brandLiquidNameClose(){
        this.brandBusiness = ""; // 业态ID
        this.brandBusinessP = "", // 业态父ID
        this.brandLiquidName = "";
        this.txtColorIndex2 = 0;
        this.brandLiquidChildShow = false;
        this.brandList();
    },
    // 品牌列表
    brandList(){
        let _this = this;
        axios({
            url: '/brand/list',
            method: 'post',
            params: {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.pageNum,     // 页码从1开始【必传】
                // topNum: '10',  //置顶数据取得条数【必传】
                brandName: "", // 品牌名称
                areasId: this.areasId, //需求面积ID
                regionsId: this.regionsId, //拓展区ID
                provinceId: this.provinceId, //拓展区域省ID
                brandBusiness: this.brandBusiness, // 业态ID
                brandBusinessP: this.brandBusinessP // 业态父ID
            }
        }).then(data => {
            console.log(data);
            this.brandListData = data.data.brandList;
            this.loading.close();
            this.total =  parseInt(data.data.totalCount);
            this.hotBrandList = data.data.hotBrandList;
            console.log(this.hotBrandList);

        }).catch(err => {
            console.log(err)
        });
    },
    // 开始搜索
    searchBtn(){
        axios({
            url: '/brand/list',
            method: 'post',
            params: {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.pageNum,     // 页码从1开始【必传】
                topNum: '10',  //置顶数据取得条数【必传】
                brandName: this.brandName, // 品牌名称
                areasId: '', //需求面积ID
                regionsId: '', //拓展区ID
                provinceId: '', //拓展区域省ID
                brandBusiness: '', // 业态ID
                brandBusinessP: '' // 业态父ID
            }
        }).then(data => {
            console.log(data);
            this.isSearch = true;
            this.brandListData = data.data.brandList;
            this.total =  parseInt(data.data.totalCount);
        }).catch(err => {
            console.log(err)
        });
    },
    //分页
    handleCurrentChange(val) {
        console.log(val);
        this.pageNum = val;
        // this.pageNum = val - "1";
        // if(this.pageNum < 1){
        //     this.pageNum = 0;
        // }
        $('html , body').animate({scrollTop: 100},1500);
        if(this.isSearch == true){
            this.searchBtn();
        }else{
            this.brandList();
        }
        
    },
    // 跳转到品牌详情页面
    goBrandDetail(id){
        // window.location.href = "shopDetail.html?shopId=" + id;
        window.open("/brand/brandDetails/"+id);
    },
    // 加载中
    onSearch() {
        this.loading = this.$loading({
          lock: false,
          // fullscreen: true,
          text: '数据加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(225, 225, 225, 0.5)',
          target: document.querySelector('.div1')
        });
        setTimeout(() => {
          this.loading.close();
        }, 2000);
    }

  },
  mounted(){
    this.sessionCityId = sessionStorage.cityId;
    this.sessionProvinceId = sessionStorage.provinceId;

    this.onSearch();

        //截取Url里面的参数
        function GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        }
        var request = new Object();
        request = GetRequest();

        this.brandName = request['name'];
        // console.log(this.brandName);
        if(this.brandName){
            this.searchBtn();
        }else{  
            this.brandList();
        }
        this.brandDetailsData();


  }
}
</script>

<style lang="less" type="text/less" scoped>
input::-webkit-input-placeholder{
    color: #ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #ccc;
}
.brandWrap{
    width: 100%;
}
.brandTop{
    width: 100%;
    height: 60px;
    background: #fff;
    .brandSearchWrap{
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        .searchInput{
            width: 804px;
            padding: 10px 0;
            position: relative;
            input{
                width: 635px;
                height: 40px;
                background: #f0f1f4;
                float: left;
                border-radius: 4px 0px 0px 4px;
                padding-left: 50px;
                color: #333;
                font-size: 14px;
            }
            p{
                width: 128px;
                float: left;
                line-height: 40px;
                text-align: center;
                color: #fff;
                background: #e8584f;
                border-radius: 4px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
            }
            .brandSearchImg{
                width: 20px;
                height: 20px;
                position: absolute;
                left: 20px;
                line-height: 40px;
                margin-top: 10px;
            }
        }
    }
}
/* 导航 */
.brandNavWrap{
    width: 1200px;
    margin: 16px auto;
    /*box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07);*/
    box-shadow:0px 3px 4px 0px rgba(0, 0, 0, 0.14);
    background: #fff;
}
.brandNav{
    padding: 24px 18px;
    .brandNavList{
        li{
            width: 1160px;
            margin-top: 22px;
            h3{
                width: 100px;
                float: left;
                color: #333;
                font-size: 16px;
                font-weight: 600;
            }
            .one{
                width: 1000px;
                float: left;
                p{
                    color: #898989;
                    font-size: 14px;
                    float: left;
                    margin-right: 12px;
                    line-height: 22px;
                    cursor: pointer;
                }
                .txtColor{
                    color: #224e8f;
                }
            }
            .two{
                width: 1000px;
                background: #f5f8ff;
                margin-left: 100px;
                float: left;
                margin-top: 10px;
                padding: 8px 10px;
                span{
                    color: #898989;
                    font-size: 14px;
                    margin-right: 12px;
                    cursor: pointer;
                }
                .txtColor{
                    color: #224e8f;
                }
            }
        }
        .area{
            margin-top: 0px;
        }
    }
}
.brandLabel{
    width: 1200px;
    height: 42px;
    background: #f7f7f7;
    z-index: 9999999;
    padding-top: 8px;
    p{
        line-height: 26px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(253,73,70,1);
        border-radius:4px;
        padding-right: 20px;
        padding-left: 4px;
        position: relative;
        float: left;
        margin-left: 10px;
        color: #898989;
        font-size: 14px;  
        .redClose{
            position: absolute;
            right: 4px;
            top: 8px;
            cursor: pointer;
        }
    }
}
/* 品牌列表 */
.brandList{
    width: 1200px;
    margin: 14px auto 78px;
}
.brandListLeft{
    width: 964px;
    float: left;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07);
    .brandListLeftBox{
        height: 154px;
        padding: 26px 0px;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        cursor: pointer;
        dt{
            width: 138px;
            height: 104px;
            float: left;
            margin-left: 30px;
            margin-right: 20px;
            img{
                width: 138px;
                height: 104px;
            }
        }
        dd{
            float: left;
            h3{
                color: #333;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
            }
            ul{
                li{
                    color: #898989;
                    font-size: 14px;
                    margin-top: 8px;
                }
            }
        }
        h5{
            position: absolute;
            right: 0;
        }
    }
    :last-child{
        border-bottom: none;
    }
}
/* 暂无数据 */
.brandListLeft2{
    width: 964px;
    height: 618px;
    float: left;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07);
    div{
        width: 260px;
        height: 200px;
        margin: 140px auto 0;
        p{
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    }
}
.brandListRight{
    width: 224px;
    height: 640px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07);
    float: right;
    padding: 20px;
    h2{
        color: #333;
        font-size: 18px;
    }
    dl{
        cursor: pointer;
        margin-top: 20px;
        dt{
            width: 184px;
            height: 140px;
            img{
                width: 184px;
                height: 140px;
            }
        }
        dd{
            color: #333;
            font-size: 14px;
            margin-top: 8px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }  
}
/*分页*/
.page{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background: #f7f7f7;
    padding: 26px 0;
}
</style>
<style>
.page .el-pagination {
    font-weight: normal;
}
.page .el-pagination .btn-prev, .page .el-pagination .btn-next, .page .el-pagination .el-pager li {
    height: 38px;
    width: 38px;
    line-height: 38px;
    border: 1px solid #D8D8D8;
}
.page .el-pagination .el-pager li.active {
    background: #224e8f !important;
    border: 1px solid #D8D8D8;
}   
.page .el-pagination .el-pager li:last-child{
    display: none;
}
</style>
