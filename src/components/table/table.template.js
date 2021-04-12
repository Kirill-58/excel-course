const letterCodes = {
  A: 65,
  Z: 90,
}

function createCell(index) {
  return `
    <div class="cell" contenteditable="true" data-col="${index}"></div>
    `
}

function createCol(value, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
                        ${value}
                        <div class="column-resize" data-resize="col"></div>
                    </div>`
}

function toChar(_, index) {
  return String.fromCharCode(letterCodes.A + index)
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `<div class="row" data-type="resizable" data-row="${index}">
                <div class="row-info">
                ${index}
                ${resize}
                </div>
                <div class="row-data">
                  ${content}
                </div>
            </div>`
}

export function createTable(rowsCount = 10) {
  const row = []
  const col = []
  // количество столбцов
  const quantityCol = letterCodes.Z - letterCodes.A + 1
  // создаем первую строку с названием колонок
  // и пустой первой ячейкой
  const arrayLetter = new Array(quantityCol)
      .fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  row.push(createRow('', arrayLetter))

  for (let i = 0; i < quantityCol; i++) {
    col.push(createCell(i))
  }

  for (let i = 0; i < rowsCount; i++) {
    row.push(createRow(i+1, col.join('')))
  }

  return row.join('')
}
