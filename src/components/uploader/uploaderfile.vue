<template>
<div class="img-box">
  <img  class="weui-uploader__file previewer-demo-img" :src="imageUrl"   @click="imageClick()" />
  </img >
  <span class="vux-close" @click="imageDelete" v-if="allowDelete"></span>
</div>
</template>

<script>
export default {
  props: {
    allowDelete: {
      type: Boolean,
      required: false,
      default: true
    },
    /**
     * 预览图的url，将被用于backgroud-image中
     */
    imageUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    imageClick(event) {
      this.$emit('onimageclick', event);
    },
    imageDelete(event) {
       this.$emit('onimagedelete',event);
   }
  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/close';
.img-box {
    width: 79px;
    height: 120px;
    overflow: hidden;
}
.vux-close {
    margin-left: 27px;
    margin-top: 4px;
    margin-bottom: 4px;
}
</style>
