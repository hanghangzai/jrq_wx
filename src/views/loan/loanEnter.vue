<template>
<div>
  <box gap="10px 10px">
    <group>
      <x-input :title='`<span style="color:red">产品类型</span>`' v-model="model.loanProductSubTypeName" required ref="loanProductSubTypeName" name="loanProductSubTypeName"></x-input>

      <x-input :title='`<span style="color:red">姓名</span>`' v-model="model.customerName" is-type="china-name" required ref="customerName" name="customerName"></x-input>

      <x-input :title='`<span style="color:red">手机号码</span>`' v-model="model.customerMobile" required ref="customerMobile" name="customerMobile" :max="13"></x-input>

      <x-input :title='`<span style="color:red">身份证号</span>`' v-model="model.customerCardNO" required ref="customerCardNO" name="customerCardNO"></x-input>

      <t-currency-input :title='`<span style="color:red">借款金额(元)</span>`' v-model="model.loanMoneyAmount" required ref="loanMoneyAmount" name="loanMoneyAmount"></t-currency-input>

      <t-int-input :title='`<span style="color:red">借款期限(月)</span>`' v-model="model.loanTermCount" ref="loanTermCount" name="loanTermCount"></t-int-input>

      <x-button type="primary" text="立即申请" @click.native="doSubmit"></x-button>
    </group>
  </box>
</div>
</template>

<script>
import TNumberInput from '@/components/controls/NumberInput.vue'
import TCurrencyInput from '@/components/controls/TCurrencyInput.vue'
import TIntInput from '@/components/controls/TIntInput.vue'

import {
  Group,
  GroupTitle,
  Cell,
  XInput,
  XTextarea,
  XButton,
  TransferDom,

} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    GroupTitle,
    Cell,
    XInput,
    XTextarea,
    XButton,
    TransferDom,
    TNumberInput,
    TCurrencyInput,
    TIntInput,
  },
  data() {
    return {
      model: {
        loanProductSubTypeId: null,
        loanProductSubTypeName: null,
        customerMrId: null,
        customerMrDisplayName: null,
        customerMrMobile: null,
        customerName: null,
        customerMobile: null,
        customerCardNO: null,
        loanMoneyAmount: null,
        loanTermCount: null,
      },
    }
  },
  watch: {},
  computed: {},
  created: function() {
    this.model.loanProductSubTypeId = this.$route.query.id;
    this.model.loanProductSubTypeName = decodeURI(this.$route.query.name);
    this.model.customerMobile = this.$store.state.user.userMobile;
    this.model.customerMrId = this.$store.state.customerMr.customerMrId;
    this.model.customerMrDisplayName = this.$store.state.customerMr.customerMrDisplayName;
    this.model.customerMrMobile = this.$store.state.customerMr.customerMrMobile;
    debugger;
  },
  mounted() {},
  updated() {

  },
  methods: {
    doSubmit() {
      let errors = [];
      let refs = this.$refs;
      for (let refKey in refs) {
        let refObject = refs[refKey];

        if (refObject && refObject.validate) {
          refObject.validate();
          if (refObject.errors) {
            for (let errorKey in refObject.errors) {
              let errormsg = refObject.errors[errorKey];
              errormsg = errormsg.replace('哦', '');
              errors.push(refObject.title + errormsg);
            }
          }
        } else if (refObject && refObject instanceof Array) {
          for (let idx = 0; idx < refObject.length; idx++) {
            let refObjecta = refObject[idx];
            if (refObjecta && refObjecta.validate) {
              refObjecta.validate();
              if (refObjecta.errors) {
                for (let errorKey in refObjecta.errors) {
                  let errormsg = refObjecta.errors[errorKey];
                  errormsg = errormsg.replace('哦', '');
                  errors.push(refObjecta.title + (idx + 1) + errormsg);
                }
              }
            }
          }
        }
      }
      if (errors && errors.length > 0) {
        this.$vux.toast.show({
          text: '内容不能为空',
          type: 'warn'
        })
        return;
      }

      let self = this;
      self.$api.saveAdvice(self.model).
      then(function(res) {
        self.$router.push({
          path: '/loanEnterSucess'
        })
      })
    },
  }
}
</script>
