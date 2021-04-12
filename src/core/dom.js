class Dom {
  constructor(selector) {
    // #app
    this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
  }

  html(html) {
    // работает в 2 режимах как геттер и сеттер
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this // для возможной цепочки вызовов
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    return this.html('')
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => this.$el.style[key] = styles[key])
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
