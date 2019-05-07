<template>
  <div>
    <div class="vux-demo">
        <br/>
        <p class="vux-notice"> {{error}}！</p>
      </div>
  </div>
</template>

<script>
import { Cell, Group } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      error: "系统出现错误，请刷新后重试或者退出后重新登陆！"
    }
  },
  created: function() {
    let errors = this.$route.query.errors;
    if (errors) {
       error =errors;
    }
  },
  computed: {

  },
  methods: {

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
