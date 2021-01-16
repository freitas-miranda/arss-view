import { ValidationObserver, ValidationProvider, extend, localize, setInteractionMode } from 'vee-validate'
import { confirmed, email, length, max, min, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import br from 'vee-validate/dist/locale/pt_BR'

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

localize('pt_BR', br)

setInteractionMode('passive')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
