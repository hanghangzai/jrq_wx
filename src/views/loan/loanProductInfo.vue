<template>
  <div class="container">
    <div class="backdiv" @click="goBack()">
      <img :src="require('../../assets/imgs/back.png')"/>
      <button style="font-size: 24px;color:black">返回</button>
    </div>
    <div class="productInfo">
      <div>
        <img :src="require('../../assets/imgs/product1.png')"  >
      </div>
      <article>
        <header>
          <h1>{{model.name}}</h1>
        </header>
        <p>{{model.remark}}</p>
      </article>
    </div>
    <div class="productDetail">
      <div>
        <div class="detailleft">
          贷款额度
        </div>
        <div class="detailRight" id="detailLine">
          {{model.factorLoanMoneyAmount}}
        </div>
      </div>
      <div>
        <div class="detailleft">
          借款期限
        </div>
        <div class="detailRight" id="detailLimit">
          {{model.factorLoanTermCount}}
        </div>
      </div>
      <div>
        <div class="detailleft">
          年利率
        </div>
        <div class="detailRight" id="detailRate">
          {{model.factorLoanFeeRate}}
        </div>
      </div>
      <div>
        <div class="detailleft">
          还款方式
        </div>
        <div class="detailRight" id="detailReturn">
          {{ $util.dataDicsFormat('pl_returnmoneymethod',model.returnMoneyMethodIds)}}
        </div>
      </div>
      <div>
        <div class="detailleft">
          最快放款时间
        </div>
        <div class="detailRight" id="detailLend">
          {{model.factorLoanGiveDays}}
        </div>
      </div>
    </div>
    <div class="headdiv">
      <span>申请条件</span>
    </div>
    <div class="conditiondiv">

      <div v-for="(item, index) in model.applyRemarkItemList" :key="'applyRemarkItem' + index" :title="item" style="height:auto">
        {{item}}
      </div>

    </div>
    <div class="headdiv"><span>填写申请信息</span></div>
    <div class="applydiv">

      <div class="formdiv">
        <input class="input1" name="cusromerName" v-model="applyModel.customerName" placeholder="您的姓名">
      </div>
      <div class="formdiv">
        <input class="input1" name="phone" placeholder="您的电话" v-model="applyModel.customerMobile">
      </div>
      <div class="formdiv">
        <input class="input1"  placeholder="请输入指令" v-model="applyModel.zhiling">
      </div>
      <!--<div class="formdiv1">-->
      <!--<div class="validateDiv">-->
      <!--<input class="input2" id="validateInput" placeholder="请输入验证码" v-model="applyModel.mobileVerifyCode">-->
      <!--</div>-->
      <!--<div class="validation" id="checkCode">-->
      <!--<button @click="getMobileVerifyCode()">{{getMobileVerifyCodeCount? (getMobileVerifyCodeCount+ '秒') : '获取验证码'}}</button>-->
      <!--</div>-->
      <!--</div>-->

    </div>
    <div class="commitdiv">
      <button  @click="doApply()">立即申请</button>
    </div>
  </div>
</template>

<script>
  export default {
    created: function() {
    },
    mounted() {},
    components: {},
    data() {
      return {
        id: null,
        model: {},
        getMobileVerifyCodeCount: null,
        getMobileVerifyCodeTimer: null,
        applyModel: {
          zhiling: ''
        },
      }
    },
    created() {
      // console.log(this.$store.state.setCustomerMrId)
      this.id = this.$route.query.id;
      let self = this;
      tapp.services.PL_LoanAdvice.getLoanProductSubType(self.id).
      then(function(res) {
        self.model = res;
        self.applyModel.loanProductSubTypeId = res.id;
      })
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      getMobileVerifyCode() {
        if (!this.applyModel.customerMobile) {
          this.$vux.toast.show({
            text: '您的电话输入不能为空',
            type: 'warn'
          })
          return;
        }
        if (this.getMobileVerifyCodeTimer) {
          return;
        }
        let self = this;
        const TIME_COUNT = 60;
        tapp.services.PL_LoanAdvice.getMobileVerifyCode(this.applyModel.customerMobile).then(function(res) {
          self.$vux.toast.show({
            text: '验证码已发送',
            type: 'info'
          })
          self.getMobileVerifyCodeCount = TIME_COUNT;
          self.getMobileVerifyCodeTimer = setInterval(() => {
            if (self.getMobileVerifyCodeCount > 0 && self.getMobileVerifyCodeCount <= TIME_COUNT) {
              self.getMobileVerifyCodeCount--;
            } else {
              clearInterval(self.getMobileVerifyCodeTimer);
              self.getMobileVerifyCodeTimer = null;
            }
          }, 1000)
        })
      },
      doApply() {
        if (!this.applyModel.customerName) {
          this.$vux.toast.show({
            text: '您的姓名输入不能为空',
            type: 'warn'
          })
          return;
        }

        if (!this.applyModel.customerMobile) {
          this.$vux.toast.show({
            text: '您的电话输入不能为空',
            type: 'warn'
          })
          return;
        }
        if(!(/^1[34578]\d{9}$/.test(this.applyModel.customerMobile))){
          this.$vux.toast.show({
            text: '手机号码有误，请重填',
            type: 'warn'
          })
          return
        }
        this.applyModel.customerMrId = this.$route.query.rc
        // if (!this.applyModel.mobileVerifyCode) {
        //   this.$vux.toast.show({
        //     text: '验证码输入不能为空',
        //     type: 'warn'
        //   })
        //   return;
        // }
        let self = this;
        console.log(this.applyModel)
        tapp.services.PL_LoanAdvice.save(this.applyModel).then(function(res) {
          if (res === '') {
            self.$vux.toast.show({
              text: '指令错误！请填写正确指令！',
              type: 'warn'
            })
          } else {
            setTimeout(() => {
              window.location.href = res
            }, 1000)
          }
        })
      },
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .headdiv {
    width: 600px;
    height: 53.36px;
    font-size: 25.5px;
    display: flex;
    align-items: center;
    margin-left: 80px;
    font-weight: 600;
  }

  .container {
    color: #464545;
    width: 750px;
    min-height: 1334px;
    overflow: auto;
    background: #e5e5e5;
  }

  .productInfo {
    /* margin-top: 60px; */
    width: 750px;
    height: 173.42px;
    background: #fff;
  }

  .productInfo div {
    float: left;
    margin-left: 30px;
    width: 180px;
    height: 130px;
    text-align: center;
    padding: 20px 0 0 0;
  }

  .productInfo div>img {
    width: 115px;
    height: 118px;
  }

  .productInfo article {
    float: left;
    width: 465px;
    padding: 20px 0 0 0;
  }

  .productInfo article h1 {
    font-size: 30px;
  }

  .productInfo article p {
    margin-top: 10px;
    font-size: 16px;
  }

  .productDetail {
    width: 750px;
    height: 233.45px;
    margin-top: 13.34px;
  }

  .productDetail>div {
    border-right: 0;
    border-left: 0;
    border-top: 0;
    border-bottom: 3px solid #c0c0c0;
    background: #fff;
    width: 750px;
    height: 44px;
  }

  .detailleft,
  .detailRight {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25.5px;
    font-weight: 600;
  }

  .detailleft {
    width: 300px;
    float: left;
  }

  .detailRight {
    width: 375px;
    float: right;
  }

  .conditiondiv {
    width: 578px;
    height: 386.86px;
    margin-right: 15px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-wrap:wrap;
    align-content:center;
    padding: 50px 60px 50px 112px;
    font-size: 23px;
    font-weight: 600;
  }

  .conditiondiv p {
    line-height: 40px;
  }

  .applydiv {
    width: 450px;
    height: 426.88px;
    background: #fff;
    text-align: center;
    padding: 37.5px 175px 37.5px 125px;
  }

  .applydiv form {
    width: 100%;
    height: 95%;
    text-align: center;
  }

  .formdiv {
    width: 100%;
    height: 18.75%;
    margin-top: 18.75px;
  }

  .formdiv1 {
    width: 500px;
    height: 18.75%;
    margin-top: 18.75px;
  }

  .input1,
  .input2 {
    height: 100%;
    width: 100%;
    border: 2px solid #848484;
    border-radius: 50px;
    font-size: 30px;
    padding-left: 50px;
    outline: none;
  }

  .validateDiv,
  .validation {
    height: 100%;
  }

  .validateDiv {
    width: 45%;
    float: left;
  }

  .validation {
    width: 45%;
    float: right;
    /*background: #f9e6bc;*/
    margin-left: 30px;
    font-family: Arial;
    font-style: italic;
    color: #a68945;
    border: 0;
    letter-spacing: 3px;
    font-weight: bolder;
    cursor: pointer;
    text-align: right;
    vertical-align: middle;
  }

  .validation button {
    height: 100%;
    width: 90%;
    font-size: 30px;
    padding: 15px 20px;
    background: #fe942e;
    border: 0;
    color: #fff;
    border-radius: 40px;
  }

  .commitdiv {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .commitdiv button {
    font-size: 39px;
    padding: 6.7px 50px;
    background: #fe942e;
    border: 0;
    color: #fff;
    border-radius: 30px;
  }

  .backdiv{
    padding: 3px 10px;
    display: flex;
    align-items:Center;
  }
  .backdiv img {
    width: 25px;
    height: 40px;
  }
  .backdiv button {
    background-color: rgba(0,0,0,0);
    padding-left: 10px;
    border: none;
    font-size: 40px;
    color: #fff;
  }
</style>
