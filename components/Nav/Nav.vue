<template>
<div class="navWrap">
    <div class="nav">
        <nuxt-link to="/"><img src="~/assets/images/home/mpbLogo.png" alt="卖铺宝" class="logoImg"></nuxt-link>
        <ul @mouseover="hoverUl" @mouseleave="leaveUi">
            <li class="li5" @mouseover="hover5" @mouseleave="leaveLi">
                <nuxt-link to="/">首页</nuxt-link>
                <b class="triangle5"></b>
            </li>
            <li class="li1" @mouseover="hover1" @mouseleave="leaveLi">
                <nuxt-link :to="{name:'sell-sellList-id'}">销售项目</nuxt-link>
                <b class="triangle1"></b>
            </li>
            <li class="li2" @mouseover="hover2" @mouseleave="leaveLi">
                <nuxt-link :to="{name:'merchants-merchantsList-id'}">招商项目</nuxt-link>
                <b class="triangle2"></b>
            </li>
            <li class="li3" @mouseover="hover3" @mouseleave="leaveLi">
                <nuxt-link :to="{name:'brand-brandList'}">品牌库</nuxt-link>
                <b class="triangle3"></b>
            </li>
            <li class="li4" @mouseover="hover4" @mouseleave="leaveLi">
                <nuxt-link :to="{name:'news-newsList'}">行业资讯</nuxt-link>
                <b class="triangle4"></b>
            </li>
            <i class="triangle"></i>
        </ul>
        <div class="hoverDiv">
            <!-- <li class="hoverDiv"> -->
                <a href="javascript:void(0);">下载APP</a>
                <div class="hoverBox">
                    <h3 class="hoverBoxH3">下载APP</h3>
                    <img src="~/assets/images/home/mpbApp.png" class="mpbCode">
                    <h5 class="hoverBoxH5">更便捷更快速进行在线委托</h5>
                </div>
            <!-- </li> -->
        </div>
        <div class="floatRight">
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
            <img src="~/assets/images/home/blackClose.png" class="blackClose" @click="closeFun()">
        </div>
    </div>
</div>
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
        token: null,
        num: "",
        // showLogin: false,
        phoneVal: "", // 手机号
        securityCode: "", // 短信验证码
        btntxt: "获取验证码",
        disabled:false,
        time:0,
        chengaColor: false, // 倒计时出现
        showLogin: false, // 是否出现登录弹窗
        ballWrap: false, // 吐司
        ballWrapTxt: "" // 吐司文字
    }
  },
  watch:{
    childLogin(val){
      this.showLogin = val;
    }
  },
  // props: ['childLogin'],
  props: {
    childLogin: Boolean
  },
  components: {
    NavBar,
    Footer
  },
  methods:{
    // 点击导航
    achieveUrl(){
        var filename=window.location.href;
        if(filename.indexOf("sell") != -1){
            $(".triangle1").css({"display":"block"});
        } else if(filename.indexOf("merchants") != -1){
            $(".triangle2").css({"display":"block"});
        } else if(filename.indexOf("brand") != -1){
            $(".triangle3").css({"display":"block"});
        } else if(filename.indexOf("news") != -1){
            $(".triangle4").css({"display":"block"});
        }
    },
    // 滑过导航
    hover1(){
        $(".triangle").css({"left":"78px"});
    },
    hover2(){
        $(".triangle").css({"left":"162px"});
    },
    hover3(){
        $(".triangle").css({"left":"244px"});
    },
    hover4(){
        $(".triangle").css({"left":"324px"});
    },
    hover5(){
        $(".triangle").css({"left":"6px"});
    },
    hoverUl(){
        $(".triangle").css({"display":"block"});
    },
    // 鼠标离开
    leaveLi(){
        $(".triangle").css({"left": this.num + "px"});
    },
    leaveUi(){
        $(".triangle").css({"display":"none"});
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
            this.time=0;
            this.chengaColor = false;
            this.btntxt="获取验证码";
            this.disabled=false;
        }
    },
    // 点击登录按钮
    loginBtn() {
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
    closeFun(){
      this.showLogin = false;
      this.$emit('loginFun','false');
    }


  },
  mounted() {
    this.showLogin = this.childLogin;
    this.token = localStorage.token;
    this.sessionCityId = sessionStorage.cityId;
    this.sessionProvinceId = sessionStorage.provinceId;
    this.achieveUrl();
    // $(".li1").hover ({
    //     $(".triangle").css({left:"20px"});
    // }
    // );

    // $(function(){
        // $(".li1").hover(function(){
        //    //这里写鼠标悬浮其上的动作
        //     $(".triangle").css({left:"20px"});
        // }
    // });

  },
  updated() {

  },
}
</script>
<style lang="less" type="text/less" scoped>
@import '../../assets/css/nav.less';
</style>

