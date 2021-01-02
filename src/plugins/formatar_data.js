import Vue from 'vue'
import dayjs from '@/plugins/dayjs'

const formatarData = (data, defaultData = 'YYYY-MM-DD HH:mm:ss', formatoData = 'DD/MM/YY HH:mm:ss') => {
  const dataFormatada = dayjs(data, defaultData).format(formatoData)
  return dataFormatada
}

Vue.prototype.$formatarData = formatarData
