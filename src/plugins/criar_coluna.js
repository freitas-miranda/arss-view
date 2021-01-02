import Vue from 'vue'

function criarColuna (text, value, align, width, sortable = true) {
  const configColumn = {
    text,
    value,
    align,
    width,
    sortable
  }
  return configColumn
}

Vue.prototype.$criarColuna = criarColuna
