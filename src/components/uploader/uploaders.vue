<template>
<div>
  <div v-transfer-dom>
    <previewer :list="availImages" ref="previewer" ></previewer>
  </div>
  <div class="weui_cells_title">照片({{ availImages.length }}) </div>
  <div class="weui_cells">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <uploader v-on:onfilechoose="onFileChange" :hasInput="allowUploder">
          <uploader-files slot="uploader-files" v-for="(imageItem, imageIndex) in availImages" :key="'uploader-file' + imageIndex">
            <uploader-file :image-url="imageItem.thumbnailSrc" v-on:onimageclick="onImageClick(imageIndex)" :allowDelete="allowDelete" v-on:onimagedelete="onDelImage(imageIndex)"></uploader-file>
          </uploader-files>
        </uploader>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
import {
  Previewer,
  TransferDom
} from 'vux'

import Uploader from './uploader'
import UploaderFiles from './uploaderfiles'
import UploaderFile from './uploaderfile'

export default {
  components: {
    Uploader,
    UploaderFiles,
    UploaderFile,
    Previewer,
  },
  directives: {
    TransferDom
  },
  props: ['initAllowUploder', 'initAllowDelete'],
  data() {
    return {
      allowUploder: true,
      allowDelete: true,
      initData: {},
      model: {
        images: [],
      },
    }
  },
  computed: {
    availImages: {
      get: function() {
        return this.model.images.filter(function(item) {
          return item.src != null
        });
      }
    }
  },
  created: function() {

    this.allowUploder = this.initAllowUploder;
    this.allowDelete = this.initAllowDelete;
  },
  methods: {
    initImages(images){
      this.model.images = images || [] ;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)

      e.target.value = ''
    },
    createImage(files) {
      var vm = this
      var reader = null
      var leng = files.length

      for (var i = 0; i < leng; i++) {
        let fileItem = files[i]
        console.log(fileItem)
        reader = new window.FileReader()
        reader.readAsDataURL(fileItem)
        reader.onload = function(e) {
          let imageItem = {
            "docID": '',
            "index": vm.model.images.length + 1,
            "name": fileItem.name,
            "fileType": fileItem.type,
            "thumbnailSrc": e.target.result,
            "src": e.target.result,
          };
          vm.model.images.push(imageItem);
          vm.$emit('onfileselect', imageItem);
        }
      }

    },
    onImageClick: function(imageIndex) {
      var vm = this
      this.$refs.previewer.show(imageIndex)
    },
    onGallaryClick: function() {
      var vm = this
    },
    onDelImage: function(imageIndex) {
      var imageItem = this.availImages[imageIndex]
      if (!imageItem.docID) {
        this.model.images.shift(imageItem.Index)
      } else {
        imageItem.src = null
        imageItem.thumbnailSrc= null
      }
      this.$emit('onfileremove', imageItem.docID);
    },
  }
}
</script>

<style lang="less">
.vux-selector .weui-cell__hd {
    width: 85px;
}
.weui_cells_title {
    color: #000;
    display: block;
    width: 105px;
    word-wrap: break-word;
    word-break: break-all;
}
.weui-cells_form .weui-cell__ft {
    font-size: 0;
}
.weui-cells_form .weui-icon-warn {
    display: none;
}
.weui-cells_form input,
.weui-cells_form label[for],
.weui-cells_form textarea {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.weui-uploader {}
.weui-uploader__hd {
    display: flex;
    padding-bottom: 10;
    align-items: center;
}
.weui-uploader__title {
    flex: 1;
}

.weui-uploader__bd {

    overflow: hidden;
}

.weui-uploader__files {
    width: 82px;
    height: 130px;
    overflow: hidden;
    float: left;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 5px;
}
.weui-uploader__file {
    float: left;

    background: no-repeat center center;
    background-size: cover;
}
.weui-uploader__file_status {
    position: relative;
    &:before {
        content: " ";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
    }
    .weui-uploader__file-content {
        display: block;
    }
}
.weui-uploader__file-content {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #FFFFFF;
    .weui-icon-warn {
        display: inline-block;
    }
}
.weui-uploader__input-box {
    float: left;
    position: relative;
    &:after,
    &:before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    &:before {}
    &:after {}
    &:active {
        &:after,
        &:before {}
    }
}
.weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

}
</style>
