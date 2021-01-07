import Vue from 'vue'
import Vuex from 'vuex'
import VuexReset from '@ianwalter/vuex-reset'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app
  },
  plugins: [VuexReset()],
  strict: process.env.NODE_ENV !== 'production'
})
