import Vue from 'vue'
import store from '../store'

const registrarModulo = (nome, modulo) => {
  if (!(nome in store._modules.root._children)) {
    store.registerModuleState(nome, modulo)
  } else {
    if (Object.keys(store._modules.root._children[nome].state).length) {
      store.commit(`${nome}/reset`)
    }
  }
}

Vue.prototype.$registrarModulo = registrarModulo
