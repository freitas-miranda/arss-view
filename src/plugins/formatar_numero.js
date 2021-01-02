import Vue from 'vue'
import moeda from '@tiig/moeda'

const formatarNumero = (valor, casaDecimal = 0, defaultValue = 0) => {
  if (!valor) {
    return defaultValue
  }
  return moeda.format(moeda.strip(valor), casaDecimal)
}

Vue.prototype.$formatarNumero = formatarNumero
