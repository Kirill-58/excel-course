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
