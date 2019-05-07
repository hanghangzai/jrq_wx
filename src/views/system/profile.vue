<template>
  <div>
    <div class="vux-demo">
        <br/>
        <p class="vux-notice"> {{user.userDisplayName}}，您好！</p>
      </div>
    <group >
      <cell title='注销' is-link @click.native="logOut"></cell>
    </group>
    <group >
      <cell title='修改密码' is-link @click.native="changePassword"></cell>
    </group>
  </div>
</template>

<script>
import {
  Cell,
  Group
} from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {

    }
  },
  created: function() {
    let self = this;
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  methods: {
    logOut() {
      this.$router.push({
        path: '/Login'
      })
    },
    changePassword() {
      this.$router.push({
        path: '/changePassword'
      })
    }, 
  }
}
</script>
<style>
.vux-demo {
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}

.vux-notice {
  color: #666;
  line-height: 40px;
}
</style>
