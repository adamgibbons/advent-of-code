const data = require('fs').readFileSync('./data.txt').toString().split('\n')

const result = data
  .map(barcodeToSeatLocation)
  .map(seatLocationToId)
  .reduce((a, b) => {
      return Math.max(a, b)
  })

console.log('solution 1:', result)

function barcodeToSeatLocation(boardingPass) {
  const rows = Array(128).fill().map((_, idx) => idx)
  const columns = Array(8).fill().map((_, idx) => idx)

  const row = boardingPass.slice(0, 7).split('').reduce((acc, el) => {
    if (el === 'F') {
      return acc.slice(0, (acc.length / 2))
    }

    return acc.slice((acc.length / 2))
  }, rows)[0]

  const col = boardingPass.slice(7).split('').reduce((acc, el)  => {
    if (el === 'L') {
      return acc.slice(0, (acc.length / 2))
    }

    return acc.slice((acc.length / 2))
  }, columns)[0]

  return { row, col }
}

function seatLocationToId({ row, col }) {
  return row * 8 + col
}
