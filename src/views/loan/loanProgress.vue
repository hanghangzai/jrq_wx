<template>
    <div>

      <div style="margin-left:10px;margin-right:10px">
      <div  v-if="list.length>0">
        <group v-for="(item, index) in list" :key="'item' + index">
          <cell  :title="item.title"></cell>
          <cell-form-preview :list="item.list"></cell-form-preview>
          <a :href="'tel:' + item.customerMrMobile" v-if="item.customerMrMobile && item.customerMrMobile.length>0">
          <x-button type="primary" text="催进度"></x-button>
          </a>
        </group>
        </div>
        <div style="text-align:center" v-else>
        暂无数据
        </div>
        </div>
    </div>
</template>

<script>
import {
  CellFormPreview,
  Group,
  Cell,
  XButton
} from 'vux'

export default {
  created: function() {},
  mounted() {},
  components: {
    CellFormPreview,
    Group,
    Cell,
    XButton
  },
  data() {
    return {
      list: []
    }
  },
  created() {

    let self = this;
    self.$api.getProgressList().
    then(function(res) {
      let list = res.map(p => {
        return {
          title: p.loanProductSubTypeName + ' ' + self.$util.dateFormat(p.loanApplyDate),
          customerMrMobile: p.customerMrMobile,
          list: [{
            label: '流水号',
            value: p.id
          }, {
            label: '金额',
            value: self.$util.moneyFormat(p.loanMoneyAmount) + '元'
          }, {
            label: '期限',
            value: p.loanTermCount + '个月'
          }, {
            label: '客户经理',
            value: p.customerMrName
          }, {
            label: '当前进度',
            value: p.progressName || '待审'
          }]
        };
      })
      self.list = list;
    })
  },
  methods: {}
}
</script>
