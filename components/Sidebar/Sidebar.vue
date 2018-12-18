<template>
  <div class="Sidebar">
    <div class="about-left left">
      <ul>
        <li :class="{cur: isCur1}"><span></span><nuxt-link :to="{name:'introduce-aboutUp'}"><b></b>关于优铺</nuxt-link></li>
        <li :class="{cur: isCur2}"><span></span><nuxt-link :to="{name:'introduce-joinUp'}"><b></b>加盟优铺</nuxt-link></li>
        <li :class="{cur: isCur3}"><span></span><nuxt-link :to="{name:'introduce-collegeUp'}"><b></b>优铺商学院</nuxt-link></li>
        <li :class="{cur: isCur4}"><span></span><nuxt-link :to="{name:'introduce-contactUp'}"><b></b>联系优铺</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              isCur1: false,
              isCur2: false,
              isCur3: false,
              isCur4: false,
            }
        },
        mounted(){
          this.init();
          //左边栏浮动
          this.scroll();
        },
        methods: {
          init(){
            var url = window.location.href;
            if(url.indexOf("aboutUp") != -1){
              this.isCur1 = true;
            }else if(url.indexOf("joinUp") != -1){
              this.isCur2 = true;
            }else if(url.indexOf("collegeUp") != -1){
              this.isCur3 = true;
            }else if(url.indexOf("contactUp") != -1){
              this.isCur4 = true;
            }
          },
          scroll(){
            window.onscroll = function(){
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
              if(scrollTop >= 121){
                $(".about-left").addClass("cur");
              }else{
                $(".about-left").removeClass("cur");
              }
            }
          }
        }
    }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../assets/css/aboutUp.less';
</style>
