import { ValidationObserver, ValidationProvider, extend, localize, setInteractionMode } from 'vee-validate'
import { max, numeric, required } from 'vee-validate/dist/rules'
import Vue from 'vue'
import br from 'vee-validate/dist/locale/pt_BR'

extend('max', max)
extend('numeric', numeric)
extend('required', required)

localize('pt_BR', br)

setInteractionMode('passive')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
