import { ValidationObserver, ValidationProvider, extend, localize, setInteractionMode } from 'vee-validate'
import { confirmed, email, length, max, min, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import br from 'vee-validate/dist/locale/pt_BR'
import day from '@/plugins/dayjs'

extend('confirmed', confirmed)
extend('email', email)
extend('length', length)
extend('max', max)
extend('min', min)
extend('numeric', numeric)
extend('required', required)
extend('senha', {
  validate: (valor) => {
    let regex = /^(?=.*[A-Z])/

    return regex.test(valor)
  },
  message: 'O campo {_field_} deve ter pelo menos uma letra maiúscula'
})
extend('maxDate', {
  validate: (valor, argumento) => {
    let mascara

    switch (argumento[0].length) {
      case 19:
        mascara = 'DD/MM/YYYY HH:mm:ss'
        break
      case 10:
        mascara = 'DD/MM/YYYY'
        break
      case 7:
        mascara = 'MM/YYYY'
        break
    }

    return day(valor, mascara) <= day(argumento[0], mascara)
  },
  message: (valor, argumento) => {
    return `O campo ${valor} deve ser menor ou igual a ${argumento[0]}`
  }
})
extend('minDate', {
  validate: (valor, argumento) => {
    let mascara

    switch (argumento[0].length) {
      case 19:
        mascara = 'DD/MM/YYYY HH:mm:ss'
        break
      case 10:
        mascara = 'DD/MM/YYYY'
        break
      case 7:
        mascara = 'MM/YYYY'
        break
    }

    return day(valor, mascara) >= day(argumento[0], mascara)
  },
  message: (valor, argumento) => {
    return `O campo ${valor} deve ser maior ou igual a ${argumento[0]}`
  }
})
localize('pt_BR', br)

setInteractionMode('passive')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
