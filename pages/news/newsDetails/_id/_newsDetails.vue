<template>
<section class="container">
<nav-bar/>
<div class="newsDetailsWrap">
    <!-- 新闻详情nav -->
    <div class="newsDetailsTop">
        <span class="span1" style="width: 34px;">
            <nuxt-link to="/">首页</nuxt-link>>
        </span>
        <span>
            <nuxt-link :to="{name:'news-newsList'}">行业资讯></nuxt-link>
        </span>
        <span>资讯详情</span>
    </div>
    <!-- 新闻详情 -->
    <div class="newsDetails">
        <h1 class="newsTitle">{{newsTitle}}</h1>
        <h4 class="newsDate">{{newsDate}}</h4>
        <div v-html="newsMain"></div>
    </div>
</div>
<Footer></Footer>
</section>
</template>

<script>
import axios from '~/plugins/axios.js';
import NavBar from '~/components/Nav/Nav';
import Footer from '~/components/Footer/Footer';
export default {
  head () {
    return {
      title: '资讯详情',
      meta: [
        { hid: 'description', name: 'description', content: '行业资讯' },
        { hid: 'title', name: 'title', content: '行业资讯' },
        { hid: 'keywords', name: 'keywords', content: '行业资讯' }
      ]
    }
  },
  data () {
    return {
        newsId: "",
        newsTitle: "",
        newsDate: "",
        newsMain: ""    
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    // 新闻展示
    newsData(){
        axios({
            url: '/information/detail',
            method: 'post',
            params: {
                id: this.newsId
            }
        }).then(data => {
            console.log(data);
            this.newsTitle = data.data.informationDetail.title;
            this.newsDate = data.data.informationDetail["publish_date"].substring(0, 10);
            this.newsMain = data.data.informationDetail.content;
            // console.log)
        }).catch(err => {
            console.log(err)
        });
    },
  },
  mounted(){
    this.newsId = this.$route.params.id;
    this.newsData();
  },
  created(){
    
  }
}
</script>

<style lang="less" type="text/less" scoped>
.newsDetailsWrap{
    width: 1200px;
    margin: 0 auto 80px;
}
.newsDetailsTop{
    height: 60px;
    .span1{
        width: 34px;
    }
    span{
        display: inline-block;
        font-size: 12px;
        color: #898989;
        float: left;
        line-height: 60px;
    }
}
.newsDetails{
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius:2px;
    padding: 30px 45px 60px 45px;
    overflow: hidden;
}
.newsTitle{
    text-align: center;
    color: #323333;
    font-size: 30px;
    font-weight: 600;
    line-height: 40px;
}
.newsDate{
    color: #999899;
    font-size: 16px;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 36px;
}
</style>

