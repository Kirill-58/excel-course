const letterCodes = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `
    <div class="cell" contenteditable="true"></div>
    `
}

function createCol(value) {
  return `<div class="column">
                        ${value}
                    </div>`
}

function toChar(_, index) {
  return String.fromCharCode(letterCodes.A + index)
}

function createRow(index, content) {
  return `<div class="row">
                <div class="row-info">
${index}
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
    col.push(createCell())
  }

  for (let i = 0; i < rowsCount; i++) {
    row.push(createRow(i+1, col.join('')))
  }

  return row.join('')
}
