import Vue from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

dayjs.extend(customParseFormat)

Vue.prototype.$day = dayjs

export default dayjs
