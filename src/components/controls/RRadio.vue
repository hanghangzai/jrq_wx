<template>
<radio :options="options" :fill-mode="fillMode" :fill-label="fillLabel" :fill-placeholder="fillPlaceholder" v-model="currentValue" @on-change="handleChange">
</radio>
</template>
<script>
import {
  Radio
} from 'vux'

export default {
  components: {
    Radio

  },
  props: {
    options: {
      type: Array,
      required: false
    },
    fillMode: {
      type: Boolean,
      default: false
    },
    fillPlaceholder: {
      type: String,
      default: '其他'
    },
    fillLabel: {
      type: String,
      default: '其他'
    },
    value: null,
  },
  data() {
    return {
      selectValue: null,
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    }, 
  },
  created() {
    this.currentValue = this.value;
  },
  mounted() {},
  computed: {
    currentValue: {
      get: function() {
        return this.selectValue;
      },
      set: function(val) {
        this.selectValue = val;
        this.$emit('input', val);
      }
    }
  },
  mounted() {},
  methods: {
    handleChange(key, value) {
      this.$emit('input', key);
      this.$emit('on-change', key, value)
    }
  },
}
</script>
