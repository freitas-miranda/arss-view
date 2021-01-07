import { ValidationObserver, ValidationProvider, extend, localize, setInteractionMode } from 'vee-validate'
import Vue from 'vue'
import br from 'vee-validate/dist/locale/pt_BR'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

localize('pt_BR', br)

setInteractionMode('passive')

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
