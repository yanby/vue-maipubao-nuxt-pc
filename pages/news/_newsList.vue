<template>
<section class="container">
<nav-bar/>
<div class="news">
    <div class="newsTop">
        <img src="~/assets/images/news/newsTxt.png" class="newsTxt">
    </div>
    <div class="newsList clearfix">
        <!-- 左边盒子 -->
        <div class="newsLeft">
            <div class="newsBox clearfix">
                <dl class="clearfix" v-for="(item,index) in newsListArr" @click="goNewsDetails(item.id)">
                    <dt>
                        <h3>{{item.dateStr}}</h3>
                        <h5>{{item.yearToMonth}}</h5>
                    </dt>
                    <dd><p>{{item.title}}</p></dd>
                </dl>
            </div>
            <!-- 分页 -->
            <div class="page" v-show="newsListArr != ''">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="20"
                    :total="total">
                </el-pagination>
            </div>
        </div>
        <!-- 右边盒子 -->
        <div class="newsRight">
            <div class="recommendProject">
                <h2>火热项目</h2>
                <dl v-for="(item,index) in hotProjectList" v-if="index < 3" @click="goProjectDetail(item)">
                    <dt>
                        <img :src="item.pictures">
                        <p>{{item.address}}</p>
                    </dt>
                    <dd>
                        <h3>{{item.project_name}}</h3>
                        <h5 v-if="item.projectType == 1">{{item.price}}元/㎡</h5>
                        <h5 v-else>{{item.price}}元/天/㎡</h5>
                    </dd>
                </dl>
            </div>
            <div class="recommendBrand">
                <h2>优质品牌推荐</h2>
                <dl v-for="(item,index) in hotBrandList" v-if="index < 2" @click="goBrandDetail(item.id)">
                    <dt><img :src="item.logo"></dt>
                    <dd>{{item.brand_name}}</dd>
                </dl>
            </div>
        </div>
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
      title: '行业资讯',
      meta: [
        { hid: 'description', name: 'description', content: '行业资讯' },
        { hid: 'title', name: 'title', content: '行业资讯' },
        { hid: 'keywords', name: 'keywords', content: '行业资讯' }
      ]
    }
  },
  data () {
    return {
        sessionCityId: "110100",
        newsListArr: [],
        shopListArr: [], //招商列表
        hotProjectList: [], //项目列表
        hotBrandList: [], //品牌列表
        // 分页
        // page: "0",
        // rows: "20",
        pageSize: "20",
        pageNum: 1,
        total: 100  //接收渲染数据总数的参数
    }
  },
  components: {
    NavBar,
    Footer
  },
  methods: {
    newsListData(){
        axios({
            url: '/information/list',
            method: 'post',
            params: {
                cityId: this.sessionCityId || 110100, //所属城市【必传】
                pageSize: this.pageSize,   // 每页数据量【必传】
                pageNum: this.pageNum,     // 页码从1开始【必传】
            }
        }).then(data => {
            console.log("萌萌哒");
            console.log(data);
            this.newsListArr = data.data.informationList;
            this.total = parseInt(data.data.totalCount);
            this.hotProjectList = data.data.hotProjectList;
            this.hotBrandList = data.data.hotBrandList;
            // this.total = data.data.data.count;
            console.log(this.newsListArr);
            this.newsListArr.forEach(function (item,index) {
                var str = item.publish_date.substring(0, 7);
                var str2 = item.publish_date.substring(8, 10);
                item.yearToMonth = str;
                item.dateStr = str2;
            })
        }).catch(err => {
            console.log(err)
        });
    },
    listData() {
        let _this = this
        axios({
            url: '/show/showInfo',
            method: 'post',
            params: {
                "cityId": this.sessionCityId || 110100,
            }
        }).then(data => {
            console.log("嘻嘻");
            console.log(data);
            this.sellListArr = data.data.data.selectProject1;  // 销售列表
            this.shopListArr = data.data.data.selectProject2;  // 招商列表
        }).catch(err => {
            console.log(err)
        });
    }, 
    // 跳转资讯详情
    goNewsDetails(id){
        // window.open("/news/newsDetails/"+id);

        window.open('/news/newsDetails/'+id,'_self'); 
        // window.location.href = '/news/newsDetails/'+id,;
    },
    //分页
    handleCurrentChange(val) {
        // console.log(val);
        this.pageNum = val;
        // this.pageNum = val - "1";
        // if(this.pageNum < 1){
        //     this.pageNum = 0;
        // }
        $('html , body').animate({scrollTop: 100},1500);
        this.newsListData();
    },
    // 跳转到品牌详情页面
    goBrandDetail(id){
        // window.location.href = "shopDetail.html?shopId=" + id;
        window.open("/brand/brandDetails/"+id);
    },
    // 跳转到项目详情页面
    goProjectDetail(item){
        if(item.projectType == 1){
            window.open("/sell/sellDetail/"+1+"/"+item.projectId+"/"+item.houseType);
        }else{
            window.open("/merchants/merchantsDetail/"+2+"/"+item.projectId+"/"+item.houseType);
        }
    },

  },
  mounted(){
    this.sessionCityId = sessionStorage.cityId;
    this.sessionProvinceId = sessionStorage.provinceId;
    this.newsListData();
    this.listData();
  },
  created () {
    
  }
}
</script>

<style lang="less" type="text/less" scoped>
.news{
    width: 100%;
}
.newsTop{
    width: 100%;
    height: 300px;
    background: url(../../assets/images/news/newsBg.png);
    background-repeat: no-repeat;
    position: relative;
    .newsTxt{
        width: 400px;
        height: 105px;
        position: absolute;
        left: 50%;
        margin-left: -200px;
        top: 92px;
    }
}
/* 内容展示*/
.newsList{
    width: 1200px;
    margin: 15px auto 82px;
}
.newsLeft{
    width: 964px;
    float: left;
    .newsBox{
        width: 964px;
        dl{
            width: 474px;
            height: 106px;
            box-shadow:0px 3px 8px 0px rgba(0, 0, 0, 0.08);
            float: left;
            box-sizing: border-box;
            margin-left: 16px;
            margin-bottom: 14px;
            background: #fff;
            cursor: pointer;
            padding: 12px 20px;
            dt{
                width: 102px;
                height:82px;
                border-right: 1px solid #eaeaea;
                float: left;
                h3{
                    font-size: 40px;
                    color: #999999;
                    text-align: center;
                    padding-top: 18px;
                    margin-bottom: 12px;
                }
                h5{
                    font-size: 18px;
                    color: #999999;
                    text-align: center;
                }
            }
            dd{
                width: 314px;
                height:62px;
                float: left;
                margin-left: 18px;
                 margin-top: 16px;
            }  
            p{
                font-weight: 600;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 26px;
            } 
        } 
        dl:hover{
            background: #da6761;
            h3{
                color: #fff;
            }
            h5{
                color: #fff;
            }
            p{
                color: #fff;
            }
        }
        dl:nth-child(odd){
            margin-left: 0px;
        } 
    }
}
.newsRight{
    width: 224px;
    float: right;
    .recommendProject{
        width: 224px;
        padding: 28px 20px;
        h2{
            color: #333;
            font-size: 18px;
        }
        dl{
            width: 184px;
            height: 190px;
            margin-top: 16px;
            cursor: pointer;
            dt{
                width: 184px;
                height: 140px;
                position: relative;
                img{
                    width: 184px;
                    height: 140px;
                }
                p{
                    width:184px;
                    height:30px;
                    background:rgba(0,0,0,1);
                    opacity:0.57;
                    position: absolute;
                    bottom: 0px;
                    color: #fff;
                    font-size: 14px;
                    line-height: 30px;
                    padding: 0px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            dd{
                h3{
                    color: #333;
                    font-size: 14px;
                    margin-top: 6px;
                    margin-bottom: 4px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                h5{
                    color: #e8584f;
                    font-size: 14px;
                }
            }
        }
    }
    .recommendBrand{
        width: 224px;
        padding: 26px 20px 20px;
        h2{
            color: #333;
            font-size: 18px;
        }
        dl{
            width: 184px;
            height: 170px;
            margin-top: 16px;
            cursor: pointer;
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
                margin-top: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.recommendProject{
    width:224px;
    height:698px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07); 
    margin-bottom: 14px;
}
.recommendBrand{
    width:224px;
    height:446px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(234,234,234,1);
    box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.07);
}
/*分页*/
.page{
    width: 100%;
    margin: 30px auto 0;
    text-align: center;
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
