<template>
  <div class="containerRXD">
    <div class="backdiv" @click="goBack()">
      <img :src="backsrc"/>
      <button>返回</button>
    </div>
    <div class="formRXD">
      <div>
        <input v-model="formModel.customerName" placeholder="姓名">
      </div>
      <div>
        <input v-model="formModel.customerMobile" placeholder="电话">
      </div>
      <div>
        <input v-model="formModel.directive" placeholder="指令">
        <p class="promptp">如没有指令，请勿填写</p>
      </div>
      <div>
        <button class="subbutton" @click="submitForm()">提交</button>
      </div>
    </div>
    <div class="promptdiv" v-if="showPrompt === 1">
      <div class="alertdiv">
        <p>{{alertmsg}}</p>
        <button @click="closePrompt()">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alertmsg: '',
      showPrompt: 0,
      ifDirective: false,
      customerMr: {},
      trueDirective: '',
      backsrc: require("../../assets/imgs/back.png"),
      formModel: {},
      regPhone: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    }
  },
  created() {
    var self = this;
    self.customerMr = self.$store.state.customerMr;
    self.formModel.productId = self.$route.query.id;
    self.formModel.productName = self.$route.query.name;
    self.formModel.customerMrId = self.customerMr.customerMrId;
    tapp.services.base_User.checkDirective({
      'userId': self.formModel.customerMrId,
      'productId': self.formModel.productId
    }).then(function(res){
      if(res === '1'){
        ifDirective = true;
        trueDirective = self.formModel.customerMrId + self.formModel.productName;
      }
    })
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    closePrompt() {
      this.showPrompt = 0;
    },
    submitForm() {
      debugger;
      let self = this;
      if(!self.formModel.customerName || !self.formModel.customerMobile){
        self.showPrompt = 1;
        self.alertmsg = '姓名与电话不能为空';
        return;
      }
      if(!self.regPhone.test(self.formModel.customerMobile)){
        self.showPrompt = 1;
        self.alertmsg = '请输入正确的手机号';
        return;
      }
      if(self.ifDirective){
        if(!self.formModel.directive){
          self.showPrompt = 1;
          self.alertmsg = '指令不能为空';
          return;
        }
        if(self.formModel.directive != self.trueDirective){
          self.showPrompt = 1;
          self.alertmsg = '指令输入错误，请重新输入';
          return;
        }
      }
      if(!self.ifDirective){
      	if(self.formModel.directive){
          self.showPrompt = 1;
          self.alertmsg = '指令应为空';
          return;
        }
      }
      tapp.services.PL_ApplyProduct.saveApplyHistory(self.formModel).then(function(res){
          if(res != "OK"){
            self.showPrompt = 1;
            self.alertmsg = res;
          }else{
            // window.location.href="https://cn.bing.com";
          }
      })
    }
  }
}
</script>
<style>
  .containerRXD {
    background-image: url("~@/assets/imgs/rxd_bg.png");
    background-size: 100% 100%;
    width: 750px;
    min-height: 1334px;
    overflow: auto;
    position:relative;
    top:0px;
    left:0px;
    text-align: center;
  }

  .formRXD {
    margin-top: 730px;
  }
  .formRXD div {
    margin-top: 20px;
  }
  .formRXD div input {
    border-width: 0;
    width: 450px;
    height: 70px;
    font-size: 35px;
    font-weight: bolder;
    text-indent: 10px;
  }
  .promptp {
    font-size: 30px;
    font-weight: bolder;
  }
  .subbutton {
    margin-top: 10px;
    background-color: #fff;
    padding: 7px 80px;
    font-size: 35px;
    font-weight: bolder;
    border: 1px solid #000;
    border-radius: 10px;
  }
  .backdiv{
    float: left;
    margin-top: 30px;
    margin-left: 50px;
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

  .promptdiv {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items:Center;
  }
  .alertdiv {
    background-color: rgba(255,255,255,1);
    border: 1px solid #000;
    width: 600px;
    height: 300px;
  }
  .alertdiv p {
    margin-top: 100px;
    font-size: 40px;
    font-weight: 500;
  }
  .alertdiv button {
    padding: 10px 60px;
    border: 1px solid #000;
    margin-top: 30px;
    font-size: 35px;
  }
</style>
