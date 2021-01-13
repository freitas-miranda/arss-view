import Vue from 'vue'
import crypto from 'crypto'

const hash = (senha) => {
  return crypto.createHash('sha256').update(senha, 'utf8').digest('hex')
}

Vue.prototype.$crypto = hash

export default hash
