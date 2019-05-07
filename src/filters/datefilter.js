import {formatDate} from '../utils/date.js';
import Vue from 'vue'

Vue.filter('formatDate', function(value) {
  var date = new Date(value);
  return formatDate(date, 'yyyy-MM-dd hh:mm');
})

const datefilter = Vue.filter('formatDate')

export default datefilter
