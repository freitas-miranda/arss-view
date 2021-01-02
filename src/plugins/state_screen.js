import Vue from 'vue'

const stateScreen = new Vue({
  data () {
    return {
      isFullScreen: false
    }
  },
  created () {
    window.onresize = () => {
      this.isFullScreen = !(!window.screenTop && !window.screenY)
    }
  }
})

Vue.prototype.$stateScreen = stateScreen
