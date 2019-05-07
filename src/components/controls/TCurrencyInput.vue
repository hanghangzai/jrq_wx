<template>
<number-input ref="input" :placeholder="placeholder" :title='title'  v-model="currentValue" @change="handleChange" :disabled="disabled" :readOnly="readOnly" currency="¥" :precision="precision"></number-input>
</template>

<script>
import NumberInput from './NumberInput.vue'
export default {
  components: {
    NumberInput
  },
  props: {
    title : {
      type: String,
      default: '',
      required: false
    },
    required : {
      type: Boolean,
      default: false,
      required: false
    },
    placeholder: {
      type: String,
      default: '',
      required: false
    },
    precision: {
      type: Number,
      default: 2,
      required: false
    },
    disabled: false,
    value: null,
    readOnly: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  data() {
    return {
      selectValue: null,
    }
  },
  watch: {
    value(value) {
      this.currentValue = value;
    }
  },
  created() {
    this.currentValue = this.value;
  },
  mounted() {},
  computed: {
    currentValue: {
      // 动态计算currentValue的值
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
    isEmpty() {
      return this.currentValue == null || this.currentValue.length == 0;
    },
    handleChange(val) {
      this.$emit('change', val);
    }
  },
}
</script>
