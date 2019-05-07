<template>
    <div>
    <box gap="10px 10px">
      <group>
        <x-input placeholder="请输入手机号" v-model="mobile" ref="mobile" autofocus="true" required ></x-input>
      </group>
       <group>
        <x-input placeholder="请输入验证码" v-model="verifyCode" ref="verifyCode" class="weui-vcode" required>
          <x-button slot="right" type="primary" mini @click.native="getMobileVerifyCode" :disabled="getMobileVerifyButtonDisalbed">{{getMobileVerifyButtonText}}</x-button>
        </x-input>
      </group>
      <group>
        <x-button type="primary" :text="loginText" :disabled="loginDisalbed"  @click.native="loginIn" ></x-button>
      </group>
    </box>
  </div>
</template>

<script>
import {
  Box,
  Group,
  XInput,
  XButton
} from 'vux'

export default {
  created: function() {

  },
  mounted() {
    this.$nextTick(() => {
      // 这个时候 dom 才被插入文档， 在这里获取焦点试试
      this.$refs.mobile.focus()
    })
  },
  components: {
    Box,
    Group,
    XInput,
    XButton
  },
  data() {
    return {
      mobile: '',
      verifyCode: '',
      getMobileVerifyButtonText: '获取验证码',
      getMobileVerifyButtonDisalbed: false,
      loginText: '登录',
      loginDisalbed: false
    }
  },
  methods: {
    getMobileVerifyCode() {
      if (this.mobile == '') {
        this.$vux.toast.show({
          text: '手机号不能为空',
          type: 'warn'
        })
        this.$refs.mobile.focus()
        return
      }
      let self = this;
      self.$api.getMobileVerifyCode(this.mobile).
      then(function(res) {
        self.getMobileVerifyButtonDisalbed = true;
        let time = 60;
        let interval = window.setInterval(function() {
          self.getMobileVerifyButtonText = time;
          --time;
          if (time < 0) {
            self.getMobileVerifyButtonText = "获取验证码";
            time = 60;
            self.getMobileVerifyButtonDisalbed = false;
            window.clearInterval(interval);
          }
        }, 1000);

      })
    },
    loginIn() {
      if (this.mobile == '') {
        this.$vux.toast.show({
          text: '内容不能为空',
          type: 'warn'
        })
        this.$refs.mobile.focus()
        return
      }
      if (this.verifyCode == '') {
        this.$vux.toast.show({
          text: '内容不能为空',
          type: 'warn'
        })
        this.$refs.verifyCode.focus()
        return
      }
      this.loginDisalbed = true;
      this.loginText = '登录中...'

      var self = this

      self.$api.login({
        "mobile": self.mobile,
        "mobileVerifyCode": self.verifyCode,
        "customerMrId": self.$store.state.customerMr.customerMrId,
      }).
      then(function(res) {
        self.$store.commit('loginIn', res)
        let toPath = null;
        if (self.$router.currentRoute && self.$router.currentRoute.query) {
          toPath = self.$router.currentRoute.query.to;
        }
        if (!toPath || self.$router.currentRoute.name == '404') {
          toPath = "/";
        }
        self.$router.push({
          path: toPath
        });
        return
      })

    }
  }
}
</script>
