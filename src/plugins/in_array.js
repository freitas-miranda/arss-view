import Vue from 'vue'

const check = (value, array) => {
  return array.indexOf(value) >= 0
}

Vue.prototype.$inArray = check

export default check
