<template>
    <div >

    <box gap="10px 10px">
      <group>
        <x-input title="用户名"   ref="userDisplayName" v-model="userDisplayName"   :iconType="''"></x-input>
      </group>
      <group>
        <x-input title="原密码" type="password"  ref="oldPassword"  v-model="oldPassword"   :iconType="''"></x-input>
      </group>
      <group>
        <x-input title="新密码" type="password"  ref="newPassword"  v-model="newPassword"   :iconType="''"></x-input>
      </group>
      <group>
        <x-input title="确认新密码" type="password"  ref="confirmPassword"  v-model="confirmPassword"   :iconType="''"></x-input>
      </group>
      <group>
        <x-button type="primary" text="确认"   @click.native="changePassword" ></x-button>
      </group>
    </box>
  </div>
</template>

<script>
import {
  Box,
  Group,
  Cell,
  XInput,
  XButton
} from 'vux'



export default {
  mounted() {
    this.$refs.oldPassword.focus()
  },
  components: {
    Box,
    Group,
    Cell,
    XInput,
    XButton
  },
  data() {
    return {
      userDisplayName: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  created: function() {
    this.userDisplayName = this.$store.state.user.userDisplayName
  },
  methods: {
    changePassword() {
      if (this.oldPassword == '') {
        this.$vux.toast.show({
          text: '原密码不能为空',
          type: 'warn'
        })
        this.$refs.oldPassword.focus()
        return
      }
      if (this.newPassword == '') {
        this.$vux.toast.show({
          text: '新密码不能为空',
          type: 'warn'
        })
        this.$refs.newPassword.focus()
        return
      }
      if (this.confirmPassword == '') {
        this.$vux.toast.show({
          text: '确认新密码不能为空',
          type: 'warn'
        })
        this.$refs.confirmPassword.focus()
        return
      }
      if (this.newPassword != this.confirmPassword) {
        this.$vux.toast.show({
          text: '新密码和确认新密码不一致',
          type: 'warn'
        })
        this.$refs.newPassword.focus()
        return
      }
      var self = this
      self.$store.commit('startLoading');
      self.$api.changePassword({
        OldPassword: this.oldPassword,
        NewPassword: this.newPassword
      }).
      then(function(res) {
        let resData = res.data
        if (resData.success) {
          // ajax login
          self.$store.commit('endLoading')
          self.$store.commit('loginOut')
          self.$vux.toast.show({
            type: 'success',
            text: '修改密码成功！',
            onHide: function() {
              self.$router.replace({
                path: '/Login'
              })
            }
          });
          return
        } else {
          self.$store.commit('endLoading')
          self.$vux.toast.show({
            text: resData.errorMessage,
            type: 'warn'
          })
        }
      }).catch(function(res) {
        self.$store.commit('endLoading')
        self.$vux.toast.show({
          text: res,
          type: 'warn'
        })
      })


    }
  }
}
</script>
