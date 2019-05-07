<template>

  <div class="container">
    <div class="banner">
      <swiper :list="swiperlist" :interval="2000" loop auto height="307px"></swiper>
    </div>
    <div class="navigationTitle">
				<span>
					<font color="#cecdcd">·</font>
					&nbsp;&nbsp;金融服务专家&nbsp;&nbsp;
					<font color="#cecdcd">·</font>
				</span>
    </div>
    <div class="navigation">
      <div v-for="(item, index) in loanProductTypeList" :key="'loanProductType' + index">
        <img :title="item.name" name="navigationImg" :src="item.id!=activeProductsubtype?item.imageUrl:item.selectedImageUrl" @click="onLoanProductTypeChange(item)" >
        <p>{{item.name}}</p>
      </div>
    </div>
    <hr>
    <div class="productTitle">
      <div></div>
      <span>推荐产品</span>
    </div>
    <div class="productList">
      <div v-if="showProductList.length === 0" style="display: flex;align-items: center;justify-content: center;font-size: 19.5px">暂无产品</div>
      <div class="product" v-for="(item, index) in showProductList" :key="'loanProduct' + index">
        <!--<div class="productType1" v-if="item.name=='任性贷'" :style="{backgroundImage:'url('+require('../../assets/imgs/rxdm_bg.png')+')'}" @click="goDetail(item.id,item.name,'rxd')"></div>-->
        <div class="flexCenter">
          <div class="producetLeft flexCenter">
            <div style="margin: 5% 0;">
              <img :title="item.name"  :src="item.image">
              <p>{{item.name}}</p>
            </div>
          </div>
          <div class="producetRight">
            <p>金额：{{item.factorLoanMoneyAmount}}</p>
            <p>利率：{{item.factorLoanFeeRate}}</p>
            <button @click="goDetail(item.id,item.name)"> 立即申请</button>
          </div>
        </div>
      </div>
    </div>
    <div class="service">
      <a href='#' @click="showWX=true">
        <div class="serviceLeft" @click="showWX=true">
          <img :src="require('../../assets/imgs/servicewx.png')" alt="在线客服">
          <span style="color:#464545">在线客服</span>
        </div>
      </a>
      <a :href="'tel:'+customerMrTel">
        <div class="serviceRight">
          <img :src="require('../../assets/imgs/servicephone.png')"  alt="电话咨询">
          <span style="color:#464545">电话咨询</span>
        </div>
      </a>
    </div>
    <div class="bottom">
      <!--<img :src="require('../../assets/imgs/bottom1.png')" >-->
      <div style="font-size: 24px;">{{customerMrInfo&&customerMrInfo.departmentlist.length>0&&customerMrInfo.departmentlist[0].value?customerMrInfo.departmentlist[0].value:'重庆总部运营中心'}}</div>
      <!--<input :value="customerMrInfo&&customerMrInfo.departmentlist.length>0&&customerMrInfo.departmentlist[0].value?customerMrInfo.departmentlist[0].value:'重庆总部运营中心'" readonly="true" />-->
    </div>
    <x-dialog v-model="showWX" class="dialog-demo">
      <!--{{customerMrWxImageUrl}}-->
      <div class="img-box" style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
        <img :src="customerMrWxImageUrl" />
      </div>
      <div @click="showWX=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>
  </div>

</template>
<script>
  import {
    Swiper,
    SwiperItem,
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  export default {
    mounted() {},
    directives: {
      TransferDom
    },
    components: {
      Swiper,
      SwiperItem,
      XDialog,

    },
    data() {
      return {
        showProductList: [],
        customerMr: '',
        customerMrInfo: null,
        // swiperlist: [{
        //   img: require('../../assets/imgs/banner.jpeg')
        // }],
        swiperlist: [],
        showWX: false,
        renxd: {
          id: "1111066848600739841",
          name: "任性贷",
          loanProductTypeId: "pl_productsubtype_type_01"
        },
        loanProductTypeList: [{
          "imageUrl": require("../../assets/imgs/xiaowei.png"),
          "selectedImageUrl": require("../../assets/imgs/xiaoweihuang.png"),
          "id": "pl_productsubtype_type_02",
          "name": "极速贷",
        }, {
          "imageUrl": require("../../assets/imgs/rzzl.png"),
          "selectedImageUrl": require("../../assets/imgs/rzzlhuang.png"),
          "id": "pl_productsubtype_type_01",
          "name": "小微金融",
        }, {
          "imageUrl": require("../../assets/imgs/gongying.png"),
          "selectedImageUrl": require("../../assets/imgs/gongyinghuang.png"),
          "id": "pl_productsubtype_type_03",
          "name": "供应链金融",
        }, {
          "imageUrl": require("../../assets/imgs/zijin.png"),
          "selectedImageUrl": require("../../assets/imgs/zijinhuang.png"),
          "id": "pl_productsubtype_type_04",
          "name": "项目融资",
        }, ],
        activeProductsubtype: 'pl_productsubtype_type_02',
        productlist: [],
      }
    },
    computed: {
      // showProductList: {
      //   get: function() {
      //     // return this.productlist.filter(p => p.loanProductTypeId == this.activeProductsubtype);
      //     return this.productlist.forEach(p => {
      //       console.log(p.loanProductTypeId)
      //       p.loanProductTypeId == this.activeProductsubtype
      //     });
      //   },
      // },
      customerMrWxImageUrl: {
        get: function() {
          if (!this.customerMr) {
            if (!this.customerMrInfo || !this.customerMrInfo.departmentlist || this.customerMrInfo.departmentlist.length == 0) {
              return null;
            }
            let orgId = this.customerMrInfo.departmentlist[0].key;
            return window.SITE_CONFIG['serverUrl'] + "/pmtapi/base_AssetManagement/view?bid=" + orgId + '&acid=base_Organization_wx';
          }
          return window.SITE_CONFIG['serverUrl'] + "/pmtapi/base_AssetManagement/view?bid=" + this.customerMr + '&acid=base_User_wx';
        },
      },
      customerMrTel: {
        get: function() {
          if (!this.customerMrInfo) {
            return null;
          }
          return this.customerMrInfo.mobile;
        },
      },
    },
    created() {
      // this.$axios({
      //   method:'post',
      //   url:'api',
      //   data:this.qs.stringify({    //这里是发送给后台的数据
      //     userId:this.userId,
      //     token:this.token,
      //   })
      // }).then((response) =>{          //这里使用了ES6的语法
      //   console.log(response)       //请求成功返回的数据
      // }).catch((error) =>{
      //   console.log(error)       //请求失败返回的数据
      // })
      let self = this;
      if (self.$route.query.cr) {
        self.customerMr = self.$route.query.cr;
        self.$store.commit('setCustomerMrId', self.customerMr);
      }
      this.$nextTick(() => {
        this.loadCustomerMrInfo();
        this.loadSwiperlist();
        this.loadLoanProductSubTypeList();
      })
    },
    mounted() {

    },
    methods: {
      getList () {
        this.showProductList = []
        this.productlist.forEach(p => {
          // if (p.loanProductTypeId.indexOf('pl_productsubtype_type_0203') !== -1 && this.activeProductsubtype === 'pl_productsubtype_type_02') {
          //   this.showProductList.push(p)
          // }
          if (p.loanProductTypeId.indexOf('pl_productsubtype_type_01') !== -1 && this.activeProductsubtype === 'pl_productsubtype_type_01') {
            this.showProductList.push(p)
          } else if (p.loanProductTypeId.indexOf('pl_productsubtype_type_02') !== -1 && this.activeProductsubtype === 'pl_productsubtype_type_02') {
            this.showProductList.push(p)
          } else if (p.loanProductTypeId.indexOf('pl_productsubtype_type_03') !== -1 && this.activeProductsubtype === 'pl_productsubtype_type_03') {
            this.showProductList.push(p)
          } else if (p.loanProductTypeId.indexOf('pl_productsubtype_type_04') !== -1 && this.activeProductsubtype === 'pl_productsubtype_type_04') {
            this.showProductList.push(p)
          }
          // if (this.activeProductsubtype === p.loanProductTypeId) {
          //   this.showProductList.push(p)
          // } else {
          //   // this.showProductList.push(p)
          // }
          // console.log(this.showProductList)
          // p.loanProductTypeId == this.activeProductsubtype
        });
      },
      loadCustomerMrInfo() {
        let self = this;
        tapp.services.PL_LoanAdvice.getCustomerMrInfo(self.customerMr).then(function(res) {
          console.log(res)
          self.customerMrInfo = res;
        })
      },
      loadSwiperlist() {
        let self = this;
        tapp.services.PL_LoanAdvice.getIndexImageList().then(function(res) {
          self.swiperlist = res.map(p => {
            return {
              url: p.linkUrl,
              img: self.getSwiperImageUrl(p),
              //title:p.title,
            };
          })
        })
      },
      onLoanProductTypeChange(item) {
        this.activeProductsubtype = item.id;
        this.getList()
      },
      getSwiperImageUrl(item) {
        if (!item) {
          return null;
        }
        return window.SITE_CONFIG['serverUrl'] + "/pmtapi/base_AssetManagement/view?bid=" + item.id + '&acid=base_information';
      },
      compare(property){
        return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
        }
      },
      formateIOS (time) {
        var myDate = new Date((time.replace(/-/g, "/")));
        return myDate;
      },
      loadLoanProductSubTypeList() {
        let self = this;
        tapp.services.PL_LoanAdvice.getLoanProductSubTypeList(self.customerMr).then(function(res) {
          self.productlist = res;
          self.productlist.forEach(p => {
            // console.log(new Date(p.gmtCreatedOn).getTime() +'-'+p.name)
            p.gmtCreatedOn = self.formateIOS(p.gmtCreatedOn).getTime()
            p.image = require("../../assets/imgs/product1.png");
          });
          self.productlist.sort(self.compare('gmtCreatedOn')).reverse()
          // alert(JSON.stringify(self.productlist))
          // self.productlist.push(self.renxd);
          self.getList()
        })
      },
      goDetail(id, name, goto) {
        console.log(this.activeProductsubtype)
        let self = this;
        self.customerMr = self.$route.query.cr;
        console.log(self.customerMr);
        if (this.activeProductsubtype === 'pl_productsubtype_type_02') {
          this.$router.push({
            path: '/loanProductInfo?id=' + id + '&rc=' + self.customerMr
          })
        } else {
          this.$router.push({
            path: '/loanProductInfo2?id=' + id + '&rc=' + self.customerMr
          })
        }


        // if(goto == "rxd"){
        //   this.$router.push({
        //     path: '/loanRXDProduct?id=' + id + '&name=' + name
        //   })
        // }else{
        //   this.$router.push({
        //     path: '/loanProductInfo?id=' + id
        //   })
        // }
      },
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  /*取消列表的图标内容*/

  ul {
    list-style: none;
  }

  .container {
    color: #464545;
    width: 750px;
    min-height: 1334px;
    overflow: auto;
    position:relative;
    top:0px;
    left:0px;

  }

  .banner {
    width: 100%;
    height: 307px;
    border: 0;
    margin-top: 0 auto;
    position: relative;
    overflow: hidden;
  }


  .vux-swiper {
    height: 307px !important;
  }

  .navigationTitle {
    margin-top: 80px;
    text-align: center;
  }

  .navigationTitle span {
    font-size: 21.3px;
    font-weight: 600;
  }




  /* 定位距离顶部广告高+导航标题top+导航标题字体宽度的一半*/

  .navigationTitle span:before,
  .navigationTitle span:after {
    content: '';
    position: absolute;
    top: 400px;
    width: 25%;
    height: 3.3px;
  }

  .navigationTitle span:before {
    left: 10%;
    background-image: linear-gradient(to right, #fff, #e5e5e5);
  }

  .navigationTitle span:after {
    right: 10%;
    background-image: linear-gradient(to left, #fff, #e5e5e5);
  }

  .bottom {
    width: 750px;
    height: 66.7px;
    background: #e5e5e5;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bottom img {
    height: 60%;
  }

  .bottom input {
    width: 40%;
    margin-left: 2%;
    border-radius: 13.34px;
    border: 1px solid #fefefe;
    background-color: #e5e5e5;
    font-size: 24px;
    text-align: center;
    padding: 0;
    background: url(../../assets/imgs/bottom2.png) no-repeat;
    background-position: 95%;
  }

  .navigation {
    width: 100%;
    height: 110px;
    margin-top: 33.35px;
    margin-bottom: 13.34px;
    text-align: center;
  }

  .navigation>div {
    display: inline-block;
    width: 15%;
    height: 100%;
    font-size: 19.5px;
    margin: 0 3%;
  }

  .navigation img {
    width: 101px;
    height: 80px;
  }

  hr {
    border: 2.25px solid #e5e5e5;
    color: #e5e5e5;
    width: 750px;
  }

  .productTitle {
    width: 100%;
    height: 40px;
    margin-bottom: 13.34px;
  }

  .productTitle div {
    float: left;
    width: 1.3vw;
    height: 100%;
    margin-left: 25px;
    margin-right: 15px;
    background: #1fbcff;
    border: 0;
  }

  .productTitle span {
    font-size: 26.68px;
    font-weight: 600;
  }

  .productList {
    margin-bottom: 70px;
  }

  .product {
    border: 1px solid #c5c5c5;
    margin: 0 9% 3%;
    height: 173.42px;
  }
  .productType1 {
    width: 100%;
    height: 100%;
    /* background-image: url("~@/assets/imgs/rxdm_bg.png"); */
    background-size: 100% 100%;
  }
  .flexCenter{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .producetLeft {
    /*margin: 3% 15%;*/
    /*float: left;*/
    /*width: 100px;*/
    width: 50%;
    height: 90%;
    text-align: center;
  }

  .producetLeft img {
    width: 90px;
    height: 60%;
    margin-bottom: 4%;
  }

  .producetLeft p,
  .producetRight p {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
  }

  .producetRight {
    /*margin: 5% 10% 2%;*/
    /*float: right;*/
    /*width: 200px;*/
    width: 50%;
    height: 100%;
    text-align: left;
  }

  .producetRight button {
    margin-top: 4%;
    font-size: 20px;
    padding: 6.7px 37.5px;
    background: #fe942e;
    border: 0;
    color: #fff;
    border-radius: 20px;
  }

  .service {
    position: absolute;
    top: 267px;
    left: 56.25px;
    right: 56.25px;
    border: 2px solid #c5c5c5;
    height: 106.72;
    border-radius: 30px;
    background: #fff;
  }

  .service div {
    width: 315px;
    background: #fff;
    margin: 1.4% 0 1% 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .serviceLeft {
    float: left;
    border-left: 0;
    border-right: 2px solid #c5c5c5;
    border-top: 0;
    border-bottom: 0;
    border-radius: 29px 0 0 29px;
  }

  .serviceRight {
    float: right;
    border: 0;
    border-radius: 0 29px 29px 0;
  }

  .service div img {
    width: 88px;
    height: 88px;
  }

  .service div span {
    font-size: 21px;
    font-weight: 500;
    margin-left: 22px;
  }
</style>
<style lang="less" scoped>
  @import '~vux/src/styles/close';

  .dialog-demo {
    .weui-dialog {
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      height: 350px !important;
      overflow: hidden;
    }
    .img-box img {
      height: 100%;
      width: 100%;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
</style>
