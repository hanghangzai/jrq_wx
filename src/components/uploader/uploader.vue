<template>
  <div class="weui-uploader" style="margin-top: 10px;margin-bottom: 5px">
    <div class="weui-uploader__bd">
      <slot name="uploader-files"></slot>
      <div class="weui-uploader__input-box" v-if="hasInput">
        <input type="file" class="weui-uploader__input" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="" @change="dispatchChange" />
      </div>
    </div>
  </div>
</template>

<script>


  export default {
  props: {

  /**
  * 是否包含input元素
  */
  hasInput: {
  type: Boolean,
  required: false,
  default: true
  }
  },

  methods: {
    dispatchChange(event) {
      this.$emit('onfilechoose',event);
    }
  },

  components: {

  }
  }
</script>
<style lang="less">
  .weui-uploader__hd {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  }
  .weui-uploader__title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  }
  .weui-uploader__info {
  color: #B2B2B2;
  }
  .weui-uploader__bd {
  margin-bottom: -4px;
  margin-right: -9px;
  overflow: hidden;
  }
  .weui-uploader__files {
  list-style: none;
  }
  .weui-uploader__file {
  float: left;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 79px;
  height: 79px;
  background: no-repeat center center;
  background-size: cover;
  }
  .weui-uploader__file_status {
  position: relative;
  }
  .weui-uploader__file_status:before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  }
  .weui-uploader__file_status .weui-uploader__file-content {
  display: block;
  }
  .weui-uploader__file-content {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  color: #FFFFFF;
  }
  .weui-uploader__file-content .weui-icon-warn {
  display: inline-block;
  }
  .weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #D9D9D9;
  }
  .weui-uploader__input-box:before,
  .weui-uploader__input-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #D9D9D9;
  }
  .weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
  }
  .weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
  }
  .weui-uploader__input-box:active {
  border-color: #999999;
  }
  .weui-uploader__input-box:active:before,
  .weui-uploader__input-box:active:after {
  background-color: #999999;
  }
  .weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
