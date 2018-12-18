<template>
<section class="container">
<nav-bar/>
<div class="brandDetails clearfix">
    <div class="brandDetailsLeft">
        <div class="div1 clearfix">
            <div class="lbt">
                <el-carousel trigger="click" height="224px" :autoplay="false" @change="changeFun">
                    <el-carousel-item v-for="(item,index) in lbtArr" :key="item">
                        <h3><img :src="item"></h3>
                    </el-carousel-item>
                </el-carousel>
                <div class="lbtNum"><p>{{lbtNum}}/{{lbtTotal}}</p></div>
            </div>
            <dl>
                <dt>品牌介绍</dt>
                <dd>{{brandDetailsObj.description}}</dd>
            </dl>
        </div>
        <div class="div2">
            <h3>品牌联系人信息</h3>
            <div class="contactInfo">
                <dl v-for="(item,index) in brandDetailsArr">
                    <dt>
                        <ul>
                            <li class="li1">姓&emsp;&emsp;名：{{item.user_name}}</li>
                            <li>职&emsp;&emsp;务：{{item.post}}</li>
                        </ul>
                    </dt>
                    <dd>
                        负责区域：{{item.expand_area}}
                    </dd>
                    <h5 @click="showContact = true">去联系</h5>
                </dl>
            </div>
            <div class="addBrandUser" @click="showContact1 = true">我也要成为该品牌的联系人</div>
        </div>
        <div class="div3">
            <h3>热门品牌推荐</h3>
            <div class="hotBrands">
                <dl v-for="(item,index) in brandListArr" @click="goBrandDetails(item.id)">
                    <dt><img :src="item.logo"></dt>
                    <dd>品牌名称：{{item.brand_name}}</dd>
                </dl>
            </div>
        </div>
    </div>
    <div class="brandDetailsRight">
        <h2>{{brandDetailsObj.brand_name}}</h2>
        <ul>
            <li><span>品牌业态：</span><p>{{brandDetailsObj.brand_business}}</p></li>
            <li><span>品牌定位：</span><p>{{brandDetailsObj.brand_positioning}}</p></li>
            <li><span>推展区域：</span><p>{{brandDetailsObj.expand_area}}</p></li>
        </ul>
    </div>
    
</div>
<!-- 去联系弹窗 -->
<div class="contact" v-if="showContact">
    <div class="contactBox">
        <dl>
            <dt>查看更多品牌联系人信息 敬请下载APP</dt>
            <dd><img src="~/assets/images/home/mpbApp.png"></dd>
        </dl>
        <img src="~/assets/images/home/blackClose.png" class="blackClose" @click="showContact = false">
    </div>
</div>
<!-- 成为该品牌联系人弹窗 -->
<div class="contact" v-if="showContact1">
    <div class="contactBox">
        <dl>
            <dt>请下载app 成为该品牌联系人</dt>
            <dd><img src="~/assets/images/home/mpbApp.png"></dd>
        </dl>
        <img src="~/assets/images/home/blackClose.png" class="blackClose" @click="showContact1 = false">
    </div>
</div>
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
      title: '品牌详情',
      meta: [
        { hid: 'description', name: 'description', content: '品牌详情' },
        { hid: 'title', name: 'title', content: '品牌详情' },
        { hid: 'keywords', name: 'keywords', content: '品牌详情' }
      ]
    }
  },
  data () {
    return {
        brandId: "",
        brandDetailsObj: {},
        brandDetailsArr: [],
        mark: 0, //比对图片索引的变量
        lbtArr: [],
        defaultImg: 'this.src="' + require('~/assets/images/brand/err.png') + '"', //默认图片
        showContact: false, // 去联系弹窗默认
        showContact1: false, // 成为该品牌联系人弹窗默认
        lbtTotal: "",
        lbtNum: "",
        sessionCityId: "",
        brandListArr: []
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    // 接口调用
    brandDetailsData(){
        let _this = this
        axios({
            url: '/brand/detail',
            method: 'post',
            // data: obj
            params: {
                id: this.brandId,
                cityId: this.sessionCityId
            }
        }).then(data => {
            console.log(data);
            this.brandDetailsObj = data.data.detail;
            this.brandDetailsArr = data.data.brandContacts;
            this.lbtArr = data.data.brandPic;
            this.lbtTotal = data.data.brandPic.length;
            this.brandListArr = data.data.brandRecommended;
            console.log(this.brandListArr);
        }).catch(err => {
            console.log(err)
        });
    },
    changeFun(index){
        // console.log(index);
        this.lbtNum = index + 1;
    },
    // 固定栏
    handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 60) {
            $('.brandDetailsRight').css({ position: 'fixed', top: -20});
        } else {
            $('.brandDetailsRight').css({ position: 'fixed', top: 60});
        }
    },
    // 跳转品牌详情
    goBrandDetails(id){
        window.open("/brand/brandDetails/"+id);
    }
  },
  mounted(){
    this.sessionCityId = sessionStorage.cityId;
    this.sessionProvinceId = sessionStorage.provinceId;
    this.brandId = this.$route.params.id
    this.brandDetailsData();
    // 导航滑动
    // this.handleScroll();
    window.addEventListener('scroll', this.handleScroll);

  },
  created () {

  },
  destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="less" type="text/less" scoped>
.brandDetails{
    width: 1200px;
    margin: 0 auto;
    position: relative;
}
.brandDetailsLeft{
    width: 876px;
    float: left;
    .div1{
        width:876px;
        background: #fff;
        box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        margin-top: 24px;
        .lbt{
            width: 300px;
            height: 224px;
            overflow: hidden;
            float: left;
            position: relative;
            .lbtNum{
                width: 300px;
                height: 70px;
                background: url(../../../../assets/images/brand/lbtBottom.png);
                background-repeat: no-repeat;
                background-size: 300px 70px;
                position: absolute;
                bottom: 0;
                z-index: 999999;
                p{
                    width: 40px;
                    height: 26px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 999999;
                    color: #fff;
                } 
            }
        }
        dl{
            width: 576px;
            float: left;
            padding: 20px;
            dt{
                color: #333;
                font-size: 18px;
                margin-bottom: 20px;
            }
            dd{
                color: #333;
                text-align: justify;
                text-indent: 2em;
                line-height: 22px;
            }
        }
    }
    .div2{
        width: 876px;
        background: #fff;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        margin-top: 14px;
        padding-top: 20px;
        h3{
            color: #333;
            font-size: 18px;
            border-left: 3px solid #ec5e5c;
            padding-left: 27px;
        }
        .contactInfo{
            dl{
                width: 816px;
                height: 88px;
                margin-left: 30px;
                border-bottom: 1px solid #eaeaea;
                position: relative;
                padding: 20px 0;
                dt{
                    ul{
                        width: 700px;
                        height: 30px;
                        li{
                            color: #333;
                            font-size: 14px;
                            float: left;
                        }
                        .li1{
                            width: 180px;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                            margin-right: 20px;
                        }
                    }
                }
                dd{
                    color: #333;
                    font-size: 14px;
                }
                h5{
                    position: absolute;
                    right: 0px;
                    top: 30px;
                    width:60px;
                    height:26px;
                    background: #ec5e5c;
                    border-radius:2px;
                    line-height: 26px;
                    text-align: center;
                    color: #fefefe;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                }
            }
        }
        .addBrandUser{
            width: 876px;
            height: 55px;
            background: #ec5e5c;
            line-height: 55px;
            text-align: center;
            font-size: 18px;
            color: #fff;
            font-weight: 600;
            cursor: pointer;
        }
    }
    .div3{
        width: 876px;
        height: 272px;
        background: #fff;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
        margin-top: 14px;
        margin-bottom: 46px;
        padding-top: 20px;
        h3{
            color: #333;
            font-size: 18px;
            border-left: 3px solid #ec5e5c;
            padding-left: 27px;
        }
        .hotBrands{
            width: 876px;
            padding: 24px 30px;
            dl{
                width: 184px;
                float: left;
                margin-right: 24px;
                cursor: pointer;
                dt{
                    width: 184px;
                    height: 139px;
                    img{
                        width: 184px;
                        height: 139px;
                    }
                }
                dd{
                    color: #333;
                    font-size: 14px;
                    line-height: 30px;
                    color: #333;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            :last-child{
                margin-right: 0;
            }

        }
    }
}
.brandDetailsRight{
    width: 304px;
    height: 202px;
    background: #fff;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    float: right;
    margin-top: 24px;
    position: fixed;
    margin-left: 920px;
    h2{
        width: 304px;
        height: 64px;
        background: #ec5e5c;
        color: #fff;
        text-align: center;
        /*line-height: 64px;*/
        font-size: 20px;
        padding-top: 20px;
    }
    ul{
        width: 304px;
        padding: 14px 20px;
        li{
            width: 264px;
            height: 20px;
            margin-bottom: 8px;
            span{
                font-size: 14px;
                color: #333;
                width: 70px;
                display: block;
                float: left;
            }
            p{
                font-size: 14px;
                color: #333;
                text-align: justify;
                width: 194px;
                float: left;
            }
        }
    }
}
/* 去联系弹窗 */
.contact{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    dl{
        dt{
            color: #fff;
            font-size: 18px;
            text-align: center;
            margin-top: 26px;
            font-weight: 600;
        }
        dd{
            width: 144px;
            height: 144px;
            margin: 100px auto 0;
            img{
                width: 144px;
                height: 144px;
            }
        }
    }
    .contactBox{
        width: 416px;
        height: 348px;
        background: rgba(0,0,0,0.5);
        background: url(../../../../assets/images/brand/contactBg.png);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -208px;
        margin-top: -150px;
        padding: 30px 20px;
        .blackClose{
            position: absolute;
            right: -16px;
            top: -16px;
            cursor: pointer;
        }
    } 
}
</style>
<style type="text/css">
.lbt .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    /*opacity: 0.75;*/
    line-height: 150px;
    margin: 0;
}
.lbt .el-carousel__item h3 img{
    width: 300px;
    height: 224px;
}
.lbt .el-carousel__indicators{
    display: none;
}
.lbt .el-carousel__arrow{
    width: 40px !important;
    height: 150px !important;
    border-radius: 0px;
}
.lbt .el-carousel__arrow--left{
    background: url(../../../../assets/images/brand/leftIcon.png);
    background-repeat: no-repeat;
    background-size: 40px 150px;
    position: absolute;
    left: 0 !important;
}
.lbt .el-carousel__arrow--right{
    background: url(../../../../assets/images/brand/rightIcon.png);
    background-repeat: no-repeat;
    background-size: 40px 150px;
    position: absolute;
    right: 0px;
}
</style>

