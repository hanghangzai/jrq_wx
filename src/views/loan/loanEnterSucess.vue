<template>
<div>
  <msg title="操作成功" description="您的申请已成功，请等待您的专属客户经理与您联系！" :buttons="buttons" icon="success"></msg>
</div>
</template>
<script>

import { Msg, Divider, XButton } from 'vux'

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  },
  data () {
    return {
      buttons: [{
        type: 'primary',
        text: '返回首页',
        onClick: this.goHome.bind(this)
      }]
    }
  }
}
</script>
