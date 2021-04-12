import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type = "resizable"]')
  const coords = $parent.getCoords()
  let value = null
  let currentElements = []
  // resize column
  if ($parent.data.col) {
    const currentColIndex = $parent.data.col
    currentElements = $root.findAll(
        `[data-col="${currentColIndex}"]`
    )
    document.onmousemove = e => {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        left: value + 'px',
        opacity: 1,
        bottom: '-500px',
      })
    }
  }

  // resize row
  if ($parent.data.row) {
    document.onmousemove = e => {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        right: '-2000px',
        opacity: 1,
        top: value + 'px',
      })
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if ($parent.data.col) {
      currentElements.forEach(el => {
        $(el).css({
          width: value + 'px',
        })
      })
    } else {
      $parent.css({
        height: value + 'px',
      })
    }
    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    })
  }
}
