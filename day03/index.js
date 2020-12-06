// section 1

const { readFileSync } = require('fs')

const matrix = readFileSync('./data.txt', { encoding: 'utf8' }).split('\n').map(i => i.split(''))

function countTreesInPath({ slopeX, slopeY}) {
  let pairs = []
  let x = 0
  let y = 0

  do {
    pairs.push({ x, y, char: matrix[y][x] })
    x = (x + slopeX) % matrix[0].length
    y += slopeY
  } while (!!matrix[y])

  return pairs.filter(i => i.char === '#').length
}

const result1 = countTreesInPath({ slopeX: 3, slopeY: 1 })
console.log('solution 1: ', result1)

 // section 2

const slopes = [
  { slopeX: 1, slopeY: 1 },
  { slopeX: 3, slopeY: 1 },
  { slopeX: 5, slopeY: 1 },
  { slopeX: 7, slopeY: 1 },
  { slopeX: 1, slopeY: 2 }
]

const result2 = slopes.map(countTreesInPath).reduce((a, b) => a * b)

console.log('solution 2: ', result2)