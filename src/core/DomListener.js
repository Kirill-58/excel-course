import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
    // массив для сохранения events и callbacks
    this.bindListeners = []
  }
  initDomListener() {
    this.listeners.forEach( listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      const CurrentBindListener = this[method].bind(this)
      // сохраняем используемые обработчики
      this.bindListeners.push({
        e: listener,
        bindListener: CurrentBindListener})
      this.$root.on(listener, CurrentBindListener)
    })
  }
  removeDomListener() {
    this.bindListeners.forEach(({e, bindListener}) => {
      this.$root.off(e, bindListener)
    })
  }
}

// click -> onClick
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
