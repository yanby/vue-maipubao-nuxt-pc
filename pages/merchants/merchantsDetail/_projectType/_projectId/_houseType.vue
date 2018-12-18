<template>
  <div class="sellDetail">
    <Nav :childLogin="login" @loginFun="myFun()"></Nav>
    <div class="wrap w1200">
      <H2>首页>招商项目>{{projectDetail.project_name}}</H2>
      <div class="msg clearfix">
        <div class="left">
          <h3>{{projectDetail.project_name}}</h3>
          <div class="banner clearfix">
            <div class="big left">
              <ul>
                <li v-for="item in projectPic"><img :src="item.pic_path" :onerror="defaultImg"></li>
              </ul>
            </div>
            <div class="small right">
              <div class="prev">∧</div>
              <div class="next">∨</div>
              <ol>
                <li v-for="item in projectPic"><img :src="item.pic_path" :onerror="defaultImg"></li>
              </ol>
            </div>
          </div>
          <div class="zhoubian" v-if="projectDetail.surrounding_facilities && type!=3">
            <h4><span></span>周边信息</h4>
            <p>{{projectDetail.surrounding_facilities}}</p>
          </div>
          <div class="weizhi">
            <div id="allmap"></div>
          </div>
          <div class="xinxi" v-if="type==1">
            <h4><span></span>信息概括</h4>
            <ul>
              <li v-if="projectDetail.developers"><span><i>开</i><i>发</i>商：</span><b>{{projectDetail.developers}}</b></li>
              <li v-if="projectDetail.opened_date"><span>开业时间：</span><b>{{projectDetail.opened_date}}</b></li>
              <li v-if="projectDetail.populations"><span>周边人口：</span><b>{{projectDetail.populations}}</b></li>
              <li v-if="projectDetail.ground_parking"><span>地上停车位：</span><b>{{projectDetail.ground_parking}}</b></li>
              <li v-if="projectDetail.underground_parking"><span>地下停车位：</span><b>{{projectDetail.underground_parking}}</b></li>
            </ul>
            <div class="jieshao" v-if="projectDetail.description">
              <span>项目介绍：</span><b>{{projectDetail.description}}</b>
            </div>
          </div>
          <div class="xinxi" v-if="type==2">
            <h4><span></span>信息概括</h4>
            <ul>
              <li v-if="projectDetail.developers"><span><i>开</i><i>发</i>商：</span><b>{{projectDetail.developers}}</b></li>
              <li v-if="projectDetail.trading_area"><span><b>商</b>圈：</span><b>{{projectDetail.trading_area}}</b></li>
              <li v-if="projectDetail.elevator"><span><b>电</b>梯：</span><b>{{projectDetail.elevator}}部</b></li>
              <li v-if="projectDetail.property_fee"><span><i>物</i><i>业</i>费：</span><b>{{projectDetail.property_fee}}元/㎡/月</b></li>
              <li v-if="projectDetail.floor_height"><span><b>层</b>高：</span><b>3.3m/{{projectDetail.floor_height}}层</b></li>
              <li v-if="projectDetail.decoration"><span><b>装</b>修：</span><b>{{projectDetail.decoration}}</b></li>
              <li v-if="projectDetail.parking_fee"><span><i>停</i><i>车</i>费：</span><b>{{projectDetail.parking_fee}}/月</b></li>
              <li v-if="projectDetail.property_company"><span>物业公司：</span><b>{{projectDetail.property_company}}</b></li>
              <li v-if="projectDetail.opened_date"><span>开盘时间：</span><b>{{projectDetail.opened_date}}</b></li>
              <li v-if="projectDetail.ground_parking"><span>地上停车位：</span><b>{{projectDetail.ground_parking}}个</b></li>
              <li v-if="projectDetail.underground_parking"><span>地下停车位：</span><b>{{projectDetail.underground_parking}}个</b></li>
            </ul>
            <div class="jieshao" v-if="projectDetail.description">
              <span>项目介绍：</span><b>{{projectDetail.description}}</b>
            </div>
          </div>
          <div class="yongjin" v-if="projectDetail.commission">
            <h4><span></span>佣金规则</h4>
            <p>{{projectDetail.commission}}</p>
          </div>
          <div class="louceng" v-if="projectFloorPic.length!=0">
            <h4 v-if="type==2"><span></span>楼层平面</h4>
            <h4 v-if="type==3"><span></span>户型</h4>
            <ul>
              <li v-for="(item,index) in projectFloorPic">
                <p>{{item.description}}</p>
                <!--<p>均价：{{item.price}}</p>-->
                <img :src="item.pic_path" alt="">
              </li>
            </ul>
          </div>
          <div class="zhoubian" v-if="type==3 && projectDetail.surrounding_facilities">
            <h4><span></span>周边设施</h4>
            <p>{{projectDetail.surrounding_facilities}}</p>
          </div>
          <div class="xiaoshou" v-if="type==3">
            <h4><span></span>销售信息</h4>
            <ul>
              <li v-if="projectDetail.sales_status"><span>销售状态：</span><b>{{projectDetail.sales_status}}</b></li>
              <li v-if="projectDetail.opened_date"><span>开盘时间：</span><b>{{projectDetail.opened_date}}</b></li>
              <li v-if="projectDetail.launch_date"><span>交房时间：</span><b>{{projectDetail.launch_date}}</b></li>
              <li v-if="projectDetail.sales_office_address"><span>售楼处地址：</span><b>{{projectDetail.sales_office_address}}</b></li>
            </ul>
            <div class="zhengshu" v-if="projectLicense.length!=0">
              <span>预售许可证：</span>
              <table>
                <tr>
                  <th>预售许可证</th>
                  <th>发证时间</th>
                  <th>对应楼栋</th>
                </tr>
                <tr v-for="item in projectLicense">
                  <td>
                    <p>{{item.sales_license}}</p>
                  </td>
                  <td>{{item.sales_license_date}}</td>
                  <td>{{item.sales_license_scope}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="guihua" v-if="type==3">
            <h4><span></span>小区规划</h4>
            <ul>
              <li v-if="projectDetail.covers_area"><span>占地面积：</span><b>{{projectDetail.covers_area}}㎡</b></li>
              <li v-if="projectDetail.construction_area"><span>建筑面积：</span><b>{{projectDetail.construction_area}}㎡</b></li>
              <li v-if="projectDetail.capacity_rate"><span><i>容</i><i>积</i>率：</span><b>{{projectDetail.capacity_rate}}</b></li>
              <li v-if="projectDetail.greening_rate"><span><i>绿</i><i>化</i>率：</span><b>{{projectDetail.greening_rate}}</b></li>
              <li v-if="projectDetail.ground_parking || projectDetail.underground_parking"><span><i>停</i><i>车</i>位：</span><b>地上{{projectDetail.ground_parking}} 地下{{projectDetail.underground_parking}}</b></li>
              <li v-if="projectDetail.buildings"><span>楼栋总数：</span><b>{{projectDetail.buildings}}</b></li>
              <li v-if="projectDetail.households"><span><i>总</i><i>户</i>数：</span><b>{{projectDetail.households}}</b></li>
              <li v-if="projectDetail.property_company"><span>物业公司：</span><b>{{projectDetail.property_company}}</b></li>
              <li v-if="projectDetail.property_fee"><span><i>物</i><i>业</i>费：</span><b>{{projectDetail.property_fee}}元/㎡·月</b></li>
            </ul>
            <p v-if="projectDetail.floor_height">楼层状况：{{projectDetail.floor_height}}</p>
          </div>
          <div class="tuijian">
            <h4><span></span>项目推荐</h4>
            <ul>
              <li v-for="(item,index) in projectRecommended" v-if="index<4" @click="tuijianFun(item)">
                <div class="img"><img :src="item.pictures" :onerror="defaultImg">
                  <div class="name">{{item.address}}</div>
                </div>
                <div class="price">{{item.project_name}}</div>
                <p><span>{{item.favorite_count}}元/天/㎡</span></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="title">
            <h3 class="clearfix">
              <dl>
                <dt></dt>
                <dd>咨询</dd>
                <div class="tel">{{project_manager_mobile}}</div>
              </dl>
              <dl>
                <dt class="myshou" @click="shoucang($event)"></dt>
                <dd>收藏</dd>
              </dl>
            </h3>
          </div>
          <div class="msg">
            <h4><span>¥</span><b>{{projectDetail.price}}</b><span>元</span><i>销售均价</i></h4>
            <div class="msg-content">
              <ul v-if="type==1">
                <li v-if="projectDetail.acreage">建筑面积：{{projectDetail.acreage}}㎡</li>
                <li v-if="projectDetail.project_business">项目业态：{{projectDetail.project_business}}</li>
              </ul>
              <ul v-if="type==2">
                <li v-if="projectDetail.acreage">建筑面积：{{projectDetail.acreage}}㎡</li>
              </ul>
              <ul v-if="type==3">
                <li v-if="projectDetail.acreage">建筑面积：{{projectDetail.acreage}}㎡</li>
                <li v-if="projectDetail.property_type">物业类别：{{projectDetail.property_type}}</li>
                <li v-if="projectDetail.decoration">装修状况：{{projectDetail.decoration}}</li>
                <li v-if="projectDetail.building_type">建筑类别：{{projectDetail.building_type}}</li>
                <li v-if="projectDetail.property_rights">产权年限：{{projectDetail.property_rights}}年</li>
                <li v-if="projectDetail.developers">开发商：{{projectDetail.developers}}</li>
              </ul>
              <div class="tag" v-if="tag.length!=0">
                <span v-for="item in tag">{{item}}</span>
              </div>
            </div>
            <div class="baobei" @click="baobeiFun()">项目报备</div>
            <div class="code"></div>
          </div>
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
        login: false,
        type: "",
        bannerIndex: "",//banner索引值
        loucengIndex:"",//楼层索引值
        title: 0,
        total: "",
        smallIndex: 1,
        bigIndex: 1,
        num2: 1,
        tag:"",
        token: "",
        titleMsg: "",
        projectId:"",//项目ID
        projectType:"",//项目类型
        houseType:"",//建筑类型
        projectLicense:"",//预售许可证
        projectPic: "",//项目图片
        projectDetail: "",//项目详情
        projectFloorPic: "",//楼层图片
        projectRecommended: "",//推荐
        project_manager_mobile:"",//项目经理电话
        defaultImg: 'this.src="' + require('~/assets/images/common/err.png') + '"',
      }
    },
    components: {
      Nav,
      Footer
    },
    mounted(){
      this.token = localStorage.token;
      this.projectId = this.$route.params.projectId;
      this.projectType = this.$route.params.projectType;
      this.houseType = this.$route.params.houseType;
      //houseType 1商业、2办公、3住宅
      if(this.houseType == 1){
        this.type = 1;
      }else if(this.houseType == 2){
        this.type = 2;
      }else if(this.houseType == 3){
        this.type = 3;
      }
      this.init();//初始化
    },
    updated(){
      this.banner();
      this.mapFun();//百度地图
    },
    methods:{
      init(){
        axios({
          url: '/project/detail',
          method: "post",
          params: {
            cityId: sessionStorage.cityId || 110100,
            projectId: this.projectId,
            projectType: this.projectType,
            houseType: this.houseType
          }
        }).then(function(res){
          console.log(res)
          this.total = res.data.projectPic.length;
          this.projectLicense = res.data.projectLicense;
          this.projectDetail = res.data.projectDetail;
          this.tag = res.data.projectDetail.tag;
          this.projectPic = res.data.projectPic;
          this.projectFloorPic = res.data.projectFloorPic;
          this.projectRecommended = res.data.projectRecommended;
          this.project_manager_mobile = this.projectDetail.project_manager_mobile;
          //如果关注过变换颜色
          if(this.projectDetail.is_favorite == 1){
            $(".myshou").addClass("cur")
          }

        }.bind(this)).catch(function(err){
          console.log("商店列表页面错误：",err)
        })
      },
      back(){
        if(this.$route.query.type == 1 && this.$route.query.url){
          this.$router.push({path:this.$route.query.url,query:{type:1}})
        }else if(getUrlId("referrerId")){
          this.$router.push({path:"/sellList"})
        }else{
          this.$router.go(-1)
        }
      },
      mapFun(){
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(this.projectDetail.lng,this.projectDetail.lat);//经度、维度
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 30,     // 信息窗口高度
          title : "", // 信息窗口标题
          enableMessage:true,//设置允许信息窗发送短息
          message:""
        }
        var project_address = this.projectDetail.project_address+"";
        var infoWindow = new BMap.InfoWindow(project_address, opts);  // 次数还没用完
        map.openInfoWindow(infoWindow,point); //开启信息窗口
      },
      banner(){
        var that = this;
        var index = 0;

        $(".big ul li").eq(0).show().siblings().hide();
        $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
        $(".small ol li").on("click",function () {
          index = $(this).index();
          $(this).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
          console.log(index+"---")
        })
        $(".small .prev").on("click",function () {
          if(index == 0){
            index = 0;
            that.$message("已经是第一张了")
          }
          else{
            index--;
            if(index <= 3){
              var small = index - 4;
              $(".small ol li:lt("+small+")").show();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
        $(".small .next").on("click",function () {
          if(index == that.projectPic.length-1){
            index = that.projectPic.length-1;
            that.$message("已经是最后一张了")
          }else{
            index++;
            if(index >= 4){
              var small = index - 3;
              $(".small ol li:lt("+small+")").hide();
            }
          }

          $(".small ol li").eq(index).addClass("cur").siblings().removeClass("cur");
          $(".big ul li").eq(index).show().siblings().hide();
        })
      },
      baobeiFun(){
        $(".code").fadeIn();
      },
      shoucang(e){// 点击收藏
        var that = this;
        if(localStorage.token){
          if($(e.srcElement).hasClass("cur")){//取消收藏
            axios({
              url: '/project/auth/cancelFavorite',
              method: "post",
              params: {
                projectId: this.projectId
              }
            }).then(function(res){
              console.log(res)
              if(res.data.code == "101"){
                this.$message('取消关注');
                $(e.srcElement).removeClass("cur")
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          }else{
            axios({
              url: '/project/auth/favorite',
              method: "post",
              params: {
                projectId: this.projectId
              }
            }).then(function(res){
              console.log(res)
              if(res.data.code == "101"){
                $(e.srcElement).addClass("cur")
                this.$message('关注成功');
              }
            }.bind(this)).catch(function(err){
              console.log("商店列表页面错误：",err)
            })
          }
        }else{
          this.login = true;
        }
      },
      yuyueFun(){//预约看房
        if(localStorage.token){
          this.$http({
            url: this.changeData() + "/customer/auth/list",
            method: 'post',
          }).then(res => {
            console.log(res)
            if(res.data.code == "101"){
              if(res.data.customerList.length == 0){
                this.$router.push({path:"/clientEntering",query:{projectType:this.projectType,houseType:this.houseType,projectId:this.projectDetail.projectId}})
              }else{
                this.$router.push({path:"/selectReport",query:{projectType:this.projectType,houseType:this.houseType,projectId:this.projectDetail.projectId}})
              }
            }
          }).catch(err => {
            console.log(err)
          });
        }else{
          this.$router.push({path:"/login"})
        }
      },
      tuijianFun(item){//推荐详情
        window.open("/merchants/merchantsDetail/"+item.projectType+"/"+item.projectId+"/"+item.houseType);
      },
      myFun(){
        this.login = false;
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import '../../../../../assets/css/shopDetail.less';
</style>
