<template>
<div style="height:100%;">
  <div v-transfer-dom>
    <loading v-model="isLoading"></loading>
  </div>

  <!-- main content -->
  <view-box ref="viewBox" body-padding-top="0px" body-padding-bottom="55px">
    <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
    <transition @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')" :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
  </view-box>
  </drawer>
</div>
</template>

<script>
import {
  ViewBox,
  Loading,
  TransferDom
} from 'vux'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
  ViewBox,
    Loading,
  },
  methods: {
    ...mapActions([]),
  },
  created: function() {

  },
  mounted() {

  },
  beforeDestroy() {

  },
  watch: {
    path(path) {}
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.isLoading,
      direction: state => state.direction,
      user: state => state.user
    }),
    leftOptions() {
      return {
        showBack: false
      }
    },
    headerTransition() {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    title() {
      return this.route.name
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';

.router-view {
    width: 100%;
    top: 46px;
}
.vux-pop-in-enter-active,
.vux-pop-in-leave-active,
.vux-pop-out-enter-active,
.vux-pop-out-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
}
.vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.menu-title {
    color: #888;
}
</style>
