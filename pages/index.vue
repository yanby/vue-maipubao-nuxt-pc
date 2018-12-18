<template>
<section class="container">
<div class="home">
    <div class="homeTop">
        <!-- 导航 -->
        <nav>
            <div class="homeNav">
                <div class="navLeft">
                    <img src="~/assets/images/home/mpbLogo.png" class="mpbLogo">
                    <div class="cityNameBox">
                        <img src="~/assets/images/home/location.png" class="location">
                        <p @click="cityLocationBtn()">{{cityNameData}}</p>
                        <ul v-if="showCityLocation">
                            <li v-for="(item,index) in cityNameArr" @click="cityLocationList(item.strCityName,index,item.province_id,item.city_id)" :class="{cityNameColor:changeCityNameColor == item.strCityName}">{{item.strCityName}}</li>
                        </ul>
                    </div>
                </div>
                <div class="navCenter">
                    <ul>
                        <li><nuxt-link :to="{name:'sell-sellList-id'}">销售项目</nuxt-link></li>
                        <li><nuxt-link :to="{name:'merchants-merchantsList-id'}">招商项目</nuxt-link></li>
                        <li><nuxt-link :to="{name:'brand-brandList'}">品牌库</nuxt-link></li>
                        <li><nuxt-link :to="{name:'news-newsList'}">行业资讯</nuxt-link></li>
                        <!-- <li>地图找房</li> -->
                        <li class="hoverLi">
                            <a href="javascript:void(0);">下载APP</a>
                            <div class="hoverBox">
                                <h3 class="hoverBoxH3">下载APP</h3>
                                <img src="~/assets/images/home/mpbApp.png" class="mpbCode">
                                <h5 class="hoverBoxH5">更便捷更快速进行在线委托</h5>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="navRight">
                    <dl class="telDl">
                        <dt><img src="~/assets/images/nav/tel.png" class="loginImg"></dt>
                        <dd>400&nbsp;8988&nbsp;808</dd>
                    </dl>
                    <dl class="loginDl">
                        <dt><img src="~/assets/images/nav/user.png" class="loginImg"></dt>
                        <dd v-if="token == null" @click="showLogin = true">登录</dd>
                        <dd v-else><nuxt-link :to="{name:'mine-myMine'}">我的优铺</nuxt-link></dd>
                    </dl>
                </div>
            </div>
        </nav>
        <!-- 轮播图 -->
        <!-- <el-carousel trigger="click" height="530px" :interval="3000">
            <el-carousel-item v-for="(item,index) in picArr">
                <div class="lbtDiv"><img :src="item.img_path" class="logoImg" @click="goNewUrl(item.url)"></div>
            </el-carousel-item>
        </el-carousel> -->

        <el-carousel trigger="click" height="530px" :interval="3000">
            <el-carousel-item v-for="(item,index) in picArr">
                <h3 @click="goNewUrl(item.url)"> <img :src="item.img_path"></h3>
            </el-carousel-item>
        </el-carousel>


        <!-- 搜索栏 -->
        <div class="searchBar">
            <ul>
                <li :class="{searchBarColor:changeSearchBarColor == index}"  v-for="(item,index) in searchBarArr" @click="searchList(index)">{{item.name}}</li>
                <i class="triangle"></i>
            </ul>
            <div class="searchInput">
                <input type="text" name="" v-model="searchName">
                <p @click="searchBtn()">开始搜索</p>
            </div>
        </div>
    </div>
    <!-- 项目 -->
    <div class="project">
        <!-- 销售 -->
        <div class="projectSell clearfix">
            <dl class="projectSellTop clearfix">
                <dt><img src="~/assets/images/home/sellHot.png" class="sellHot"></dt>
                <dd>
                    <p>热门销售<span>新起航</span></p>
                    <h5>真实信息准确同步，楼盘动态一手掌握</h5>
                </dd>
                <h6><nuxt-link :to="{name:'sell-sellList-id'}">更多项目</nuxt-link></h6>
            </dl>
            <div class="projectSellBoxWrap">
                <div class="projectSellBox" v-for="(item,index) in sellListArr" v-if="index < 4" @click="goSellDetail(item)">
                    <dl>
                        <dt>
                           <img :src="item.pictures">
                        </dt>
                        <dd>
                            <h3>{{item.project_name}}</h3>
                            <p class="p1 fl"><img src="~/assets/images/home/grayLocation.png">{{item.address}}</p>
                            <p class="p2 fr">{{item.price}}元/㎡</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>

        <!-- 招商 -->
        <div class="projectCM projectSell clearfix">
            <dl class="projectSellTop clearfix">
                <dt><img src="~/assets/images/home/projectCM.png"></dt>
                <dd>
                    <p>精品招商<span>为您推荐</span></p>
                    <h5>好房源那么多，我们为你精选，优铺网会越来越懂你</h5>
                </dd>
                <h6><nuxt-link :to="{name:'merchants-merchantsList'}">更多项目</nuxt-link></h6>
            </dl>
            <div class="projectSellBoxWrap">
                <div class="projectSellBox" v-for="(item,index) in shopListArr" v-if="index < 4" @click="goMerchantsDetail(item)">
                    <dl>
                        <dt>
                            <img :src="item.pictures">
                        </dt>
                        <dd>
                            <h3>{{item.project_name}}</h3>
                            <p class="p1 fl"><img src="~/assets/images/home/grayLocation.png">{{item.address}}</p>
                            <p class="p2 fr">{{item.price}}元/天/㎡</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <!-- 品牌 -->
    <div class="brandWrap">
        <div class="brandBox">
            <dl class="brandTop clearfix">
                <dt><img src="~/assets/images/home/brandHot.png" class="sellHot"></dt>
                <dd>
                    <p>火热品牌<span>供您选择</span></p>
                    <h5>优质品牌，我们为您提供</h5>
                </dd>
                <h6><nuxt-link :to="{name:'brand-brandList'}">更多品牌</nuxt-link></h6>
            </dl>
            <div class="hotBrand">
                <ul>
                    <li v-for="(item,index) in brandListArr" v-if = "index < 10" @click="brandDetails(item.id)">
                        <img :src="item.logo">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- 浮动左边 -->
<div class="homeLeftFloat" v-if="showHomeLeftFloat" @click="isShowClass = true,isHideClass = false,showHomeLeftFloat = false">    
    <p>卖铺宝APP</p>
    <img src="~/assets/images/home/whiteMore.png" class="whiteMore">
</div>
<!-- 浮动底部 -->
<div class="homeBottom" :class="[{ showClass: isShowClass, hideClass: isHideClass }]">
    <div class="homeBottomBox">
        <img src="~/assets/images/home/Iphone.png" class="Iphone">
        <h3>租铺卖铺找优铺</h3>
        <img src="~/assets/images/home/mpbApp.png" class="mpbApp">
        <h5>扫描下载卖铺宝APP</h5>
        <img src="~/assets/images/home/whiteClose.png" class="whiteClose" @click="closeHomeBottom()">
    </div>
</div>
<!-- 登录弹窗 -->
<div class="login" v-if="showLogin">
    <div class="loginBox">
        <h3>登录</h3>
        <div class="input1">
            <input type="tel" placeholder="请输入您的手机号" v-model="phoneVal" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
        </div>
        <div class="input2">
            <input type="tel" v-model="securityCode" placeholder="短信验证码" maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,'')">
            <button type="button" :disabled="disabled" @click="sendcode" class="btns" :class="{'codeColor':chengaColor}">{{btntxt}}</button>
        </div>
        <div class="loginBtn" @click="loginBtn">登录</div>
        <img src="~/assets/images/home/blackClose.png" class="blackClose" @click="showLogin = false">
    </div>
</div>
<!-- 吐司封装 -->
<div class="ballWrap" v-if="ballWrap">
    <p>{{this.ballWrapTxt}}</p>
</div>
<Footer></Footer>
</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav.vue';
import Footer from '~/components/Footer/Footer';
export default {
  head () {
    return {
      title: '卖铺宝',
      meta: [
        { hid: 'description', name: 'description', content: '卖铺宝' },
        { hid: 'title', name: 'title', content: '卖铺宝' },
        { hid: 'keywords', name: 'keywords', content: '卖铺宝' }
      ]
    }
  },
  data(){
    return{
        // 城市名称
        cityNameData: "",
        token: null,
        selectCity: "北京", // 选择城市
        sessionProvinceId: "110000", // 省ID
        sessionCityId: "110100", // 市ID
        picArr: [], // 轮播图
        sellListArr: [], // 销售列表
        shopListArr: [], // 招商列表
        brandListArr: [], // 品牌列表
        cityNameArr: [], // 城市名称
        changeSearchBarColor: 0, // 搜索栏字体颜色
        // showHomeBottom: true, // 底部悬浮
        showHomeLeftFloat: false, // 左边悬浮
        showCityLocation: false, // 城市定位弹窗
        changeCityNameColor: "", // 城市定位弹窗字体颜色
        phoneVal: "", // 手机号
        securityCode: "", // 短信验证码
        btntxt: "获取验证码",
        disabled:false,
        time:0,
        chengaColor: false, // 倒计时出现
        showLogin: false, // 是否出现登录弹窗
        ballWrap: false, // 吐司
        ballWrapTxt: "", // 吐司文字
        searchIndex: 0, //开始搜索
        searchName: "",
        searchBarArr: [{
            'id': '0',
            'name': '销售商业项目',
            'projectTypes': '1' // 销售
        }, {
            'id': '1',
            'name': '销售办公产业项目',
            'projectTypes': '1' // 销售
        }, {
            'id': '2',
            'name': '销售住宅项目',
            'projectTypes': '1' // 销售
        }, {
            'id': '3',
            'name': '招商商业项目',
            'projectTypes': '2' // 招商
        }, {
            'id': '4',
            'name': '招商办公产业项目',
            'projectTypes': '2' // 招商
        }, {
            'id': '5',
            'name': '品牌',
            'projectTypes': '3' // 品牌
        }],
        isShowClass: true, 
        isHideClass: false
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods:{
    // 首页展示
    listData() {
        let _this = this
        // let api = url + '/show/showInfo'
        axios({
            url: '/show/showInfo',
            method: 'post',
            params: {
                "cityId": this.sessionCityId || 110100,
                "place": "pc"
            }
        }).then(data => {
            console.log("嘻嘻");
            console.log(data);
            var cityNameStr = data.data.data.cityName;
            this.cityNameData =  cityNameStr.split("市").join("");
            this.picArr = data.data.data.bannerList; // 轮播图
            this.sellListArr = data.data.data.selectProject1;  // 销售列表
            this.shopListArr = data.data.data.selectProject2;  // 招商列表
        }).catch(err => {
            console.log(err)
        });
    },
    // 品牌数据
    brandList(){
        axios({
            url: '/show/getBrandLogoList',
            method: 'post',
            params: {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
            }
        }).then(data => {
            console.log("呵呵哒");
            console.log(data);
            this.brandListArr = data.data.logoListPC;
            console.log(this.brandListArr);
        }).catch(err => {
            console.log(err)
        });
    },
    // 获取城市
    cityCode() {
        let _this = this
        axios({
            url: '/show/getOpenedCitiesList',
            method: 'post',
        }).then(data => {
            // console.log("😄");
            console.log(data);
            this.cityNameArr = data.data.data;
            this.cityNameArr.forEach(function (item,index) {
                var str = item.city_name.split("市").join("");
                item.strCityName = str;
            })
        }).catch(err => {
            console.log(err)
        });
    },
    // 点击城市定位
    cityLocationBtn(){
        this.showCityLocation = true;
    },
    // 城市定位弹窗字体颜色
    cityLocationList(cityName,index,provinceId,cityId){
        console.log(cityName);
        this.showCityLocation = false;
        this.selectCity = cityName;
        this.changeCityNameColor = cityName;
        sessionStorage.setItem("provinceId",provinceId);
        sessionStorage.setItem("cityId",cityId);
        // sessionStorage.setItem("cityName",cityName);
        var cityNameSplit =  cityName.split("市").join("");
        console.log(cityNameSplit);
        this.cityNameData = cityName;
        sessionStorage.setItem("cityName",cityNameSplit);
        // 调用首页数据展示接口
        // this.listData();
        window.location.reload();
        // window.location.href = '/';
        this.listData();

    },

    // 点击搜索导航
    searchList(num){
        this.changeSearchBarColor = num;
        if(num == 0){
            $(".triangle").css({left:"36px"});
            this.searchIndex = 0;
        }else if(num == 1){
            $(".triangle").css({left:"150px"});
            this.searchIndex = 1;
        }else if(num == 2){
            $(".triangle").css({left:"270px"});
            this.searchIndex = 2;
        }else if(num == 3){
            $(".triangle").css({left:"376px"});
            this.searchIndex = 3;
        }else if(num == 4){
            $(".triangle").css({left:"490px"});
            this.searchIndex = 4;
        }else if(num == 5){
            $(".triangle").css({left:"580px"});
            this.searchIndex = 5;
        }
    },
    // 点击开始搜索
    searchBtn(){
        if(this.searchIndex == 5){
            // alert("品牌");
            window.location.href = "/brand?name=" + this.searchName;
            // window.open("/brand?"this.searchName);
        }else if(this.searchIndex == 3 || this.searchIndex == 4){
            // alert("招商");
            window.location.href = "/merchants/merchantsList?name=" + this.searchName;
        }else{
            // alert("销售");
            window.location.href = "/sell/sellList?name=" + this.searchName;
        }
    },
    //城市定位
    cityFun(){
        let _this = this;
        function myFun(result){
            var cityName = result.name;
            // alert(cityName);

            var cityNameSplit =  cityName.split("市").join("");
            console.log(cityNameSplit);
            _this.cityNameData = cityNameSplit;
            console.log("1111")
            console.log(_this.cityNameData);
            _this.changeCityNameColor = cityNameSplit;
            // sessionStorage.setItem("cityName",cityNameSplit);

            axios({
                url: '/show/changeCity',
                method: 'post',
                params: {
                    "cityName": cityName,
                }
            }).then(data => {
                // console.log("😄");
                console.log(data);
                // console.log(data);
              if(data.data.code == "101"){
                if(data.data.status == true){
                  sessionStorage.setItem("provinceId",data.data.provinceId);
                  sessionStorage.setItem("cityId",data.data.cityId);
                  var cityNameSplit =  cityName.split("市").join("");
                  sessionStorage.setItem("cityName",cityNameSplit);
                  _this.sessionCityId = sessionStorage.cityId;
                  if(_this.sessionCityId){
                    _this.listData();
                  }
                }else if(data.data.status == false){
                  sessionStorage.setItem("provinceId","110000");
                  sessionStorage.setItem("cityId","110100");
                  sessionStorage.setItem("cityName","北京");
                  _this.sessionCityId = sessionStorage.cityId;
                  if(_this.sessionCityId){
                    _this.listData();
                  }
                }
              }else{
                sessionStorage.setItem("provinceId","110000");
                sessionStorage.setItem("cityId","110100");
                sessionStorage.setItem("cityName","北京");
                _this.sessionCityId = sessionStorage.cityId;
                if(_this.sessionCityId){
                  _this.listData();
                }
              }
            }).catch(err => {
                console.log(err)
            });
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
    },

    //获取验证码
    sendcode() {
        let _this = this;
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.phoneVal==''){
            this.ballWrapTxt = "请输入手机号码";
            this.ballWrap = true;
            setTimeout(function(){
                _this.ballWrap = false;
            }, 2000);
        }else if(!reg.test(this.phoneVal)){
            this.ballWrapTxt = "请输入正确的手机号";
            this.ballWrap = true;
            setTimeout(function(){
                _this.ballWrap = false;
            }, 2000);
        }else{
            // 接口调用
            axios({
                url: '/sendsms',
                method: 'post',
                params: {
                    mobile: _this.phoneVal,
                    type: 1
                }
            }).then(data => {
                // console.log("😄");
                console.log(data);
                if(data.data.code = 200){
                    this.chengaColor = true;
                    this.time=60;
                    this.disabled=true;
                    this.timer();
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },
    // 倒计时
    timer() {
        if (this.time > 0) {
            this.time--;
            // this.btntxt=this.time+"s后重新获取";
            this.btntxt= "重新获取(" + this.time + ")";
            setTimeout(this.timer, 1000);
        } else{
            this.chengaColor = false;
            this.time=0;
            this.btntxt="获取验证码";
            this.disabled=false;
        }
    },
    // 点击登录按钮
    loginBtn(item) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        let _this = this;
        // alert(2);
        if(this.phoneVal==''){
            this.ballWrapTxt = "请输入手机号码";
            this.ballWrap = true;
            setTimeout(function(){
                _this.ballWrap = false;
            }, 2000);
        }else if(!reg.test(this.phoneVal)){
            this.ballWrapTxt = "请输入正确的手机号";
            this.ballWrap = true;
            setTimeout(function(){
                _this.ballWrap = false;
            }, 2000);
        }else if(this.securityCode == ""){
            this.ballWrapTxt = "请输入验证码";
            this.ballWrap = true;
            setTimeout(function(){
                _this.ballWrap = false;
            }, 2000);
        }else{
            axios({
                url: '/login',
                method: 'post',
                params: {
                    mobile: this.phoneVal,
                    validCode: this.securityCode,
                    provinceId: this.sessionProvinceId || 110000,
                    cityId: this.sessionCityId || 110100,
                    type: 1,
                    source: "4"
                }
            }).then(data => {
                console.log(data);
                console.log(data.data.code);
                if(data.data.code == "101"){
                    this.ballWrapTxt = "登录成功";
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 2000);
                    let tel = data.data.memberInfo.mobile;
                    let token1 = data.data["access-token"];
                    window.localStorage.setItem("iphone",tel);
                    window.localStorage.setItem("token",token1);
                    window.localStorage.setItem("memberId",data.data.memberInfo.id);
                    window.location.reload();
                }else if(data.data.code == "102"){
                    this.ballWrapTxt = data.data.message;
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 2000);
                }else if(data.data.code == "200"){
                    this.ballWrapTxt = data.data.message;
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 2000);
                }else{
                    this.ballWrapTxt = data.data.message;
                    this.ballWrap = true;
                    setTimeout(function(){
                        _this.ballWrap = false;
                    }, 2000);
                }
            }).catch(err => {
                console.log(err)
            });
        }
    },
    // 跳转销售详情
    goSellDetail(item){
        window.open("/sell/sellDetail/"+1+"/"+item.projectId+"/"+item.houseType);
    },
    // 跳转招商详情
    goMerchantsDetail(item){
        window.open("/merchants/merchantsDetail/"+2+"/"+item.projectId+"/"+item.houseType);
    },
    // 跳转品牌详情
    brandDetails(id){
        window.open("/brand/brandDetails/"+id);
    },
    // 底部提示APP下载页关闭
    closeHomeBottom(){
        let _this = this;
        this.isShowClass = false;
        this.isHideClass = true;
        var t;
        clearTimeout(t);
        t = setTimeout(function (){
            console.log('执行了');
            _this.showHomeLeftFloat = true;
        }, 500);
    },
    // 跳转轮播图详情
    goNewUrl(url){
        // alert(url);
        window.open(url);
        // window.location.href= url;
    }

  },
  mounted() {
        // 百度地图
        if(sessionStorage.cityId == undefined){
            this.cityFun();
        };

        this.token = localStorage.token;
        this.sessionCityId = sessionStorage.cityId;
        this.sessionProvinceId = sessionStorage.provinceId;
        this.changeCityNameColor = sessionStorage.cityName;

        // 数据展示
        this.listData();
        // 品牌列表
        this.brandList();
        // 获取城市
        this.cityCode();

       },
  created () {
    // // 数据展示
    // this.listData();
    // // 品牌列表
    // this.brandList();
    // // 获取城市
    // this.cityCode();
  },
}
</script>


<style lang="less" type="text/less" scoped>
/*@import '~/assets/css/index.less';*/
.home{
    width: 100%;
}
.homeTop{
    width: 100%;
    height: 530px;
    position: relative;
    /* 导航 */
    nav{
        background: url(../assets/images/home/navBg.png);
        background-repeat: no-repeat;
        z-index: 8;
        height: 188px;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .homeNav{
            width: 1200px;
            height: 44px;
            margin: 22px auto 0;
            .navLeft{
                float: left;
                .mpbLogo{
                    float: left;
                    width: 44px;
                    height: 44px;
                }
                .cityNameBox{
                    float: left;
                    width: 70px;
                    height: 44px;
                    position: relative;
                    margin-left: 15px;
                    .location{
                        float: left;
                        position: relative;
                        top: 15px;
                        margin-left: 2px;
                        margin-right: 6px;
                    }
                    p{
                        float: left;
                        line-height: 44px;
                        color: #fff;
                        font-size: 14px;
                        cursor: pointer;
                    }
                    ul{
                        position: absolute;
                        top: 36px;
                        width: 70px;
                        background: #fff;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 3px 4px 0px rgba(0, 0, 0, 0.14);
                        border-radius:2px;
                        padding-top: 14px;
                        li{
                            margin-bottom: 14px;
                            text-align: center;
                            cursor: pointer;
                            color: #333333;
                            font-size: 14px;
                            font-weight: 400;
                            cursor: pointer;
                        }
                        .cityNameColor{
                            color: #224e8f;
                        }
                    }
                }
            }
            .navCenter{
                float: left;
                ul{
                    margin-left: 70px;
                    li{
                        float: left;
                        color: #fff;
                        font-size: 14px;
                        margin-right: 28px;
                        line-height: 44px;
                        font-weight: 600;
                        cursor: pointer;
                        a{
                            color: #fff;
                        }
                    }
                }
            }
            .navRight{
                width: 300px;
                float: right;
                dl{
                    float: left;
                    line-height: 44px;
                    margin-left: 20px;
                    dt{
                        float: left;
                        position: relative;
                        top: -2px;
                    }
                    dd{
                        float: left;
                        color: #fff;
                        font-size: 14px;
                        margin-left: 10px;
                        a{
                            color: #fff;
                        }
                    }
                }
                .loginDl{
                    cursor: pointer;
                }
            }
        }
    }
    /* 搜索框 */
    .searchBar{
        width: 888px;
        padding: 36px 42px 24px;
        background: #fff;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.18);
        border-radius:14px;
        position: absolute;
        left: 50%;
        margin-left: -444px;
        bottom: -48px;
        z-index: 8;
        ul{
            width: 660px;
            height: 36px;
            position: relative;
            li{
                float: left;
                margin-right: 20px;
                color: #898989;
                font-size: 14px;
                height: 36px;
                position: relative;
                cursor: pointer;
            }
            .searchBarColor{
                color: #e8584f;
            }
            i{
                display: block;
                width:0;
                height:0;
                border-width: 0 8px 8px;
                border-style:solid;
                border-color:transparent transparent #f0f1f4;/*透明 透明  灰*/
                position: absolute;
                bottom: 0;
                left: 30px;
                transition: all ease-in-out .3s;
            }
        }
        .searchInput{
            width: 804px;
            input{
                width: 640px;
                height: 50px;
                background: #f0f1f4;
                float: left;
                border-radius: 4px 0px 0px 4px;
                padding-left: 16px;
                color: #333;
                font-size: 14px;
            }
            p{
                width: 164px;
                float: left;
                line-height: 50px;
                text-align: center;
                color: #fff;
                background: #e8584f;
                border-radius: 4px;
                font-size: 20px;
                font-weight: 600;
                cursor: pointer;
            }
        }
    }
}
/* 项目 */
.project{
    width: 100%;
    background: #fff;
    padding-top: 120px;
    .projectSell{
        width: 1200px;
        margin: 0 auto;
        .projectSellTop{
            width: 1200px;
            dt{
                float: left;
            }
            dd{
                float: left;
                margin-left: 20px;
                p{
                    color: #333333;
                    font-size: 30px;
                    font-weight: 600;
                    margin-top: 10px;
                    margin-bottom: 6px;
                    span{
                        color: #666666;
                        font-size: 20px;
                        margin-left: 22px;
                    }
                    h5{
                        color: #898989;
                        font-size: 14px;
                    }
                }
            }
            h6{
                float: right;
                color: #333333;
                font-size: 14px;
                cursor: pointer;
                margin-top: 40px;
                margin-right: 10px;
            }
        }
        .projectSellBoxWrap{
            width: 1200px;
            margin-top: 32px;
            height: 390px;
            .projectSellBox{
                width: 266px;
                height: 280px;
                float: left;
                margin-left: 44px;
                background:rgba(255,255,255,1);
                box-shadow:0px 3px 5px 0px rgba(0, 0, 0, 0.18);
                cursor: pointer;
                dl{
                    position: relative;
                    dt{
                        width: 266px;
                        height: 200px;
                        img{
                            width: 266px;
                            height: 200px;
                        }
                    }
                    dd{
                        width: 266px;
                        height: 80px;
                        padding: 14px 10px;
                        h3{
                            color: #333333;
                            font-size: 18px;
                            margin-bottom: 8px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .p1{
                            color: #898989;
                            font-size: 14px;
                            img{
                                margin-right: 4px;
                                position: relative;
                                top: -1px;
                            }
                        }
                        .p2{
                            color: #e8584f;
                            font-size: 18px;
                        }
                    }
                }
            }
            :first-child{
                margin-left: 0px;
            }
        }
    }
}
/* 品牌 */
.brandWrap{
    width: 100%;
    height: 584px;
    background: #eeeff1;
}
.brandBox{
    width: 1200px;
    height: 544px;
    margin: 0 auto;
    .brandTop{
        padding-top: 40px;
        dt{
            float: left;
        }
        dd{
            float: left;
            margin-left: 20px;
            p{
                color: #333333;
                font-size: 30px;
                font-weight: 600;
                margin-top: 10px;
                margin-bottom: 6px;
                span{
                    color: #666666;
                    font-size: 20px;
                    margin-left: 22px;
                }
                h5{
                    color: #898989;
                    font-size: 14px;
                }
            }
        }
        h6{
            float: right;
            color: #333333;
            font-size: 14px;
            cursor: pointer;
            margin-top: 30px;
            margin-right: 10px;
        }
    }
    .hotBrand{
        width: 1200px;
        ul{
            margin-top: 60px;
            li{
                float: left;
                margin-left: 20px;
                margin-bottom: 20px;
                cursor: pointer;
                img{
                    width: 224px;
                    height: 146px;
                }
            }
            :first-child{
                margin-left: 0px;
            }
            :nth-child(6){
                margin-left: 0px;
            }
        }
    }
}
/* 浮动左边 */
.homeLeftFloat{
    width:126px;
    height:90px;
    background: url(../assets/images/home/appDownload.png);
    background-repeat: no-repeat;
    position: fixed;
    bottom: 20px;
    left: 0px;
    z-index: 10;
    border-radius: 0 50% 50% 0;
    cursor: pointer;
    p{
        font-size: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        line-height: 90px;
        margin-left: 10px;
    }
    .whiteMore{
        position: absolute;
        right: 14px;
        top: 37px;
    }
}
/* 浮动底部 */
.homeBottom{
    width: 100%;
    height: 120px;
    background: rgba(46,91,138,1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.07);
    opacity: 0.8;
    position: fixed;
    bottom: 0;
    z-index: 9;
    .homeBottomBox{
        width: 1000px;
        height: 120px;
        margin: 0 auto;
        position: relative;
        .Iphone{
            position: absolute;
            bottom: 0px;
            left: 0px;
        }
        h3{
            width:164px;
            height:21px;
            font-size:22px;
            font-family:PingFangSC-Regular;
            font-weight:bold;
            color: #fff;
            float: left;
            margin-left: 214px;
            line-height: 120px;
        }
        .mpbApp{
            width:86px;
            height:86px;
            float: left;
            margin-left: 180px;
            margin-top: 16px;
        }
        h5{
            height:15px;
            font-size:16px;
            font-family:PingFangSC-Regular;
            font-weight: 600;
            color: #fff;
            float: left;
            margin-left: 40px;
            line-height: 120px;
        }
        .whiteClose{
            float: right;
            margin-top: 14px;
            cursor: pointer;
        }
    }
    &.showClass{
        -webkit-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -moz-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -webkit-transform: translateX(0);
        -moz-transform: translateX(0);
        -ms-transform: translateX(0);
        -o-transform: translateX(0);
        transform: translateX(0);
    }
    &.hideClass{
        -webkit-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -moz-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -webkit-transform: translateX(-100%);
        -moz-transform: translateX(-100%);
        -ms-transform: translateX(-100%);
        -o-transform: translateX(-100%);
        transform: translateX(-100%);
    }
}
/* 登录弹窗 */
.login{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    .loginBox{
        width:300px;
        height:246px;
        background: #fff;
        border-radius:2px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -122px;
        padding: 30px 20px;
        .blackClose{
            position: absolute;
            right: -16px;
            top: -16px;
            cursor: pointer;
        }
    }

    h3{
        color: #333;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
    }
    div{
        width: 258px;
        height: 36px;
        border: 1px solid #eaeaea;
        border-radius: 2px;
        margin-top: 20px;
    }
    input{
        line-height: 34px;
        padding-left: 6px;
        color: #898989;
        font-size: 14px;
    }
    .input1{
        padding-top: 7px;
        input{
            height: 18px;
        }
    }
    .input2{
        padding-top: 8px;
        input{
            height: 18px;
            width: 180px;
            border-right: 1px solid #eaeaea;
            float: left;
            box-sizing: border-box;
        }
        .btns{
            width: 76px;
            color: #da6761;
            font-size: 12px;
            cursor: pointer;
            text-align: center;
            float: right;
        }
        .codeColor{
            color: #898989;
        }
    }
    .loginBtn{
        border: none;
        background: #da6761;
        color: #fff;
        font-size: 14px;
        line-height: 36px;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
    }
}
/* 在线委托盒子 */
.ballWrap{
    height: 45px;
    position: fixed;
    left: 50%;
    top: 38%;
    margin-left: -100px;
    background: rgba(0,0,0,0.7);
    border-radius: 6px;
    z-index: 999;
    p{
        margin-left: 30px;
        margin-right: 30px;
        font-size: 16px;
        color: #fff;
        line-height: 45px;
        font-weight: 500;
        font-family: "KaiGenGothicSC-Light";
    }
}
.hoverLi{
    position: relative;
    .hoverBox{
        width: 124px;
        height: 210px;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.14);
        background: #fff;
        position: absolute;
        left: -30px;
        z-index: 10000;
        border-radius: 2px;
        text-align: center;
        /*动画*/
        opacity: 0;
        -webkit-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -moz-transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        transition: all 500ms cubic-bezier(.34, 1.21, .4, 1);
        -webkit-transform-origin: 50% 0;
        -moz-transform-origin: 50% 0;
        -ms-transform-origin: 50% 0;
        -o-transform-origin: 50% 0;
        transform-origin: 50% 0;
        -webkit-transform: translateY(0) scale(0);
        -moz-transform: translateY(0) scale(0);
        -ms-transform: translateY(0) scale(0);
        -o-transform: translateY(0) scale(0);
        transform: translateY(0) scale(0);
        .hoverBoxH3{
            font-weight: 600;
            color: #333;
            font-size: 16px;
            line-height: 20px;
            margin-top: 22px;
        }
        .hoverBoxH5{
            color: #333;
            font-size: 14px;
            line-height: 20px;
            font-weight: 600;
        }
        .mpbCode{
            width: 80px;
            height: 80px;
            margin-top: 10px;
            margin-bottom: 16px;
        }
    }
}
.hoverLi:hover{
    .hoverBox{
        opacity: 1;
        -webkit-transform: translateY(0) scale(1);
        -moz-transform: translateY(0) scale(1);
        -ms-transform: translateY(0) scale(1);
        -o-transform: translateY(0) scale(1);
        transform: translateY(0) scale(1);
    }
}
</style>
<style>
/* 轮播图定位 */
.el-carousel__item h3 {
    margin: 0 auto;
    width: 100%;
    height: 530px;
}

.el-carousel__item h3>img {
    width: 1920px;
    height: 530px;
    position: relative;
    left: 50%;
    margin-left: -960px;
}

/* 轮播图底部分页 */
/*.el-carousel__button {
    width: 10px!important;
    height: 10px!important;
    border-radius: 50%!important;
}
.el-carousel__arrow--right {
    right:  50px!important;
}
.el-carousel__indicators{
    position: absolute;
    bottom: 100px;
    left: 80%;
    display: none;
}*/
/* 轮播图左右按钮*/
.el-carousel__arrow{
    font-size: 50px!important;
}
.el-carousel__arrow--right {
    position: absolute;
    right: 100px;
    width:  80px;
    height: 80px;
}
.el-carousel__arrow--left {
    position: absolute;
    left: 40px;
    width:  80px;
    height: 80px;
}
</style>

