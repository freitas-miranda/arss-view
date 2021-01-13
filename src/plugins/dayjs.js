import Vue from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale('pt-br', ptBr)

dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat)

Vue.prototype.$day = dayjs

export default dayjs
