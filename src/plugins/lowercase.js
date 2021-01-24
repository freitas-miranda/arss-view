import Vue from 'vue'

const lowercase = (el, _binding, vnode) => {
  let value
  let inicio
  let fim

  if (el.tagName.toUpperCase() !== 'INPUT' && el.tagName.toUpperCase() !== 'TEXTAREA') {
    const input = el.getElementsByTagName('input')
    const textarea = el.getElementsByTagName('textarea')

    if (input.length !== 1 && textarea.length !== 1) throw new Error('A diretiva v-lowercase requer um input ou textarea')
    else el = input[0] || textarea[0]

    inicio = el.selectionStart
    fim = el.selectionEnd

    if (vnode.componentInstance.value && typeof vnode.componentInstance.value === 'string') {
      value = vnode.componentInstance.value.toLowerCase()
    }
  } else {
    if (vnode.elm.value) {
      value = vnode.elm.value.toLowerCase()
    }
  }

  if (value && el.value !== value) {
    el.value = value

    el.dispatchEvent(new Event('input'))
    el.setSelectionRange(inicio, fim)
  }
}

Vue.prototype.$lowercase = lowercase

export default lowercase
